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
  const fetchCalls = [];
  const sandbox = {
    module: cjsModule,
    exports: cjsModule.exports,
    process: { env },
    URL,
    fetch: async (url) => {
      fetchCalls.push(String(url));
      return {
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
      };
    },
  };
  vm.runInNewContext(compiled, sandbox);
  return { ...cjsModule.exports, fetchCalls };
}

test("uses AutoMakhsus public Media API as default source", () => {
  const media = loadMediaModule();
  assert.equal(media.mediaApiBase(), "https://automakhsus.com/api/public/media-center");
  assert.equal(media.mediaApiFetchBase(), "https://tehransandali.ir/api/public/media-center");
});

test("normalizes relative protected media URLs to the Media API origin", () => {
  const media = loadMediaModule({ AM_MEDIA_PUBLIC_API_BASE: "https://media-api.example.test/api/public/media-center/" });
  assert.equal(media.absoluteMediaUrl("/api/public/media-center/assets/asset/content?token=abc"), "https://media-api.example.test/api/public/media-center/assets/asset/content?token=abc");
});

test("fetches relation-scoped media with public Media API URLs", async () => {
  const media = loadMediaModule({
    AM_MEDIA_PUBLIC_API_BASE: "https://media-api.example.test/api/public/media-center",
    AM_MEDIA_PUBLIC_FETCH_BASE: "http://tehransandali:3000/api/public/media-center",
  });
  const results = await media.fetchPublicMediaByRelation({ relationType: "product", relationId: "sample-product", take: 1 });
  assert.equal(results.length, 1);
  assert.equal(media.fetchCalls[0].startsWith("http://tehransandali:3000/api/public/media-center/assets?"), true);
  assert.equal(results[0].urls.playbackUrl, "https://media-api.example.test/api/public/media-center/assets/media-1/content?token=h");
});

test("public interaction URLs use the AutoMakhsus domain-local media API proxy", () => {
  const media = loadMediaModule();
  assert.equal(media.publicMediaProxyUrl("/assets/media-1/interactions"), "/api/public/media-center/assets/media-1/interactions");
});
