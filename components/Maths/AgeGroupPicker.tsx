"use client";

import Link from "next/link";
import { useState } from "react";
import { ageGroups } from "../../lib/sampleData";

export default function AgeGroupPicker() {
  const [selected, setSelected] = useState("4-5");
  return (
    <div role="radiogroup" aria-label="Choose an age group" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {ageGroups.map((g) => {
        const on = selected === g.value;
        const content = <><div className="text-5xl">{g.emoji}</div><p className="mt-1 font-display text-xl font-semibold">{g.label}</p><p className={"text-sm " + (on ? "text-grape-800" : "text-ink-soft")}>{g.blurb}</p>{on && <span className="ed-chip ed-chip-mint mt-2">✓ Selected</span>}</>;
        const className = "rounded-3xl border-[3px] p-5 text-center transition-all hover:-translate-y-1 " + (on ? "border-grape-600 bg-grape-100 text-grape-900 shadow-[0_6px_0_#6234e0]" : "border-line bg-surface shadow-[0_6px_0_var(--line)]");
        return g.value === "4-5" ? <Link key={g.value} href="/subjects/math/4-5" role="radio" aria-checked={on} className={className}>{content}</Link> : <button key={g.value} type="button" role="radio" aria-checked={on} onClick={() => setSelected(g.value)} className={className}>{content}</button>;
      })}
    </div>
  );
}
