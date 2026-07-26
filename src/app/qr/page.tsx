"use client";
import { useState, useRef, useCallback } from "react";
import { useLang } from "@/i18n/context";
import { Download } from "lucide-react";

export default function QRPage() {
  const { t } = useLang();
  const [text, setText] = useState("");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [qrUrl, setQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(async () => {
    if (!text) return;
    const QRCode = await import("qrcode");
    const canvas = canvasRef.current;
    if (!canvas) return;
    await QRCode.toCanvas(canvas, text, { width: 300, margin: 2, color: { dark: fg, light: bg } });
    setQrUrl(canvas.toDataURL("image/png"));
  }, [text, fg, bg]);

  const download = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl; a.download = "qr-code.png"; a.click();
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">{t("qr.title")}</h1>
      <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] space-y-4">
        <input value={text} onChange={e => setText(e.target.value)} placeholder={t("qr.placeholder")}
          className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 outline-none focus:border-[var(--accent)] text-[var(--text)]" />
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-[var(--muted)]">{t("qr.foreground")}</label>
            <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[var(--muted)]">{t("qr.background")}</label>
            <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer" />
          </div>
        </div>
        <button onClick={generate} className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-bold hover:opacity-90">{t("qr.generate")}</button>
      </div>
      {qrUrl && (
        <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] flex flex-col items-center gap-4">
          <img src={qrUrl} alt="QR Code" className="rounded-lg" />
          <canvas ref={canvasRef} className="hidden" />
          <button onClick={download} className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:opacity-90">
            <Download className="w-4 h-4" />{t("qr.download")}
          </button>
        </div>
      )}
    </div>
  );
}
