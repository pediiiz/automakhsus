import { NextRequest, NextResponse } from "next/server";

import { mediaApiFetchBase } from "@/lib/media-center-public";

const forwardedResponseHeaders = [
  "content-type",
  "content-length",
  "content-range",
  "accept-ranges",
  "cache-control",
  "etag",
  "last-modified",
];

function targetUrl(request: NextRequest, path: string) {
  const target = new URL(`${mediaApiFetchBase()}${path.startsWith("/") ? path : `/${path}`}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });
  return target;
}

function forwardedHeaders(request: NextRequest, bodyContentType?: string | null) {
  const headers = new Headers();
  const visitor = request.headers.get("x-am-media-visitor");
  const range = request.headers.get("range");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";

  if (visitor) headers.set("x-am-media-visitor", visitor);
  if (range) headers.set("range", range);
  if (host) headers.set("x-forwarded-host", host);
  headers.set("x-forwarded-proto", proto);
  if (bodyContentType) headers.set("content-type", bodyContentType);

  return headers;
}

async function proxiedResponse(request: NextRequest, response: Response) {
  const headers = new Headers();
  for (const key of forwardedResponseHeaders) {
    const value = response.headers.get(key);
    if (value) headers.set(key, value);
  }
  headers.set("x-am-media-proxy", "automakhsus");

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/vnd.apple.mpegurl")) {
    const text = await response.text();
    if (text.includes("#EXTM3U") || contentType.includes("application/vnd.apple.mpegurl")) {
      headers.delete("content-length");
      return new NextResponse(
        text.replace(/https?:\/\/(?:www\.)?tehransandali\.ir\/api\/public\/media-center/g, "/api/public/media-center"),
        {
          status: response.status,
          statusText: response.statusText,
          headers,
        },
      );
    }
    return new NextResponse(text, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function proxyPublicMediaRequest(
  request: NextRequest,
  path: string,
  init?: { method?: "GET" | "POST"; body?: BodyInit | null; contentType?: string | null },
) {
  const response = await fetch(targetUrl(request, path), {
    method: init?.method || "GET",
    body: init?.body,
    headers: forwardedHeaders(request, init?.contentType),
    cache: "no-store",
    redirect: "manual",
  });

  return proxiedResponse(request, response);
}
