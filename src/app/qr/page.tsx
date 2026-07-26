"use client";
import { useState, useRef, useCallback } from "react";
import { useLang } from "@/i18n/context";
import { Download, Palette } from "lucide-react";

export default function QRPage() {
  const { t } = useLang();
  const [text, setText] = useState("");
  const [fg, setFg] = useState("#0f172a");
  const [bg, setBg] = useState("#ffffff");
  const [qrUrl, setQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(async () => {
    if (!text) return;
    const QRCode = await import("qrcode");
    const canvas = canvasRef.current;
    if (!canvas) return;
    await QRCode.toCanvas(canvas, text, {
      width: 320,
      margin: 2,
      color: { dark: fg, light: bg },
      errorCorrectionLevel: "H",
    });
    setQrUrl(canvas.toDataURL("image/png"));
  }, [text, fg, bg]);

  const download = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-extrabold tracking-tight gradient-text inline-block">{t("qr.title")}</h1>
      </div>

      <div className="card p-8 space-y-5 animate-slide-up" style={{ animationDelay: "80ms" }}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--text)]">Content</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("qr.placeholder")}
            className="input text-base"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text)]">
              <Palette className="w-3.5 h-3.5 text-[var(--muted)]" />
              {t("qr.foreground")}
            </label>
            <div className="flex items-center gap-3">
              <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-12 h-12" />
              <span className="text-xs font-mono text-[var(--muted)]">{fg}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text)]">
              <Palette className="w-3.5 h-3.5 text-[var(--muted)]" />
              {t("qr.background")}
            </label>
            <div className="flex items-center gap-3">
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-12 h-12" />
              <span className="text-xs font-mono text-[var(--muted)]">{bg}</span>
            </div>
          </div>
        </div>

        <button onClick={generate} className="btn-primary" disabled={!text}>
          {t("qr.generate")}
        </button>
      </div>

      {qrUrl && (
        <div className="card p-8 flex flex-col items-center gap-6 animate-scale-in">
          <div className="p-4 bg-white rounded-2xl shadow-md">
            <img src={qrUrl} alt="QR Code" className="rounded-lg" width={280} height={280} />
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <button onClick={download} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            {t("qr.download")}
          </button>
        </div>
      )}
    </div>
  );
}
