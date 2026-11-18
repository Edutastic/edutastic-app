import Link from "next/link";
import Decor from "../../../../../components/ui/Decor";

const steps = [
  { slug: "tutorial", number: "01", emoji: "📖", title: "Tutorial", description: "Meet the forest and learn the idea together.", tint: "bolt" },
  { slug: "guided-interaction", number: "02", emoji: "🧭", title: "Guided interaction", description: "Try a few examples with friendly prompts.", tint: "mint" },
  { slug: "exercise", number: "03", emoji: "🧩", title: "Exercise", description: "Practise counting and matching at your own pace.", tint: "sun" },
  { slug: "test", number: "04", emoji: "🏆", title: "Test", description: "Show what you know and celebrate your stars.", tint: "coral" },
] as const;

export default function NumberForestPage() {
  return (
    <main className="ed-container ed-page space-y-8">
      <section className="ed-hero px-6 py-10 sm:px-10">
        <Decor symbols={["🌳", "🍎", "🦊", "🔢", "⭐", "🌿"]} />
        <Link href="/subjects/math/4-5" className="ed-chip no-underline">← Ages 4–5</Link>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <div className="grid h-24 w-24 place-items-center rounded-3xl bg-white/20 text-6xl">🌳</div>
          <div>
            <span className="ed-chip ed-chip-mint">Lesson 1</span>
            <h1 className="mt-2 text-4xl font-bold sm:text-6xl">Number Forest</h1>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-lg text-white/90">A playful first adventure in counting, recognising numbers and matching groups of objects.</p>
      </section>
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="font-display text-sm font-semibold uppercase tracking-widest text-ink-soft">Your adventure</p><h2 className="mt-1 text-3xl font-semibold">Four steps to complete</h2></div>
          <span className="ed-chip ed-chip-solid">0 / 4 complete</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {steps.map((step) => (
            <Link key={step.slug} href={"/subjects/math/4-5/number-forest/" + step.slug} className={"ed-tint ed-tint-" + step.tint + " ed-card-hover block p-6 no-underline"}>
              <div className="flex items-start justify-between"><span className="font-display text-2xl font-bold opacity-60">{step.number}</span><span className="text-5xl">{step.emoji}</span></div>
              <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3><p className="mt-2 text-grape-900/75">{step.description}</p><p className="mt-5 font-display font-semibold">Start step →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
