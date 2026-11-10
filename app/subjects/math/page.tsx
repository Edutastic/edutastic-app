import Link from "next/link";
import Button from "../../../components/ui/Button";
import ProgressBar from "../../../components/ui/ProgressBar";
import Decor from "../../../components/ui/Decor";
import SectionHeading from "../../../components/ui/SectionHeading";
import AgeGroupPicker from "../../../components/Maths/AgeGroupPicker";
import { mathTopics } from "../../../lib/sampleData";

const diffChip: Record<string, string> = {
  Easy: "ed-chip-mint",
  Medium: "ed-chip-sun",
  Tricky: "ed-chip-coral",
};

/* Mathematics landing page. All topic names / progress values are placeholders. */
export default function MathPage() {
  return (
    <main className="ed-container ed-page space-y-10">
      <section className="ed-hero ed-hero-math px-6 py-10 sm:px-10">
        <Decor symbols={["➕", "➖", "✖️", "➗", "π", "🔷"]} />
        <div className="grid items-center gap-6 md:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <span className="ed-chip">🔢 Subject</span>
            <h1 className="text-4xl font-bold sm:text-6xl">
              Math <span className="text-sun-400">Adventure!</span>
            </h1>
            <p className="max-w-lg text-lg text-white/90">
              Play, puzzle and power up your number skills. Every level earns you shiny stars!
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/subjects/math/levels" variant="sun" size="lg">🗺️ Start the journey</Button>
              <Button href="/game" variant="white" size="lg">👀 Preview a game</Button>
            </div>
          </div>
          <div className="hidden justify-center md:flex" aria-hidden="true">
            <div className="grid grid-cols-2 gap-4 text-6xl">
              <span className="ed-float grid h-24 w-24 place-items-center rounded-3xl bg-white/20">➕</span>
              <span className="ed-float-slow grid h-24 w-24 place-items-center rounded-3xl bg-white/20">✖️</span>
              <span className="ed-float-slow grid h-24 w-24 place-items-center rounded-3xl bg-white/20">➗</span>
              <span className="ed-float grid h-24 w-24 place-items-center rounded-3xl bg-white/20">➖</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Step 1" title="Choose your age group" />
        <AgeGroupPicker />
      </section>

      <section>
        <SectionHeading eyebrow="Step 2" title="Pick a topic" actionLabel="Level path" actionHref="/subjects/math/levels" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mathTopics.map((t) => (
            <Link
              key={t.name}
              href="/subjects/math/levels"
              className={`ed-tint ed-tint-${t.tint} ed-card-hover block p-5 no-underline`}
            >
              <div className="flex items-start justify-between">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-4xl shadow-[0_4px_0_rgba(38,16,106,0.14)]">{t.emoji}</div>
                <span className={`ed-chip ${diffChip[t.difficulty]}`}>{t.difficulty}</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold">{t.name}</h3>
              <p className="mb-3 text-sm text-grape-900/70">Placeholder topic description.</p>
              <ProgressBar value={t.progress} label={`${t.name} progress`} />
              <p className="mt-1 text-sm font-bold text-grape-900/70">{t.progress}% complete</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
