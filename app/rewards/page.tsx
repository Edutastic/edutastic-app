import ProgressBar from "../../components/ui/ProgressBar";
import Decor from "../../components/ui/Decor";
import SectionHeading from "../../components/ui/SectionHeading";
import { learner, badges, trophies, achievements } from "../../lib/sampleData";

export const metadata = { title: "Rewards – Edutastic" };

/* Rewards & achievements – design placeholders, no real achievement system. */
export default function RewardsPage() {
  const xpPct = Math.round((learner.xp / learner.xpNext) * 100);

  return (
    <main className="ed-container ed-page space-y-10">
      <section className="ed-hero px-6 py-8 sm:px-10">
        <Decor symbols={["⭐", "🏆", "✨", "🎖️", "🌟", "💎"]} />
        <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3">
            <span className="ed-chip">🏆 Rewards</span>
            <h1 className="text-4xl font-bold sm:text-5xl">Your treasure chest</h1>
            <p className="max-w-md text-white/85">All the shiny things you&apos;ve collected on your learning adventure.</p>
            <div className="max-w-md rounded-2xl bg-white/15 p-4">
              <div className="mb-1 flex justify-between font-display font-semibold">
                <span>⚡ {learner.rank}</span>
                <span>{learner.xp} / {learner.xpNext} XP</span>
              </div>
              <ProgressBar value={xpPct} tone="sun" label="XP to next rank" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="grid h-44 w-44 place-items-center rounded-full bg-white/15 text-center ed-float">
              <div>
                <div className="text-6xl">⭐</div>
                <p className="font-display text-4xl font-bold">{learner.stars}</p>
                <p className="text-sm font-semibold text-white/80">stars</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Collection" title="Badges" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {badges.map((b) => (
            <div
              key={b.name}
              className={`${b.unlocked ? "ed-tint ed-tint-sun ed-card-hover" : "ed-card"} p-4 text-center`}
            >
              <div
                className={`mx-auto grid h-20 w-20 place-items-center rounded-full text-5xl ${
                  b.unlocked ? "bg-white shadow-[0_5px_0_rgba(38,16,106,0.15)] ed-wiggle" : "bg-surface-2 grayscale opacity-60"
                }`}
              >
                {b.unlocked ? b.emoji : "🔒"}
              </div>
              <p className="mt-2 font-display text-lg font-semibold leading-tight">{b.name}</p>
              <p className={`text-xs font-bold ${b.unlocked ? "text-mint-600" : "text-ink-soft"}`}>
                {b.unlocked ? "Unlocked!" : "Locked"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Shelf" title="Trophies" />
        <div className="ed-card grid grid-cols-3 items-end gap-3 p-6 text-center">
          {trophies.map((t, i) => (
            <div key={t.name} className="flex flex-col items-center">
              <div className={`text-6xl sm:text-8xl ${t.unlocked ? "ed-float" : "grayscale opacity-40"}`} style={{ animationDelay: `${i * 0.4}s` }}>
                {t.emoji}
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-grape-200" />
              <p className="mt-1 font-display font-semibold">{t.name}</p>
              <p className="text-xs font-bold text-ink-soft">{t.unlocked ? "Won!" : "Keep playing"}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Goals" title="Achievements" />
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((a) => (
            <div key={a.title} className={`ed-tint ed-tint-${a.tint} p-5`}>
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl">{a.emoji}</div>
                {a.progress === 100 && <span className="ed-chip ed-chip-mint">✓ Done</span>}
              </div>
              <h3 className="mt-3 text-xl font-semibold leading-tight">{a.title}</h3>
              <p className="mb-3 text-sm text-grape-900/70">{a.desc}</p>
              <ProgressBar value={a.progress} label={a.title} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
