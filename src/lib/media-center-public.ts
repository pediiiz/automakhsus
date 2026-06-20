export type PublicMediaUserState = {
  favorite: boolean;
  liked: boolean;
  watchLater: boolean;
  rating: number | null;
  progress: { positionSeconds: number; durationSeconds: number | null; completed: boolean; updatedAt: string } | null;
};

export type PublicMediaSummary = {
  favorites: number;
  likes: number;
  watchLater: number;
  ratings: number;
  ratingAverage: number | null;
  completedViews: number;
};

export type PublicMediaAsset = {
  id: string;
  businessUnit: string;
  bucket: string;
  objectKey: string;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
  visibility: string;
  status: string;
  processedObjectKey: string | null;
  thumbnailObjectKey: string | null;
  hlsPlaylistKey: string | null;
  hlsVariants: unknown;
  durationSeconds: number | null;
  width: number | null;
  height: number | null;
  title: string | null;
  description: string | null;
  relations: Array<{ id: string; relationType: string; relationId: string }>;
  tags: Array<{ id: string; name: string; category: string }>;
  urls: {
    originalUrl: string | null;
    processedUrl: string | null;
    thumbnailUrl: string | null;
    hlsUrl: string | null;
    playbackUrl: string | null;
    playbackKind: "hls" | "processed" | "original";
  };
  userState: PublicMediaUserState;
  summary: PublicMediaSummary;
};

const defaultMediaApiBase = "https://automakhsus.com/api/public/media-center";
const defaultMediaApiFetchBase = "https://tehransandali.ir/api/public/media-center";

export function mediaApiBase() {
  return (process.env.AM_MEDIA_PUBLIC_API_BASE || defaultMediaApiBase).replace(/\/+$/, "");
}

export function mediaApiFetchBase() {
  return (process.env.AM_MEDIA_PUBLIC_FETCH_BASE || defaultMediaApiFetchBase).replace(/\/+$/, "");
}

export function absoluteMediaUrl(url: string | null | undefined) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const base = new URL(mediaApiBase());
  return `${base.origin}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function fetchPublicMediaByRelation(input: { relationType: string; relationId: string; businessUnit?: string; take?: number }) {
  const url = new URL(`${mediaApiFetchBase()}/assets`);
  url.searchParams.set("relationType", input.relationType);
  url.searchParams.set("relationId", input.relationId);
  url.searchParams.set("businessUnit", input.businessUnit || "AUTOMAKHSUS_TECHNICAL");
  url.searchParams.set("take", String(input.take || 4));
  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    const data = (await response.json()) as { media?: PublicMediaAsset[] };
    return (data.media || []).map((asset) => ({
      ...asset,
      urls: {
        ...asset.urls,
        originalUrl: absoluteMediaUrl(asset.urls.originalUrl),
        processedUrl: absoluteMediaUrl(asset.urls.processedUrl),
        thumbnailUrl: absoluteMediaUrl(asset.urls.thumbnailUrl),
        hlsUrl: absoluteMediaUrl(asset.urls.hlsUrl),
        playbackUrl: absoluteMediaUrl(asset.urls.playbackUrl),
      },
    }));
  } catch {
    return [];
  }
}

export function publicMediaProxyUrl(path: string) {
  return `/api/public/media-center${path.startsWith("/") ? path : `/${path}`}`;
}
