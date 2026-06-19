import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";
import vm from "node:vm";

function loadMediaModule(env = {}) {
  const source = fs.readFileSync(new URL("../src/lib/media-center-public.ts", import.meta.url), "utf8");
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
    process: { env },
    URL,
    fetch: async () => ({
      ok: true,
      json: async () => ({
        media: [
          {
            id: "media-1",
            urls: {
              originalUrl: "/api/public/media-center/assets/media-1/content?token=o",
              processedUrl: "/api/public/media-center/assets/media-1/content?token=p",
              thumbnailUrl: "/api/public/media-center/assets/media-1/content?token=t",
              hlsUrl: "/api/public/media-center/assets/media-1/content?token=h",
              playbackUrl: "/api/public/media-center/assets/media-1/content?token=h",
              playbackKind: "hls",
            },
          },
        ],
      }),
    }),
  };
  vm.runInNewContext(compiled, sandbox);
  return cjsModule.exports;
}

test("uses TehranSandali public Media API as default source", () => {
  const media = loadMediaModule();
  assert.equal(media.mediaApiBase(), "https://tehransandali.ir/api/public/media-center");
});

test("normalizes relative protected media URLs to the Media API origin", () => {
  const media = loadMediaModule({ AM_MEDIA_PUBLIC_API_BASE: "https://media-api.example.test/api/public/media-center/" });
  assert.equal(media.absoluteMediaUrl("/api/public/media-center/assets/asset/content?token=abc"), "https://media-api.example.test/api/public/media-center/assets/asset/content?token=abc");
});

test("fetches relation-scoped media with public Media API URLs", async () => {
  const media = loadMediaModule({ AM_MEDIA_PUBLIC_API_BASE: "https://media-api.example.test/api/public/media-center" });
  const results = await media.fetchPublicMediaByRelation({ relationType: "product", relationId: "sample-product", take: 1 });
  assert.equal(results.length, 1);
  assert.equal(results[0].urls.playbackUrl, "https://media-api.example.test/api/public/media-center/assets/media-1/content?token=h");
});
