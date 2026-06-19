"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import type { PublicMediaAsset, PublicMediaSummary, PublicMediaUserState } from "@/lib/media-center-public";
import { publicMediaProxyUrl } from "@/lib/media-center-public";

function visitorId() {
  const key = "am_public_media_visitor";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(key, next);
  return next;
}

function formatCount(value: number) {
  return value.toLocaleString("fa-IR");
}

export function PublicMediaActions({
  asset,
  relationType,
  relationId,
  onState,
}: {
  asset: PublicMediaAsset;
  relationType: string;
  relationId: string;
  onState?: (state: PublicMediaUserState, summary: PublicMediaSummary) => void;
}) {
  const [state, setState] = useState(asset.userState);
  const [summary, setSummary] = useState(asset.summary);
  const [message, setMessage] = useState("");

  const update = useCallback(
    async (payload: Record<string, unknown>) => {
      setMessage("");
      const response = await fetch(publicMediaProxyUrl(`/assets/${asset.id}/interactions`), {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-am-media-visitor": visitorId(),
        },
        body: JSON.stringify({ ...payload, relationType, relationId }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setMessage(data?.error || "ثبت تعامل ناموفق بود.");
        return;
      }
      setState(data.userState);
      setSummary(data.summary);
      onState?.(data.userState, data.summary);
      setMessage("ذخیره شد.");
    },
    [asset.id, onState, relationId, relationType],
  );

  return (
    <div className="mt-4 rounded-[1.1rem] border border-white/10 bg-white/8 p-3 text-white backdrop-blur">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => update({ action: "engagement", kind: "favorite", enabled: !state.favorite })} className={`media-action ${state.favorite ? "active" : ""}`}>علاقه‌مندی</button>
        <button type="button" onClick={() => update({ action: "engagement", kind: "like", enabled: !state.liked })} className={`media-action ${state.liked ? "active" : ""}`}>پسندیدن</button>
        <button type="button" onClick={() => update({ action: "engagement", kind: "watch_later", enabled: !state.watchLater })} className={`media-action ${state.watchLater ? "active" : ""}`}>بعدا ببینم</button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button key={rating} type="button" onClick={() => update({ action: "rating", rating })} className={`media-rating ${state.rating === rating ? "active" : ""}`}>
            {rating.toLocaleString("fa-IR")}
          </button>
        ))}
        <span className="text-xs font-black text-white/60">{state.rating ? `${state.rating.toLocaleString("fa-IR")} / ۵` : "بدون امتیاز"}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black text-white/55">
        <span>{formatCount(summary.likes)} پسندیدن</span>
        <span>{formatCount(summary.favorites)} علاقه‌مندی</span>
        <span>{formatCount(summary.watchLater)} بعدا ببینم</span>
        <span>{formatCount(summary.ratings)} امتیاز</span>
        {summary.ratingAverage ? <span>میانگین {summary.ratingAverage.toFixed(1)}</span> : null}
      </div>
      {state.progress ? (
        <p className="mt-2 text-[11px] font-black text-white/55">
          ادامه تماشا: {Math.round(state.progress.positionSeconds).toLocaleString("fa-IR")} ثانیه
          {state.progress.durationSeconds ? ` از ${Math.round(state.progress.durationSeconds).toLocaleString("fa-IR")}` : ""}
        </p>
      ) : null}
      {message ? <p className="mt-2 text-[11px] font-black text-[var(--ice)]">{message}</p> : null}
    </div>
  );
}

export function PublicMediaPlayer({ asset, relationType, relationId }: { asset: PublicMediaAsset; relationType: string; relationId: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastSent = useRef(0);
  const playbackUrl = asset.urls.hlsUrl || asset.urls.processedUrl || asset.urls.originalUrl;
  const poster = asset.urls.thumbnailUrl || undefined;
  const isVideo = asset.mimeType.startsWith("video/");
  const [state, setState] = useState(asset.userState);
  const [summary, setSummary] = useState(asset.summary);

  const mediaAsset = useMemo(() => ({ ...asset, userState: state, summary }), [asset, state, summary]);

  const sendProgress = useCallback(
    async (force = false) => {
      const video = videoRef.current;
      if (!video) return;
      const positionSeconds = Math.floor(video.currentTime || 0);
      const durationSeconds = Number.isFinite(video.duration) && video.duration > 0 ? Math.floor(video.duration) : null;
      if (!force && positionSeconds < lastSent.current + 15) return;
      lastSent.current = positionSeconds;
      await fetch(publicMediaProxyUrl(`/assets/${asset.id}/interactions`), {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-am-media-visitor": visitorId(),
        },
        body: JSON.stringify({ action: "progress", positionSeconds, durationSeconds, completed: video.ended, relationType, relationId }),
      }).catch(() => null);
    },
    [asset.id, relationId, relationType],
  );

  if (!playbackUrl) return null;

  return (
    <div className="media-center-panel">
      <div className="media-center-frame">
        {isVideo ? (
          <video
            ref={videoRef}
            className="aspect-video w-full rounded-[1rem] bg-black object-contain"
            controls
            preload="metadata"
            playsInline
            poster={poster}
            onTimeUpdate={() => void sendProgress()}
            onPause={() => void sendProgress(true)}
            onEnded={() => void sendProgress(true)}
          >
            {asset.urls.hlsUrl ? <source src={asset.urls.hlsUrl} type="application/vnd.apple.mpegurl" /> : null}
            {asset.urls.processedUrl ? <source src={asset.urls.processedUrl} type="video/mp4" /> : null}
            {asset.urls.originalUrl ? <source src={asset.urls.originalUrl} type={asset.mimeType} /> : null}
            مرورگر شما پخش ویدئو را پشتیبانی نمی‌کند.
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={playbackUrl} alt={asset.title || asset.originalFilename} className="aspect-video w-full rounded-[1rem] object-cover" />
        )}
      </div>
      <div className="mt-4">
        <p className="eyebrow text-[var(--ice)]">Media API</p>
        <h3 className="mt-2 text-2xl font-black text-white">{asset.title || asset.originalFilename}</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">{asset.description || "این رسانه از Media API محافظت‌شده Auto Makhsus ارائه می‌شود."}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black text-white/50">
          <span>{asset.urls.hlsUrl ? "HLS" : asset.urls.processedUrl ? "MP4" : "Original"}</span>
          <span>{asset.mimeType}</span>
          {asset.durationSeconds ? <span>{Math.round(asset.durationSeconds).toLocaleString("fa-IR")} ثانیه</span> : null}
        </div>
        <PublicMediaActions asset={mediaAsset} relationType={relationType} relationId={relationId} onState={(nextState, nextSummary) => { setState(nextState); setSummary(nextSummary); }} />
      </div>
    </div>
  );
}

export function PublicMediaStrip({ media, relationType, relationId, title }: { media: PublicMediaAsset[]; relationType: string; relationId: string; title: string }) {
  if (!media.length) return null;
  return (
    <section className="section bg-[#07111f] text-white">
      <div className="container-shell">
        <p className="eyebrow text-[var(--ice)]">Media Center</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">{title}</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {media.slice(0, 2).map((asset) => <PublicMediaPlayer key={asset.id} asset={asset} relationType={relationType} relationId={relationId} />)}
        </div>
      </div>
    </section>
  );
}
