import Link from "next/link";
import type { Tint } from "../../lib/sampleData";

type Props = { step: string; emoji: string; tint: Tint; nextSlug?: string };

export default function LessonStepPage({ step, emoji, tint, nextSlug }: Props) {
  const base = "/subjects/math/4-5/number-forest";
  return (
    <main className="ed-container ed-page space-y-8">
      <Link href={base} className="ed-chip ed-chip-solid no-underline">← Number Forest</Link>
      <section className={"ed-tint ed-tint-" + tint + " p-6 sm:p-10"}>
        <div className="text-7xl">{emoji}</div>
        <p className="mt-5 font-display text-sm font-semibold uppercase tracking-widest opacity-70">Number Forest · Lesson 1</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{step}</h1>
        <p className="mt-4 max-w-2xl text-lg text-grape-900/75">This is a friendly placeholder for the {step.toLowerCase()} experience. The learning interaction and curriculum content will be added next.</p>
      </section>
      <section className="ed-card p-6 sm:p-8">
        <div className="flex min-h-52 flex-col items-center justify-center text-center"><span className="text-6xl">✨</span><h2 className="mt-4 text-2xl font-semibold">Coming together soon</h2><p className="mt-2 max-w-lg text-ink-soft">You can already navigate the lesson flow. This space is ready for the {step.toLowerCase()} content.</p></div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {nextSlug ? <Link href={base + "/" + nextSlug} className="ed-btn ed-btn-lg ed-btn-mint">Continue →</Link> : <Link href={base} className="ed-btn ed-btn-lg ed-btn-sun">Back to lesson</Link>}
        </div>
      </section>
    </main>
  );
}
