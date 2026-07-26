"use client";
import { type ReactNode } from "react";
import { LanguageProvider, useLang } from "@/i18n/context";
import LangSwitcher from "./LangSwitcher";
function Nav() { const { t } = useLang(); return (
  <nav className="w-full max-w-4xl px-6 py-4 flex items-center justify-between border-b border-[var(--border)]">
    <a href="/" className="font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">{t("nav.home")}</a>
    <div className="flex items-center gap-5 text-xs text-[var(--muted)]">
      <a href="/" className="hover:text-[var(--text)] transition-colors">{t("nav.tools")}</a>
      <a href="/about" className="hover:text-[var(--text)] transition-colors">{t("nav.about")}</a>
      <LangSwitcher />
    </div>
  </nav>
); }
function Footer() { const { t } = useLang(); return (
  <footer className="w-full max-w-4xl px-6 py-6 text-center text-xs text-[var(--muted)] border-t border-[var(--border)]">
    <p>{t("footer.copy")}</p>
  </footer>
); }
export default function ClientShell({ children }: { children: ReactNode }) {
  return <LanguageProvider><Nav /><main className="w-full max-w-4xl px-6 py-8 flex-1">{children}</main><Footer /></LanguageProvider>;
}
