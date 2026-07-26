"use client";
import { useState, useCallback } from "react";
import { useLang } from "@/i18n/context";
import { Copy, RefreshCw, Check, Shield, AlertTriangle, CheckCircle } from "lucide-react";

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
    setPwd(Array.from(arr, (v) => chars[v % chars.length]).join(""));
    setCopied(false);
  }, [len, upper, lower, nums, syms]);

  const copy = () => {
    navigator.clipboard.writeText(pwd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = (() => {
    let s = 0;
    if (len >= 12) s++;
    if (len >= 16) s++;
    if (len >= 24) s++;
    if (upper && lower) s++;
    if (nums) s++;
    if (syms) s++;
    if (s <= 2) return { label: t("pwd.weak"), color: "var(--red)", bg: "var(--red-bg)", icon: <AlertTriangle className="w-4 h-4" />, pct: 25 };
    if (s <= 3) return { label: t("pwd.medium"), color: "var(--yellow)", bg: "var(--yellow-bg)", icon: <Shield className="w-4 h-4" />, pct: 50 };
    if (s <= 4) return { label: t("pwd.strong"), color: "var(--green)", bg: "var(--green-bg)", icon: <CheckCircle className="w-4 h-4" />, pct: 75 };
    return { label: t("pwd.veryStrong"), color: "var(--green)", bg: "var(--green-bg)", icon: <CheckCircle className="w-4 h-4" />, pct: 100 };
  })();

  const options: [boolean, (v: boolean) => void, string][] = [
    [upper, setUpper, "pwd.uppercase"],
    [lower, setLower, "pwd.lowercase"],
    [nums, setNums, "pwd.numbers"],
    [syms, setSyms, "pwd.symbols"],
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-extrabold tracking-tight gradient-text inline-block">{t("pwd.title")}</h1>
      </div>

      <div className="card p-8 space-y-6 animate-slide-up" style={{ animationDelay: "80ms" }}>
        {/* Length slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[var(--text)]">{t("pwd.length")}</label>
            <span className="text-2xl font-extrabold gradient-text tabular-nums">{len}</span>
          </div>
          <input type="range" min={8} max={64} value={len} onChange={(e) => setLen(Number(e.target.value))} />
          <div className="flex justify-between text-[11px] text-[var(--muted)] font-medium">
            <span>8</span><span>64</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {options.map(([v, s, k], i) => (
            <label
              key={i}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-1.5 cursor-pointer transition-all duration-200 ${
                v
                  ? "border-[var(--accent)] bg-[var(--accent-bg)]"
                  : "border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--muted)]"
              }`}
            >
              <input type="checkbox" checked={v} onChange={(e) => s(e.target.checked)} />
              <span className="text-sm font-medium text-[var(--text)]">{t(k)}</span>
            </label>
          ))}
        </div>

        {/* Generate button */}
        <button onClick={generate} className="btn-primary flex items-center justify-center gap-2.5">
          <RefreshCw className="w-4 h-4" />
          {t("pwd.generate")}
        </button>
      </div>

      {/* Result */}
      {pwd && (
        <div className="card p-8 space-y-5 animate-scale-in">
          {/* Password display */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-[var(--bg-subtle)] rounded-xl p-4 border border-[var(--border)]">
              <code className="code-display text-[var(--text)]">{pwd}</code>
            </div>
            <button
              onClick={copy}
              className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                copied
                  ? "bg-[var(--green)] text-white scale-110"
                  : "bg-[var(--accent-bg)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* Strength bar */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">{t("pwd.strength")}</span>
              <span className="flex items-center gap-1.5 text-sm font-bold" style={{ color: strength.color }}>
                {strength.icon}
                {strength.label}
              </span>
            </div>
            <div className="h-2 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${strength.pct}%`,
                  background: `linear-gradient(90deg, ${strength.color}, ${strength.color}dd)`,
                }}
              />
            </div>
          </div>

          {/* Entropy info */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--bg-subtle)] text-xs text-[var(--muted)]">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            <span>
              Entropy: ~{Math.round(len * Math.log2((upper ? 26 : 0) + (lower ? 26 : 0) + (nums ? 10 : 0) + (syms ? 32 : 0) || 26))} bits
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
