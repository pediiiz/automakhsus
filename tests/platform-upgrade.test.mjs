import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";
import vm from "node:vm";

const requireFromTest = createRequire(import.meta.url);

test("premium header exposes required platform navigation and CRM login", () => {
  const source = fs.readFileSync(new URL("../src/components/premium-header.tsx", import.meta.url), "utf8");
  for (const expected of ["/crm", "/fa/store", "/fa/academy", "/fa/forum", "/fa/services", "/fa/contact"]) {
    assert.match(source, new RegExp(expected.replaceAll("/", "\\/")));
  }
  assert.match(source, /CRM Login/);
});

function loadVideoProcessingModule() {
  const source = fs.readFileSync(new URL("../src/lib/video-processing.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const cjsModule = { exports: {} };
  const sandbox = {
    module: cjsModule,
    exports: cjsModule.exports,
    require: (specifier) => {
      if (specifier === "node:crypto") return { randomUUID: () => "00000000-0000-0000-0000-000000000000" };
      if (specifier === "node:fs/promises") return { mkdir: async () => undefined, readFile: async () => "{}", writeFile: async () => undefined };
      if (specifier === "node:path") return requireFromTest("node:path");
      if (specifier === "node:child_process") return { spawn: () => { throw new Error("spawn not used in tests"); } };
      throw new Error(`Unexpected import ${specifier}`);
    },
    process,
    Buffer,
  };
  vm.runInNewContext(compiled, sandbox);
  return cjsModule.exports;
}

const video = loadVideoProcessingModule();

test("academy video upload validation accepts safe formats and rejects dangerous files", () => {
  assert.equal(video.validateAcademyVideoUpload({ name: "lesson.mp4", type: "video/mp4", size: 1024 }).ok, true);
  assert.equal(video.validateAcademyVideoUpload({ name: "lesson.mov", type: "video/quicktime", size: 1024 }).ok, true);
  assert.equal(video.validateAcademyVideoUpload({ name: "script.php", type: "application/x-php", size: 1024 }).ok, false);
  assert.equal(video.validateAcademyVideoUpload({ name: "empty.mp4", type: "video/mp4", size: 0 }).ok, false);
});

test("academy video processing plans adaptive HLS renditions", () => {
  assert.equal(JSON.stringify(video.plannedHlsRenditions(720).map((item) => item.label)), JSON.stringify(["360p", "480p", "720p"]));
  assert.equal(JSON.stringify(video.plannedHlsRenditions().map((item) => item.label)), JSON.stringify(["360p", "480p", "720p", "1080p"]));
  assert.equal(video.sanitizeVideoFileName("My Lesson 01.MP4"), "my-lesson-01.mp4");
});
