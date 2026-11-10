import Button from "../../../../components/ui/Button";
import ProgressBar from "../../../../components/ui/ProgressBar";
import LevelPath from "../../../../components/Maths/LevelPath";
import { stages } from "../../../../lib/sampleData";

/* Level selection layout – visual example only, not real learning levels. */
export default function MathLevelsPage() {
  return (
    <main className="ed-container ed-page space-y-8">
      <section className="ed-hero ed-hero-math flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <span className="ed-chip">🗺️ Mathematics</span>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Your learning journey</h1>
          <div className="mt-3 max-w-sm">
            <ProgressBar value={38} label="Journey progress" />
            <p className="mt-1 text-sm text-white/85">Level 4 of 11 · sample progress</p>
          </div>
        </div>
        <Button href="/subjects/math" variant="white">← Back to Mathematics</Button>
      </section>

      <ul className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold" aria-label="Legend">
        <li className="ed-chip ed-chip-mint">✓ Completed</li>
        <li className="ed-chip ed-chip-coral">● Current</li>
        <li className="ed-chip ed-chip-sun">★ Available</li>
        <li className="ed-chip ed-chip-solid">🔒 Locked</li>
      </ul>

      <div className="mx-auto max-w-xl space-y-10">
        {stages.map((s) => (
          <LevelPath key={s.title} {...s} />
        ))}
        <div className="ed-card p-6 text-center">
          <div className="text-5xl">🏰</div>
          <p className="mt-1 font-display text-xl font-semibold">More stages coming soon!</p>
        </div>
      </div>
    </main>
  );
}
