"use client";
import { useState } from "react";
import { useLang } from "@/i18n/context";
import { Copy, RefreshCw, Check, Users } from "lucide-react";

const FIRST_M = ["James","John","Robert","Michael","David","William","Richard","Joseph","Thomas","Christopher","Daniel","Matthew","Anthony","Mark","Steven","Andrew","Joshua","Kevin","Brian","Ryan","Chen","Wei","Ahmed","Carlos","Hiroshi","Min","Sergio","Omar","Liam","Noah","Ethan","Lucas","Mason","Logan"];
const FIRST_F = ["Mary","Patricia","Jennifer","Linda","Barbara","Elizabeth","Susan","Jessica","Sarah","Karen","Lisa","Nancy","Emily","Donna","Michelle","Carol","Mei","Yuki","Sofia","Fatima","Priya","Ana","Nina","Lea","Zara","Iris","Olivia","Emma","Ava","Sophia","Isabella","Mia","Charlotte","Amelia"];
const LAST = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Chen","Wang","Li","Zhang","Liu","Kim","Park","Patel","Singh","Kumar","Tanaka","Sato","Muller","Schmidt","Nguyen","Lee","Wu","Lin","Yang","Huang","Silva","Santos","Fernandez","Lopez","Ali","Hassan","Mohammed","Costa","Oliveira","Suzuki"];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export default function NamePage() {
  const { t } = useLang();
  const [count, setCount] = useState(10);
  const [gender, setGender] = useState<"any" | "male" | "female">("any");
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

  const copyAll = () => {
    navigator.clipboard.writeText(names.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const genders: { key: "any" | "male" | "female"; icon: string }[] = [
    { key: "any", icon: "👤" },
    { key: "male", icon: "♂" },
    { key: "female", icon: "♀" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-extrabold tracking-tight gradient-text inline-block">{t("name.title")}</h1>
      </div>

      <div className="card p-8 space-y-5 animate-slide-up" style={{ animationDelay: "80ms" }}>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[var(--text)]">{t("name.count")}</label>
            <input
              type="number" min={1} max={100} value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="input"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[var(--text)]">{t("name.gender")}</label>
            <div className="flex gap-2">
              {genders.map((g) => (
                <button
                  key={g.key}
                  onClick={() => setGender(g.key)}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold border-1.5 transition-all duration-200 ${
                    gender === g.key
                      ? "border-[var(--accent)] bg-[var(--accent-bg)] text-[var(--accent)]"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)]"
                  }`}
                >
                  {g.icon} {t(`name.${g.key}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={generate} className="btn-primary flex items-center justify-center gap-2.5">
          <RefreshCw className="w-4 h-4" />
          {t("name.generate")}
        </button>
      </div>

      {names.length > 0 && (
        <div className="card p-8 space-y-5 animate-scale-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <Users className="w-4 h-4" />
              {names.length} names
            </div>
            <button
              onClick={copyAll}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                copied
                  ? "bg-[var(--green)] text-white"
                  : "btn-secondary"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {t("name.copy")}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {names.map((n, i) => (
              <div
                key={i}
                className="bg-[var(--bg-subtle)] rounded-xl px-4 py-3 text-sm font-medium text-[var(--text)] border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-200"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
