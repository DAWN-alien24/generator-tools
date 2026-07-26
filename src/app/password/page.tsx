"use client";
import { useState, useCallback } from "react";
import { useLang } from "@/i18n/context";
import { Copy, RefreshCw } from "lucide-react";

export default function PasswordPage() {
  const { t } = useLang();
  const [len, setLen] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [nums, setNums] = useState(true);
  const [syms, setSyms] = useState(true);
  const [pwd, setPwd] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (nums) chars += "0123456789";
    if (syms) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    setPwd(Array.from(arr, v => chars[v % chars.length]).join(""));
    setCopied(false);
  }, [len, upper, lower, nums, syms]);

  const copy = () => { navigator.clipboard.writeText(pwd); setCopied(true); };

  const strength = (() => {
    let s = 0;
    if (len >= 12) s++; if (len >= 16) s++;
    if (upper && lower) s++; if (nums) s++; if (syms) s++;
    if (s <= 2) return { label: t("pwd.weak"), color: "text-[var(--red)]", pct: 25 };
    if (s <= 3) return { label: t("pwd.medium"), color: "text-yellow-500", pct: 50 };
    if (s <= 4) return { label: t("pwd.strong"), color: "text-[var(--green)]", pct: 75 };
    return { label: t("pwd.veryStrong"), color: "text-[var(--green)]", pct: 100 };
  })();

  const cb = (checked: boolean, setter: (v: boolean) => void) => () => setter(checked);

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">{t("pwd.title")}</h1>
      <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm text-[var(--muted)] whitespace-nowrap">{t("pwd.length")}: {len}</label>
          <input type="range" min={8} max={64} value={len} onChange={e => setLen(Number(e.target.value))} className="flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[ [upper, setUpper, "pwd.uppercase"], [lower, setLower, "pwd.lowercase"], [nums, setNums, "pwd.numbers"], [syms, setSyms, "pwd.symbols"] ].map(([v, s, k], i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={v as boolean} onChange={e => (s as Function)(e.target.checked)} className="accent-[var(--accent)]" />
              <span className="text-[var(--text)]">{t(k as string)}</span>
            </label>
          ))}
        </div>
        <button onClick={generate} className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4" />{t("pwd.generate")}
        </button>
      </div>
      {pwd && (
        <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] space-y-4">
          <div className="flex items-center gap-2">
            <code className="flex-1 text-lg font-mono break-all bg-[var(--bg)] p-3 rounded-lg">{pwd}</code>
            <button onClick={copy} className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              {copied ? <span className="text-[var(--green)] text-xs">✓</span> : <Copy className="w-4 h-4 text-[var(--muted)]" />}
            </button>
          </div>
          <div>
            <div className="flex justify-between text-xs text-[var(--muted)] mb-1">
              <span>{t("pwd.strength")}</span><span className={strength.color}>{strength.label}</span>
            </div>
            <div className="h-2 bg-[var(--bg)] rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${strength.pct >= 75 ? "bg-[var(--green)]" : strength.pct >= 50 ? "bg-yellow-500" : "bg-[var(--red)]"}`} style={{ width: `${strength.pct}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
