"use client";
import { useState } from "react";
import { useLang } from "@/i18n/context";
import { Copy, RefreshCw } from "lucide-react";

function genUUID(): string {
  return crypto.randomUUID();
}

export default function UUIDPage() {
  const { t } = useLang();
  const [count, setCount] = useState(10);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => { setUuids(Array.from({ length: count }, genUUID)); setCopied(false); };
  const copyAll = () => { navigator.clipboard.writeText(uuids.join("\n")); setCopied(true); };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">{t("uuid.title")}</h1>
      <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] space-y-4">
        <div className="space-y-1">
          <label className="text-xs text-[var(--muted)]">{t("uuid.count")}</label>
          <input type="number" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))}
            className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 outline-none focus:border-[var(--accent)] text-[var(--text)]" />
        </div>
        <button onClick={generate} className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-bold hover:opacity-90 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4" />{t("uuid.generate")}
        </button>
      </div>
      {uuids.length > 0 && (
        <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--muted)]">{uuids.length} UUIDs</span>
            <button onClick={copyAll} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--muted)] hover:border-[var(--accent)] transition-colors">
              {copied ? "✓" : <Copy className="w-3 h-3" />}{t("uuid.copy")}
            </button>
          </div>
          <div className="space-y-2">
            {uuids.map((u, i) => <div key={i} className="bg-[var(--bg)] rounded-lg px-3 py-2 text-sm font-mono break-all">{u}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
