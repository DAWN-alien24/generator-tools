"use client";
import { useState } from "react";
import { useLang } from "@/i18n/context";
import { Copy, RefreshCw } from "lucide-react";

const FIRST_M = ["James","John","Robert","Michael","David","William","Richard","Joseph","Thomas","Christopher","Daniel","Matthew","Anthony","Mark","Steven","Andrew","Joshua","Kevin","Brian","Ryan","Chen","Wei","Ahmed","Carlos","Hiroshi","Min","Sergio","Omar","Liam","Noah"];
const FIRST_F = ["Mary","Patricia","Jennifer","Linda","Barbara","Elizabeth","Susan","Jessica","Sarah","Karen","Lisa","Nancy","Betty","Margaret","Sandra","Ashley","Emily","Donna","Michelle","Carol","Mei","Yuki","Sofia","Fatima","Priya","Ana","Nina","Lea","Zara","Iris"];
const LAST = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Chen","Wang","Li","Zhang","Liu","Kim","Park","Patel","Singh","Kumar","Tanaka","Sato","Suzuki","Muller","Schmidt","Schneider","Fischer","Weber","Wagner","Becker","Nguyen","Tran","Lee","Wu","Lin","Yang","Huang","Zhou","Zhu","Wang","Ali","Hassan","Ahmed","Mohammed","Silva","Santos","Oliveira","Costa","Fernandez","Lopez","Gonzalez"];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export default function NamePage() {
  const { t } = useLang();
  const [count, setCount] = useState(10);
  const [gender, setGender] = useState<"any"|"male"|"female">("any");
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const first = gender === "male" ? pick(FIRST_M) : gender === "female" ? pick(FIRST_F) : pick([...FIRST_M, ...FIRST_F]);
      result.push(`${first} ${pick(LAST)}`);
    }
    setNames(result);
    setCopied(false);
  };

  const copyAll = () => { navigator.clipboard.writeText(names.join("\n")); setCopied(true); };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">{t("name.title")}</h1>
      <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-[var(--muted)]">{t("name.count")}</label>
            <input type="number" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 outline-none focus:border-[var(--accent)] text-[var(--text)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[var(--muted)]">{t("name.gender")}</label>
            <div className="flex gap-2">
              {(["any","male","female"] as const).map(g => (
                <button key={g} onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${gender===g?"bg-[var(--accent)] text-white border-[var(--accent)]":"border-[var(--border)] text-[var(--muted)]"}`}>
                  {t(`name.${g}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={generate} className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-bold hover:opacity-90 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4" />{t("name.generate")}
        </button>
      </div>
      {names.length > 0 && (
        <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--muted)]">{names.length} names</span>
            <button onClick={copyAll} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--muted)] hover:border-[var(--accent)] transition-colors">
              {copied ? "✓" : <Copy className="w-3 h-3" />}{t("name.copy")}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {names.map((n, i) => <div key={i} className="bg-[var(--bg)] rounded-lg px-3 py-2 text-sm">{n}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
