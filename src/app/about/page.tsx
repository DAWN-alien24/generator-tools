"use client";
import { useLang } from "@/i18n/context";
export default function AboutPage() {
  const { t } = useLang();
  return (
    <div className="max-w-2xl mx-auto space-y-6 text-sm text-[var(--muted)] leading-relaxed">
      <h1 className="text-2xl font-bold text-[var(--text)]">About Free Online Generators</h1>
      <p>We provide free, instant online generators for passwords, QR codes, random names, and UUIDs.</p>
      <p>All tools run entirely in your browser. No data is sent to any server. Your privacy is our priority.</p>
      <p>Our site is supported by non-intrusive advertisements, which allows us to keep all tools free forever.</p>
    </div>
  );
}
