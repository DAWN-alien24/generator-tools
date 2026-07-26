"use client";
import Link from "next/link";
import { useLang } from "@/i18n/context";
import { Lock, QrCode, User, Hash } from "lucide-react";

export default function HomePage() {
  const { t } = useLang();
  const tools = [
    { href: "/password", icon: <Lock className="w-6 h-6" />, title: t("home.pwd.title"), desc: t("home.pwd.desc") },
    { href: "/qr", icon: <QrCode className="w-6 h-6" />, title: t("home.qr.title"), desc: t("home.qr.desc") },
    { href: "/name", icon: <User className="w-6 h-6" />, title: t("home.name.title"), desc: t("home.name.desc") },
    { href: "/uuid", icon: <Hash className="w-6 h-6" />, title: t("home.uuid.title"), desc: t("home.uuid.desc") },
  ];
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t("home.title")}</h1>
        <p className="text-[var(--muted)]">{t("home.subtitle")}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {tools.map(tool => (
          <Link key={tool.href} href={tool.href}
            className="flex items-start gap-4 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] transition-all group">
            <div className="text-[var(--accent)] mt-0.5">{tool.icon}</div>
            <div>
              <h2 className="font-bold group-hover:text-[var(--accent)] transition-colors">{tool.title}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
