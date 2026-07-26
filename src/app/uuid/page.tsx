"use client";
import { useState } from "react";
import { useLang } from "@/i18n/context";
import { Copy, RefreshCw, Check, Fingerprint } from "lucide-react";

export default function UUIDPage() {
  const { t } = useLang();
  const [count, setCount] = useState(10);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setUuids(Array.from({ length: count }, () => crypto.randomUUID()));
    setCopied(false);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-extrabold tracking-tight gradient-text inline-block">{t("uuid.title")}</h1>
      </div>

      <div className="card p-8 space-y-5 animate-slide-up" style={{ animationDelay: "80ms" }}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--text)]">{t("uuid.count")}</label>
          <input
            type="number" min={1} max={100} value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="input"
          />
        </div>
        <button onClick={generate} className="btn-primary flex items-center justify-center gap-2.5">
          <RefreshCw className="w-4 h-4" />
          {t("uuid.generate")}
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="card p-8 space-y-5 animate-scale-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <Fingerprint className="w-4 h-4" />
              {uuids.length} UUIDs
            </div>
            <button
              onClick={copyAll}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                copied ? "bg-[var(--green)] text-white" : "btn-secondary"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {t("uuid.copy")}
            </button>
          </div>
          <div className="space-y-2.5">
            {uuids.map((u, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[var(--bg-subtle)] rounded-xl px-4 py-3 border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-200 group"
              >
                <span className="text-[11px] font-bold text-[var(--muted)] w-6 text-right tabular-nums">{i + 1}</span>
                <code className="code-display text-sm text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors flex-1">{u}</code>
                <button
                  onClick={() => { navigator.clipboard.writeText(u); }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-[var(--accent-bg)] text-[var(--muted)] hover:text-[var(--accent)] transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
