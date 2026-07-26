"use client";
import Link from "next/link";
import { useLang } from "@/i18n/context";
import { Lock, QrCode, User, Hash, ArrowRight, Shield, Zap, Globe } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  password: <Lock className="w-7 h-7" />,
  qr: <QrCode className="w-7 h-7" />,
  name: <User className="w-7 h-7" />,
  uuid: <Hash className="w-7 h-7" />,
};

const gradients: Record<string, string> = {
  password: "from-violet-500 to-indigo-600",
  qr: "from-cyan-500 to-blue-600",
  name: "from-amber-500 to-orange-600",
  uuid: "from-emerald-500 to-teal-600",
};

const bgPatterns: Record<string, string> = {
  password: "bg-gradient-to-br from-violet-500/10 to-indigo-600/10",
  qr: "bg-gradient-to-br from-cyan-500/10 to-blue-600/10",
  name: "bg-gradient-to-br from-amber-500/10 to-orange-600/10",
  uuid: "bg-gradient-to-br from-emerald-500/10 to-teal-600/10",
};

export default function HomePage() {
  const { t } = useLang();

  const tools = [
    { href: "/password", key: "password", title: t("home.pwd.title"), desc: t("home.pwd.desc") },
    { href: "/qr", key: "qr", title: t("home.qr.title"), desc: t("home.qr.desc") },
    { href: "/name", key: "name", title: t("home.name.title"), desc: t("home.name.desc") },
    { href: "/uuid", key: "uuid", title: t("home.uuid.title"), desc: t("home.uuid.desc") },
  ];

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center space-y-6 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-bg)] border border-[var(--accent)]/20 text-[var(--accent)] text-[13px] font-medium">
          <Zap className="w-3.5 h-3.5" />
          100% Free · No Signup · Private
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
          <span className="gradient-text">Free Online</span>
          <br />
          <span className="text-[var(--text)]">Generators</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
          {t("home.subtitle")}
        </p>
        <div className="flex items-center justify-center gap-8 text-[13px] text-[var(--muted)]">
          {[
            [<Shield className="w-4 h-4" />, "Browser-only"],
            [<Zap className="w-4 h-4" />, "Instant"],
            [<Globe className="w-4 h-4" />, "6 Languages"],
          ].map(([icon, label], i) => (
            <span key={i} className="flex items-center gap-1.5">{icon}{label}</span>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {tools.map((tool, i) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group card card-glow p-7 animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-5">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[tool.key]} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                {icons[tool.key]}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                  {tool.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-200 mt-1 shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
