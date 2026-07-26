"use client";
import { useLang } from "@/i18n/context";
import { Shield, Zap, Globe, Lock } from "lucide-react";

export default function AboutPage() {
  const { t } = useLang();

  const features = [
    { icon: <Shield className="w-5 h-5" />, title: "100% Private", desc: "All tools run in your browser. No data is sent to any server." },
    { icon: <Zap className="w-5 h-5" />, title: "Instant Results", desc: "Generate passwords, QR codes, names, and UUIDs in milliseconds." },
    { icon: <Globe className="w-5 h-5" />, title: "6 Languages", desc: "Available in English, Chinese, Japanese, Korean, Spanish, and French." },
    { icon: <Lock className="w-5 h-5" />, title: "No Signup", desc: "Use any tool immediately. No account, no email, no tracking." },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-extrabold tracking-tight gradient-text inline-block">About</h1>
        <p className="text-lg text-[var(--text-secondary)] mt-4 leading-relaxed">
          We build free, instant online generators that respect your privacy.
          Every tool runs entirely in your browser — nothing leaves your device.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
        {features.map((f, i) => (
          <div key={i} className="card p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center text-[var(--accent)]">
              {f.icon}
            </div>
            <h3 className="font-bold text-[var(--text)]">{f.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="card p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Our site is supported by non-intrusive advertisements, which allows us to keep all tools free forever.
          We do not collect, store, or sell any user data.
        </p>
      </div>
    </div>
  );
}
