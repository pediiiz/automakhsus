import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

export const academyVideoStatuses = ["uploaded", "processing", "ready", "failed"] as const;
export type AcademyVideoStatus = (typeof academyVideoStatuses)[number];

export type AcademyVideoJob = {
  id: string;
  originalFileName: string;
  safeFileName: string;
  mimeType: string;
  sizeBytes: number;
  status: AcademyVideoStatus;
  sourcePath: string;
  publicSourcePath: string;
  hlsDirectory: string;
  publicHlsPath: string;
  renditions: { label: string; height: number; playlist: string }[];
  logs: string[];
  error?: string;
  createdAt: string;
  updatedAt: string;
};

export const supportedVideoMimeTypes = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-m4v",
] as const;

export const supportedVideoExtensions = [".mp4", ".mov", ".webm", ".m4v"] as const;

const maxVideoUploadBytes = Number(process.env.AUTOMAKHSUS_MAX_VIDEO_UPLOAD_BYTES || 1024 * 1024 * 500);

export function getAcademyVideoStorageRoot() {
  return process.env.AUTOMAKHSUS_VIDEO_STORAGE_DIR || path.join(process.cwd(), "public", "uploads", "automakhsus", "academy-videos");
}

function publicPathFor(rootRelativePath: string) {
  return `/uploads/automakhsus/academy-videos/${rootRelativePath.replaceAll(path.sep, "/")}`;
}

export function sanitizeVideoFileName(fileName: string) {
  const parsed = path.parse(fileName);
  const ext = parsed.ext.toLowerCase();
  const base = parsed.name
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff_-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return `${base || "academy-video"}${ext}`;
}

export function validateAcademyVideoUpload(file: { name: string; type?: string; size: number }) {
  const ext = path.extname(file.name).toLowerCase();
  const errors: string[] = [];
  if (!supportedVideoExtensions.includes(ext as never)) {
    errors.push("Unsupported video extension.");
  }
  if (file.type && !supportedVideoMimeTypes.includes(file.type as never)) {
    errors.push("Unsupported video MIME type.");
  }
  if (file.size <= 0) {
    errors.push("Video file is empty.");
  }
  if (file.size > maxVideoUploadBytes) {
    errors.push("Video file exceeds the configured upload limit.");
  }
  return { ok: errors.length === 0, errors };
}

export function plannedHlsRenditions(sourceHeight?: number | null) {
  const heights = [360, 480, 720, 1080];
  return heights
    .filter((height) => !sourceHeight || height <= sourceHeight)
    .map((height) => ({
      label: `${height}p`,
      height,
      playlist: `${height}p/index.m3u8`,
    }));
}

export async function createAcademyVideoJob(file: File) {
  const validation = validateAcademyVideoUpload(file);
  if (!validation.ok) {
    throw new Error(validation.errors[0] || "Invalid video upload.");
  }

  const id = `vid_${randomUUID().replaceAll("-", "")}`;
  const root = getAcademyVideoStorageRoot();
  const safeFileName = sanitizeVideoFileName(file.name);
  const sourceDir = path.join(root, id, "source");
  const hlsDir = path.join(root, id, "hls");
  const jobsDir = path.join(root, "_jobs");
  await mkdir(sourceDir, { recursive: true });
  await mkdir(hlsDir, { recursive: true });
  await mkdir(jobsDir, { recursive: true });
  const sourcePath = path.join(sourceDir, safeFileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(sourcePath, buffer, { mode: 0o640 });

  const job: AcademyVideoJob = {
    id,
    originalFileName: file.name,
    safeFileName,
    mimeType: file.type || "application/octet-stream",
    sizeBytes: file.size,
    status: "uploaded",
    sourcePath,
    publicSourcePath: publicPathFor(`${id}/source/${safeFileName}`),
    hlsDirectory: hlsDir,
    publicHlsPath: publicPathFor(`${id}/hls/master.m3u8`),
    renditions: plannedHlsRenditions(),
    logs: ["Upload saved. Encoding is queued/manual until worker execution is enabled."],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await saveAcademyVideoJob(job);
  return job;
}

export async function saveAcademyVideoJob(job: AcademyVideoJob) {
  const root = getAcademyVideoStorageRoot();
  const jobsDir = path.join(root, "_jobs");
  await mkdir(jobsDir, { recursive: true });
  await writeFile(path.join(jobsDir, `${job.id}.json`), JSON.stringify({ ...job, updatedAt: new Date().toISOString() }, null, 2), { mode: 0o640 });
}

export async function readAcademyVideoJob(id: string) {
  if (!/^vid_[a-z0-9]+$/i.test(id)) return null;
  try {
    const data = await readFile(path.join(getAcademyVideoStorageRoot(), "_jobs", `${id}.json`), "utf8");
    return JSON.parse(data) as AcademyVideoJob;
  } catch {
    return null;
  }
}

export async function processAcademyVideoJob(id: string) {
  const job = await readAcademyVideoJob(id);
  if (!job) throw new Error("Video job was not found.");
  const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
  const renditions = plannedHlsRenditions();
  job.status = "processing";
  job.logs.push("Encoding started.");
  await saveAcademyVideoJob(job);

  await mkdir(job.hlsDirectory, { recursive: true });
  const commands = renditions.map(async (rendition) => {
    const outDir = path.join(job.hlsDirectory, `${rendition.height}p`);
    await mkdir(outDir, { recursive: true });
    const args = [
      "-y",
      "-i",
      job.sourcePath,
      "-vf",
      `scale=-2:${rendition.height}`,
      "-c:v",
      "h264",
      "-profile:v",
      "main",
      "-crf",
      "23",
      "-sc_threshold",
      "0",
      "-g",
      "48",
      "-keyint_min",
      "48",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-hls_time",
      "6",
      "-hls_playlist_type",
      "vod",
      "-hls_segment_filename",
      path.join(outDir, "seg_%03d.ts"),
      path.join(outDir, "index.m3u8"),
    ];
    await runProcess(ffmpeg, args);
  });

  try {
    await Promise.all(commands);
    const master = [
      "#EXTM3U",
      "#EXT-X-VERSION:3",
      ...renditions.flatMap((rendition) => [
        `#EXT-X-STREAM-INF:BANDWIDTH=${rendition.height * 1800},RESOLUTION=${Math.round((rendition.height * 16) / 9)}x${rendition.height}`,
        rendition.playlist,
      ]),
      "",
    ].join("\n");
    await writeFile(path.join(job.hlsDirectory, "master.m3u8"), master, { mode: 0o640 });
    job.status = "ready";
    job.renditions = renditions;
    job.logs.push("Encoding completed and HLS master playlist generated.");
  } catch (error) {
    job.status = "failed";
    job.error = error instanceof Error ? error.message : "Unknown encoding error";
    job.logs.push(`Encoding failed: ${job.error}`);
  }
  await saveAcademyVideoJob(job);
  return job;
}

function runProcess(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.slice(-1200) || `${command} exited with ${code}`));
    });
  });
}
