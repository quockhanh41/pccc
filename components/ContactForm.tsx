"use client";
import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setStatus("ok"); form.reset(); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  const field = "w-full rounded-md border border-line px-3 py-2 outline-none transition focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">Họ và tên</label>
        <input id="name" name="name" required className={field} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink">Số điện thoại</label>
        <input id="phone" name="phone" required inputMode="tel" className={field} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">Nhu cầu / sản phẩm quan tâm</label>
        <textarea id="message" name="message" rows={4} className={field} />
      </div>
      <button type="submit" disabled={status === "sending"}
              className="cursor-pointer rounded-md bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60">
        {status === "sending" ? "Đang gửi..." : "Gửi yêu cầu"}
      </button>
      {status === "ok" && <p className="text-sm font-medium text-green-600">Đã gửi! Chúng tôi sẽ liên hệ lại sớm.</p>}
      {status === "error" && (
        <p className="text-sm font-medium text-accent">
          Gửi chưa được. Vui lòng gọi {site.phone} hoặc kiểm tra lại Formspree endpoint trong data/site.ts.
        </p>
      )}
    </form>
  );
}
