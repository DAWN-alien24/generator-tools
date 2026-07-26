"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { T, LANG_LABELS, type Lang } from "./translations";
interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; }
const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const setLang = useCallback((l: Lang) => { setLangState(l); if (typeof window !== "undefined") localStorage.setItem("gen-lang", l); }, []);
  const t = useCallback((key: string): string => (T[lang]?.[key] ?? T.en[key] ?? key).replace("{year}", String(new Date().getFullYear())), [lang]);
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}
export function useLang() { return useContext(LanguageContext); }
export { LANG_LABELS };
export type { Lang };
