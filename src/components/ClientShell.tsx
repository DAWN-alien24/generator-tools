"use client";
import { type ReactNode } from "react";
import { LanguageProvider, useLang } from "@/i18n/context";
import LangSwitcher from "./LangSwitcher";
import { Sparkles } from "lucide-react";

function Nav() {
  const { t } = useLang();
  return (
    <nav className="sticky top-0 z-50 glass border-b border-[var(--border-subtle)]">
      <div className="w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[var(--gradient)] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-[17px] font-bold tracking-tight text-[var(--text)]">
            Generators
          </span>
        </a>
        <div className="flex items-center gap-6 text-[13px] font-medium text-[var(--muted)]">
          <a href="/" className="hover:text-[var(--accent)] transition-colors duration-200">{t("nav.tools")}</a>
          <a href="/about" className="hover:text-[var(--accent)] transition-colors duration-200">{t("nav.about")}</a>
          <LangSwitcher />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-[var(--border-subtle)] mt-auto">
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[var(--gradient)] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-[var(--text-secondary)]">Generators</span>
          </div>
          <p className="text-xs text-[var(--muted)]">{t("footer.copy")}</p>
        </div>
      </div>
    </footer>
  );
}

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="w-full max-w-5xl mx-auto px-6 py-12 flex-1 animate-fade-in">
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
