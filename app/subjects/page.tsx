import Link from "next/link";
import ProgressBar from "../../components/ui/ProgressBar";
import Decor from "../../components/ui/Decor";
import { subjects } from "../../lib/sampleData";

/*
  Subject selection ("Learn") page.
  For the MVP only Mathematics is playable; the other subjects are visual
  "coming soon" placeholders.
*/
export default function SubjectsPage() {
  return (
    <main className="ed-container ed-page space-y-8">
      <section className="ed-hero px-6 py-8 sm:px-10">
        <Decor symbols={["🔢", "🔬", "🌍", "🧩", "💡", "⭐"]} />
        <span className="ed-chip">🎮 Choose your adventure</span>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">What shall we learn today?</h1>
        <p className="mt-2 max-w-xl text-lg text-white/85">Pick a subject to start your journey. More worlds are on their way!</p>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) =>
          s.active ? (
            <Link
              key={s.slug}
              href={`/subjects/${s.slug}`}
              className={`ed-tint ed-tint-${s.tint} ed-card-hover block p-6 no-underline sm:col-span-2 lg:col-span-1 lg:row-span-1`}
            >
              <span className="ed-chip ed-chip-mint">✅ Available now</span>
              <div className="mt-3 text-7xl ed-wiggle inline-block">{s.emoji}</div>
              <h2 className="mt-2 text-3xl font-semibold">{s.name}</h2>
              <p className="mb-3 text-grape-900/75">Games, puzzles and quizzes.</p>
              <ProgressBar value={s.progress} label={`${s.name} progress`} />
              <p className="mt-3 font-display text-lg font-semibold">Let&apos;s go! →</p>
            </Link>
          ) : (
            <div key={s.slug} className="ed-card relative overflow-hidden p-6 opacity-95">
              <span className="ed-chip ed-chip-solid">🔒 Coming soon</span>
              <div className="mt-3 text-6xl grayscale-[0.35]">{s.emoji}</div>
              <h2 className="mt-2 text-2xl font-semibold">{s.name}</h2>
              <p className="text-ink-soft">A brand-new world to explore.</p>
            </div>
          ),
        )}
      </div>
    </main>
  );
}
