import { redirect } from "next/navigation";

export function isCmsConfigured() {
  return Boolean(process.env.AUTOMAKHSUS_CMS_ADMIN_TOKEN);
}

export function isValidCmsToken(token?: string | null) {
  const expected = process.env.AUTOMAKHSUS_CMS_ADMIN_TOKEN;
  return Boolean(expected && token && token === expected);
}

export function requireCmsToken(token?: string | null) {
  if (!isValidCmsToken(token)) {
    throw new Error("CMS_UNAUTHORIZED");
  }
}

export function tokenQuery(token?: string | null) {
  return token ? `?token=${encodeURIComponent(token)}` : "";
}

export function redirectWithToken(path: string, token?: string | null) {
  redirect(`${path}${tokenQuery(token)}`);
}
