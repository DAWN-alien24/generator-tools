"use client";
import { useLang, LANG_LABELS, type Lang } from "@/i18n/context";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
const LANGS: Lang[] = ["en","zh-TW","ja","ko","es","fr"];
export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-[var(--border)] text-xs text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-all">
        <Globe className="w-3.5 h-3.5" />{LANG_LABELS[lang]}
      </button>
      {open && <div className="absolute right-0 top-full mt-1 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
        {LANGS.map(l => <button key={l} onClick={() => { setLang(l); setOpen(false); }} className={`w-full text-left px-3 py-1.5 text-sm hover:bg-[var(--bg)] transition-colors ${lang===l?"text-[var(--accent)] font-medium":"text-[var(--text)]"}`}>{LANG_LABELS[l]}</button>)}
      </div>}
    </div>
  );
}
