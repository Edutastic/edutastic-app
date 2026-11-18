import Link from "next/link";
import ProgressBar from "../../../../components/ui/ProgressBar";
import Decor from "../../../../components/ui/Decor";

export default function MathAgeGroupPage() {
  return (
    <main className="ed-container ed-page space-y-8">
      <section className="ed-hero ed-hero-math px-6 py-10 sm:px-10">
        <Decor symbols={["🌳", "🍎", "🐿️", "🔢", "⭐", "🌿"]} />
        <span className="ed-chip">🐣 Ages 4–5</span>
        <h1 className="mt-3 text-4xl font-bold sm:text-6xl">Welcome to the Enchanted Kingdom!</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/90">Follow the path, meet friendly characters and build your first number skills through play.</p>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Link href="/subjects/math/4-5/number-forest" className="ed-tint ed-tint-coral ed-card-hover block p-6 no-underline">
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white text-5xl shadow-[0_4px_0_rgba(38,16,106,0.14)]">🌳</div>
            <span className="ed-chip ed-chip-mint">First lesson</span>
          </div>
          <h2 className="mt-5 text-3xl font-semibold">Number Forest</h2>
          <p className="mt-2 max-w-xl text-lg text-grape-900/75">Count, spot and explore numbers with the animals of the forest.</p>
          <ProgressBar value={0} label="Number Forest progress" className="mt-5" />
          <p className="mt-4 font-display text-lg font-semibold">Enter the forest →</p>
        </Link>
        <aside className="ed-card p-6">
          <p className="ed-chip ed-chip-solid">Your learning path</p>
          <h2 className="mt-4 text-2xl font-semibold">One little step at a time</h2>
          <p className="mt-2 text-ink-soft">More lessons will unlock here as the curriculum grows.</p>
          <div className="mt-6 space-y-3 text-lg">
            <p>🌱 Number Forest <span className="text-sm text-ink-soft">· Ready</span></p>
            <p className="text-ink-soft">🔒 Pattern Bridge <span className="text-sm">· Coming soon</span></p>
            <p className="text-ink-soft">🔒 Shape Castle <span className="text-sm">· Coming soon</span></p>
          </div>
        </aside>
      </section>
    </main>
  );
}
