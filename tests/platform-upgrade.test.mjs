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

test("premium header keeps mega menu stable across trigger and panel hover", () => {
  const source = fs.readFileSync(new URL("../src/components/premium-header.tsx", import.meta.url), "utf8");
  const styles = fs.readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

  assert.match(source, /scheduleMegaMenuClose/);
  assert.match(source, /cancelMegaMenuClose/);
  assert.match(source, /setTimeout\(\(\) => \{/);
  assert.match(source, /onMouseEnter=\{cancelMegaMenuClose\}/);
  assert.match(source, /onMouseLeave=\{scheduleMegaMenuClose\}/);
  assert.match(styles, /\.mega-menu::before/);
  assert.match(styles, /pointer-events:\s*auto/);
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

function loadCrmProxyModule() {
  const source = fs.readFileSync(new URL("../src/lib/crm-domain-proxy.ts", import.meta.url), "utf8");
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
    process,
    URL,
    URLSearchParams,
    Headers,
  };
  vm.runInNewContext(compiled, sandbox);
  return cjsModule.exports;
}

const crmProxy = loadCrmProxyModule();

test("AutoMakhsus CRM proxy preserves domain and applies AutoMakhsus default context", () => {
  const target = crmProxy.buildCrmProxyTargetUrl("https://automakhsus.com/crm");
  assert.equal(target.origin, "http://tehransandali:3000");
  assert.equal(target.pathname, "/crm");
  assert.equal(target.searchParams.get("bu"), "AUTOMAKHSUS_TECHNICAL");
  assert.equal(target.searchParams.get("entry"), "automakhsus");

  const financeTarget = crmProxy.buildCrmProxyTargetUrl("https://automakhsus.com/fa/finance/dashboard");
  assert.equal(financeTarget.origin, "http://tehransandali:3000");
  assert.equal(financeTarget.pathname, "/fa/finance/dashboard");

  assert.equal(
    crmProxy.rewriteCrmLocationHeader("https://tehransandali.ir/fa/admin/login?next=%2Fcrm", "https://automakhsus.com"),
    "https://automakhsus.com/fa/admin/login?next=%2Fcrm",
  );
  assert.equal(
    crmProxy.rewriteCrmTextPayload('<script src="/_next/static/chunk.js"></script>', "https://automakhsus.com"),
    '<script src="/crm-next/static/chunk.js"></script>',
  );
  assert.equal(
    crmProxy.rewriteCrmTextPayload('<a href="https://tehransandali.ir/fa/admin/crm">CRM</a>', "https://automakhsus.com"),
    '<a href="https://automakhsus.com/fa/admin/crm">CRM</a>',
  );
});

test("AutoMakhsus CRM proxy derives public origin from forwarded host instead of internal container URL", () => {
  const request = new Request("http://0.0.0.0:3000/fa/admin/login?next=%2Fcrm", {
    headers: {
      host: "automakhsus.com",
      "x-forwarded-proto": "https",
    },
  });

  assert.equal(crmProxy.crmPublicHostFromHeaders(request.headers), "automakhsus.com");
  assert.equal(crmProxy.crmPublicOriginFromRequest(request), "https://automakhsus.com");

  const forwardedRequest = new Request("http://0.0.0.0:3000/fa/admin/login?next=%2Fcrm", {
    headers: {
      host: "0.0.0.0:3000",
      "x-forwarded-host": "automakhsus.com",
      "x-forwarded-proto": "https",
    },
  });

  assert.equal(crmProxy.crmPublicHostFromHeaders(forwardedRequest.headers), "automakhsus.com");
  assert.equal(crmProxy.crmPublicOriginFromRequest(forwardedRequest), "https://automakhsus.com");

  const internalForwardedHostRequest = new Request("http://0.0.0.0:3000/fa/admin/login?next=%2Fcrm", {
    headers: {
      host: "automakhsus.com",
      "x-forwarded-host": "0.0.0.0:3000",
      "x-forwarded-proto": "https",
    },
  });

  assert.equal(crmProxy.crmPublicHostFromHeaders(internalForwardedHostRequest.headers), "automakhsus.com");
  assert.equal(crmProxy.crmPublicOriginFromRequest(internalForwardedHostRequest), "https://automakhsus.com");
});

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
