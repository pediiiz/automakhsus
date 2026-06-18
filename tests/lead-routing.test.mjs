import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";
import vm from "node:vm";

function loadLeadRoutingModule() {
  const source = fs.readFileSync(new URL("../src/lib/lead-routing.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const sandbox = { exports: {}, module: { exports: {} } };
  sandbox.exports = sandbox.module.exports;
  vm.runInNewContext(compiled, sandbox, { filename: "lead-routing.js" });
  return sandbox.module.exports;
}

const routing = loadLeadRoutingModule();

test("normalizes every CRM business unit required by Auto Makhsus lead routing", () => {
  assert.equal(routing.normalizeCrmBusinessUnit("AutoMakhsus Technical"), "AUTOMAKHSUS_TECHNICAL");
  assert.equal(routing.normalizeCrmBusinessUnit("AutoMakhsus Marketplace"), "AUTOMAKHSUS_MARKETPLACE");
  assert.equal(routing.normalizeCrmBusinessUnit("TehranSandali"), "TEHRANSANDALI");
  assert.equal(routing.normalizeCrmBusinessUnit("ANI2203"), "ANI2203");
  assert.equal(routing.normalizeCrmBusinessUnit("Tuduzi"), "TUDUZI");
});

test("accepts canonical enum values without changing them", () => {
  for (const unit of routing.crmBusinessUnits) {
    assert.equal(routing.normalizeCrmBusinessUnit(unit), unit);
  }
});

test("infers marketplace leads from parts and purchase interests", () => {
  assert.equal(routing.inferLeadBusinessUnit("خرید قطعه"), "AUTOMAKHSUS_MARKETPLACE");
  assert.equal(routing.inferLeadBusinessUnit("فروشگاه قطعات"), "AUTOMAKHSUS_MARKETPLACE");
  assert.equal(routing.inferLeadBusinessUnit("خرید + نصب در Auto Makhsus"), "AUTOMAKHSUS_MARKETPLACE");
});

test("defaults technical service leads to AutoMakhsus Technical", () => {
  assert.equal(routing.inferLeadBusinessUnit("رزرو سرویس خودرو"), "AUTOMAKHSUS_TECHNICAL");
  assert.equal(routing.inferLeadBusinessUnit("دیاگ تخصصی خودرو"), "AUTOMAKHSUS_TECHNICAL");
});

test("submitted business unit overrides inferred interest when valid", () => {
  assert.equal(routing.inferLeadBusinessUnit("خرید قطعه", "ANI2203"), "ANI2203");
  assert.equal(routing.inferLeadBusinessUnit("رزرو سرویس", "TUDUZI"), "TUDUZI");
  assert.equal(routing.inferLeadBusinessUnit("رزرو سرویس", "TEHRANSANDALI"), "TEHRANSANDALI");
});
