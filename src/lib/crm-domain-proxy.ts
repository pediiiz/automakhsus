const defaultCrmBackendOrigin = "http://tehransandali:3000";
const crmBackendOrigin = process.env.SHARED_CRM_INTERNAL_ORIGIN || defaultCrmBackendOrigin;

const hopByHopHeaders = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

export function crmProxyBackendOrigin() {
  return crmBackendOrigin;
}

export function buildCrmProxyTargetUrl(requestUrl: string, pathOverride?: string) {
  const incoming = new URL(requestUrl);
  const target = new URL(pathOverride || `${incoming.pathname}${incoming.search}`, crmBackendOrigin);

  if (target.pathname === "/crm") {
    if (!target.searchParams.get("bu")) target.searchParams.set("bu", "AUTOMAKHSUS_TECHNICAL");
    if (!target.searchParams.get("entry")) target.searchParams.set("entry", "automakhsus");
  }

  return target;
}

export function rewriteCrmTextPayload(input: string, publicOrigin: string) {
  return input
    .replaceAll(`${crmBackendOrigin}/_next/`, `${publicOrigin}/crm-next/`)
    .replaceAll("https://tehransandali.ir/_next/", `${publicOrigin}/crm-next/`)
    .replaceAll("http://tehransandali.ir/_next/", `${publicOrigin}/crm-next/`)
    .replaceAll("/_next/", "/crm-next/")
    .replaceAll("https://tehransandali.ir", publicOrigin)
    .replaceAll("http://tehransandali.ir", publicOrigin)
    .replaceAll(crmBackendOrigin, publicOrigin);
}

export function rewriteCrmLocationHeader(location: string | null, publicOrigin: string) {
  if (!location) return location;
  if (location.startsWith(crmBackendOrigin)) return location.replace(crmBackendOrigin, publicOrigin);
  if (location.startsWith("https://tehransandali.ir")) return location.replace("https://tehransandali.ir", publicOrigin);
  if (location.startsWith("http://tehransandali.ir")) return location.replace("http://tehransandali.ir", publicOrigin);
  return location;
}

export function crmPublicHostFromHeaders(headers: Pick<Headers, "get">) {
  const forwardedHost = headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || headers.get("host")?.trim();
  const directHost = headers.get("host")?.trim();
  const candidate = forwardedHost && !isInternalNextHost(forwardedHost) ? forwardedHost : directHost || host;
  return candidate || "automakhsus.com";
}

export function crmPublicOriginFromRequest(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const requestProto = new URL(request.url).protocol.replace(":", "");
  const proto = forwardedProto || requestProto || "https";
  return `${proto}://${crmPublicHostFromHeaders(request.headers)}`;
}

function isInternalNextHost(host: string) {
  const normalized = host.toLowerCase().split(":")[0];
  return normalized === "0.0.0.0" || normalized === "127.0.0.1" || normalized === "localhost";
}

function proxiedRequestHeaders(request: Request, publicHost: string) {
  const incoming = new URL(request.url);
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");
  headers.delete("accept-encoding");
  headers.set("x-forwarded-host", publicHost);
  headers.set("x-forwarded-proto", "https");
  headers.set("x-crm-brand-context", "automakhsus");
  headers.set("x-crm-entry-domain", publicHost);
  headers.set("x-current-pathname", incoming.pathname);
  return headers;
}

function proxiedResponseHeaders(response: Response, publicOrigin: string) {
  const headers = new Headers();

  response.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (hopByHopHeaders.has(lower)) return;
    if (lower === "location") {
      const rewritten = rewriteCrmLocationHeader(value, publicOrigin);
      if (rewritten) headers.set(key, rewritten);
      return;
    }
    headers.set(key, value);
  });

  return headers;
}

function shouldRewriteBody(contentType: string | null) {
  if (!contentType) return false;
  return (
    contentType.includes("text/html") ||
    contentType.includes("text/x-component") ||
    contentType.includes("application/javascript") ||
    contentType.includes("text/javascript") ||
    contentType.includes("application/json")
  );
}

export async function proxySharedCrmRequest(request: Request, pathOverride?: string) {
  const publicOrigin = crmPublicOriginFromRequest(request);
  const publicHost = crmPublicHostFromHeaders(request.headers);
  const target = buildCrmProxyTargetUrl(request.url, pathOverride);
  const hasBody = !["GET", "HEAD"].includes(request.method);
  const init: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers: proxiedRequestHeaders(request, publicHost),
    redirect: "manual",
  };

  if (hasBody) {
    init.body = request.body;
    init.duplex = "half";
  }

  const response = await fetch(target, init);
  const headers = proxiedResponseHeaders(response, publicOrigin);
  const contentType = response.headers.get("content-type");

  if (shouldRewriteBody(contentType)) {
    const body = rewriteCrmTextPayload(await response.text(), publicOrigin);
    headers.delete("content-length");
    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
