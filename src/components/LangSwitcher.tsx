"use client";
import { useLang, LANG_LABELS, type Lang } from "@/i18n/context";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LANGS: Lang[] = ["en", "zh-TW", "ja", "ko", "es", "fr"];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-[13px] font-medium text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent-bg)] transition-all duration-200"
      >
        <Globe className="w-3.5 h-3.5" />
        {LANG_LABELS[lang]}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg py-1.5 z-50 min-w-[160px] animate-scale-in">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-[13px] transition-all duration-150 ${
                lang === l
                  ? "text-[var(--accent)] font-semibold bg-[var(--accent-bg)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
              }`}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
