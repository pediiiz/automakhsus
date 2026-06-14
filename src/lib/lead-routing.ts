export const crmBusinessUnits = [
  "TEHRANSANDALI",
  "ANI2203",
  "TUDUZI",
  "AUTOMAKHSUS_TECHNICAL",
  "AUTOMAKHSUS_MARKETPLACE",
] as const;

export type CrmBusinessUnit = (typeof crmBusinessUnits)[number];

export const businessUnitLabels: Record<CrmBusinessUnit, string> = {
  TEHRANSANDALI: "TehranSandali",
  ANI2203: "ANI2203",
  TUDUZI: "Tuduzi",
  AUTOMAKHSUS_TECHNICAL: "AutoMakhsus Technical",
  AUTOMAKHSUS_MARKETPLACE: "AutoMakhsus Marketplace",
};

const businessUnitAliases: Record<string, CrmBusinessUnit> = {
  tehransandali: "TEHRANSANDALI",
  "tehran sandali": "TEHRANSANDALI",
  "تهران صندلی": "TEHRANSANDALI",
  ani2203: "ANI2203",
  "ani 2203": "ANI2203",
  "آنی سرویس": "ANI2203",
  tuduzi: "TUDUZI",
  "تودوزی": "TUDUZI",
  automakhsustechnical: "AUTOMAKHSUS_TECHNICAL",
  "automakhsus technical": "AUTOMAKHSUS_TECHNICAL",
  "auto makhsus technical": "AUTOMAKHSUS_TECHNICAL",
  "اتو مخصوص فنی": "AUTOMAKHSUS_TECHNICAL",
  automakhsusmarketplace: "AUTOMAKHSUS_MARKETPLACE",
  "automakhsus marketplace": "AUTOMAKHSUS_MARKETPLACE",
  "auto makhsus marketplace": "AUTOMAKHSUS_MARKETPLACE",
  "اتو مخصوص مارکت": "AUTOMAKHSUS_MARKETPLACE",
  "فروشگاه اتو مخصوص": "AUTOMAKHSUS_MARKETPLACE",
};

function normalizeBusinessUnitInput(value?: string | null) {
  return (value || "").trim().replaceAll("_", " ").replace(/\s+/g, " ").toLowerCase();
}

export function normalizeCrmBusinessUnit(value?: string | null): CrmBusinessUnit | null {
  const trimmed = (value || "").trim();
  if (!trimmed) return null;
  if ((crmBusinessUnits as readonly string[]).includes(trimmed)) return trimmed as CrmBusinessUnit;
  return businessUnitAliases[normalizeBusinessUnitInput(trimmed)] || null;
}

export function inferLeadBusinessUnit(interest: string, submitted?: string | null): CrmBusinessUnit {
  const submittedUnit = normalizeCrmBusinessUnit(submitted);
  if (submittedUnit) return submittedUnit;
  if (interest.includes("قطعه") || interest.includes("فروشگاه") || interest.includes("خرید")) {
    return "AUTOMAKHSUS_MARKETPLACE";
  }
  return "AUTOMAKHSUS_TECHNICAL";
}

export function businessUnitLabel(unit: CrmBusinessUnit) {
  return businessUnitLabels[unit];
}
