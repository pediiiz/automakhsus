import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";
import vm from "node:vm";

function loadCmsModule() {
  const source = readFileSync(new URL("../src/lib/cms.ts", import.meta.url), "utf8");
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
      if (specifier === "@/lib/db") return { getPool: () => ({ query: async () => ({ rows: [] }) }) };
      if (specifier === "@/lib/content-data") return { contentVisual: { academy: "/academy.png", videos: "/videos.png" } };
      if (specifier === "@/lib/lead-routing") {
        return {
          normalizeCrmBusinessUnit: (value) => value || null,
        };
      }
      throw new Error(`Unexpected import ${specifier}`);
    },
    console,
    process,
  };
  vm.runInNewContext(compiled, sandbox);
  return cjsModule.exports;
}

const cms = loadCmsModule();

test("normalizes CMS slugs for URL-safe content paths", () => {
  assert.equal(cms.normalizeCmsSlug(" BMW Diagnostics Guide "), "bmw-diagnostics-guide");
  assert.equal(cms.normalizeCmsSlug("دیاگ تخصصی BMW"), "دیاگ-تخصصی-bmw");
});

test("builds canonical CMS content paths by content type", () => {
  assert.equal(cms.cmsContentPath("ACADEMY_ARTICLE", "guide"), "/fa/academy/guide");
  assert.equal(cms.cmsContentPath("VIDEO", "diagnostics"), "/fa/videos/diagnostics");
  assert.equal(cms.cmsContentPath("PROJECT_SHOWCASE", "project"), "/fa/projects/project");
  assert.equal(cms.cmsContentPath("FEED_POST", "daily"), "/fa/feed/daily");
});

test("merges CMS content before static fallback and removes duplicate static slugs", () => {
  const result = cms.mergeCmsWithStatic(
    [{ slug: "cms-first", title: "CMS" }, { slug: "shared", title: "CMS shared" }],
    [{ slug: "shared", title: "Static shared" }, { slug: "static-only", title: "Static" }],
  );
  assert.deepEqual(Array.from(result.map((item) => item.title)), ["CMS", "CMS shared", "Static"]);
});
