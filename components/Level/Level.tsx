"use client";

import { useState } from "react";
import Link from "next/link";
import ProgressBar from "../ui/ProgressBar";
import Button from "../ui/Button";
import Mascot from "../ui/Mascot";

/*
  Game interface TEMPLATE (visual only).
  A future mini-game plugs its own content into the "activity area" and
  supplies real data through props. Nothing here is a real question or score.
*/

type Feedback = "idle" | "correct" | "retry";

type Props = {
  title?: string;
  step?: number;
  totalSteps?: number;
  options?: string[];
  exitHref?: string;
};

export default function Level({
  title = "Game Title Placeholder",
  step = 3,
  totalSteps = 10,
  options = ["Answer A", "Answer B", "Answer C", "Answer D"],
  exitHref = "/subjects/math/levels",
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <main className="ed-container flex min-h-screen max-w-3xl flex-col gap-5 py-5">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <Link
          href={exitHref}
          aria-label="Exit game"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface font-display text-2xl font-bold text-ink-soft shadow-[0_4px_0_var(--line)] border-2 border-line hover:-translate-y-0.5 transition-transform"
        >
          ✕
        </Link>
        <div className="flex-1">
          <ProgressBar value={(step / totalSteps) * 100} label="Level progress" />
        </div>
        <span className="ed-chip ed-chip-sun">⭐ {step}/{totalSteps}</span>
      </div>

      <div className="text-center">
        <span className="ed-chip ed-chip-solid">🎮 Design preview</span>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
      </div>

      {/* Activity area */}
      <section className="ed-card flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center" aria-label="Activity area">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-bubble-500">Question {step}</p>
        <p className="font-display text-3xl font-semibold sm:text-4xl">Your question goes here</p>
        <div className="grid h-40 w-full max-w-md place-items-center rounded-3xl border-[3px] border-dashed border-grape-200 bg-grape-50 text-5xl text-grape-400 sm:h-52">
          <div>
            <div className="text-6xl">🎨</div>
            <p className="mt-1 font-display text-lg">Activity / illustration area</p>
          </div>
        </div>
      </section>

      {/* Answer options */}
      <section aria-label="Answer options" className="grid grid-cols-2 gap-4">
        {options.map((o, i) => (
          <button
            key={o}
            type="button"
            className="ed-option"
            aria-pressed={selected === i}
            onClick={() => {
              setSelected(i);
              setFeedback("idle");
            }}
          >
            {o}
          </button>
        ))}
      </section>

      {/* Feedback area */}
      <div aria-live="polite" className="min-h-[92px]">
        {feedback === "correct" && (
          <div className="ed-pop flex items-center gap-4 rounded-3xl bg-mint-100 p-4 text-[#064d38] border-2 border-mint-400">
            <Mascot size={64} />
            <div>
              <p className="font-display text-2xl font-semibold">Great job! 🎉</p>
              <p className="text-sm font-semibold">Positive feedback appears here. (Preview)</p>
            </div>
          </div>
        )}
        {feedback === "retry" && (
          <div className="ed-pop flex items-center gap-4 rounded-3xl bg-coral-100 p-4 text-[#7a1f1f] border-2 border-coral-500/40">
            <Mascot size={64} />
            <div>
              <p className="font-display text-2xl font-semibold">Nearly there! 💪</p>
              <p className="text-sm font-semibold">Encouraging feedback for a try-again moment. (Preview)</p>
            </div>
          </div>
        )}
        {hintOpen && feedback === "idle" && (
          <div className="ed-pop rounded-3xl border-2 border-sun-400 bg-sun-100 p-4 text-[#4a3200]">
            <p className="font-display text-lg font-semibold">💡 Hint placeholder</p>
            <p className="text-sm font-semibold">The AI Teacher will help here in a future version.</p>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="sun" onClick={() => setHintOpen((v) => !v)}>
          💡 Hint <span className="ed-chip ed-chip-solid !py-0.5 !text-xs">3 left</span>
        </Button>
        <Button
          variant="mint"
          size="lg"
          disabled={selected === null}
          onClick={() => setFeedback("correct")}
        >
          Check ✓
        </Button>
      </div>

      {/* Design-preview switcher (remove when real games exist) */}
      <div className="mx-auto flex items-center gap-2 text-sm font-bold text-ink-soft">
        Preview feedback:
        {(["idle", "correct", "retry"] as Feedback[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFeedback(f)}
            className={`rounded-full px-3 py-1 ${feedback === f ? "bg-grape-600 text-white" : "bg-surface-2"}`}
          >
            {f === "idle" ? "None" : f === "correct" ? "Correct" : "Try again"}
          </button>
        ))}
      </div>
    </main>
  );
}
