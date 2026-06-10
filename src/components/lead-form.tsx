"use client";

import { useState } from "react";

const interests = [
  "درخواست همکاری",
  "مشاوره اکوسیستم خودرو",
  "ورود به شبکه برندها",
  "CRM و پلتفرم دیجیتال",
  "خدمات ناوگان و سازمانی",
  "پروژه VIP ون و کمپر",
  "صندلی، تودوزی و طراحی داخلی",
];

type State = "idle" | "loading" | "success" | "error";

export function LeadForm({ sourcePage, interest = "درخواست همکاری" }: { sourcePage: string; interest?: string }) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      form.reset();
      setState("success");
      setMessage(data.message || "درخواست شما ثبت شد.");
    } else {
      setState("error");
      setMessage(data.message || "ثبت درخواست انجام نشد.");
    }
  }

  return (
    <form id="lead" onSubmit={submit} className="lead-card grid gap-4 p-5 md:p-7">
      <input type="hidden" name="source" value="automakhsus" />
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <div>
        <p className="eyebrow">Auto Makhsus CRM</p>
        <h2 className="mt-2 text-2xl font-black md:text-3xl">درخواست همکاری یا ارتباط با اکوسیستم</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          درخواست شما با منبع Auto Makhsus وارد CRM می‌شود تا مسیر همکاری، معرفی برند یا خدمات سازمانی پیگیری شود.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input className="field" name="fullName" required placeholder="نام و نام خانوادگی" />
        <input className="field" name="phone" required inputMode="tel" placeholder="شماره موبایل" />
      </div>
      <input className="field" name="company" placeholder="شرکت یا سازمان، اختیاری" />
      <select className="field" name="interest" defaultValue={interest} required>
        {interests.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <textarea className="field min-h-28" name="description" placeholder="موضوع همکاری، برند مورد نظر، نیاز سازمانی یا توضیح درخواست" />
      <button className="btn-primary w-full" disabled={state === "loading"} type="submit">
        {state === "loading" ? "در حال ثبت..." : "ثبت درخواست"}
      </button>
      {message ? <p className={`text-sm font-bold ${state === "success" ? "text-sky-700" : "text-red-700"}`}>{message}</p> : null}
    </form>
  );
}
