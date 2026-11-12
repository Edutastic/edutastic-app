import Stars from "../../components/ui/Stars";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import SectionHeading from "../../components/ui/SectionHeading";
import { learner, weekly, skills, stages, badges } from "../../lib/sampleData";

export const metadata = { title: "Progress – Edutastic" };

/* Progress dashboard – every number here is sample data. */
export default function ProgressPage() {
  const max = Math.max(...weekly.map((w) => w.minutes), 1);
  const totalMin = weekly.reduce((a, w) => a + w.minutes, 0);
  const done = stages.flatMap((s) => s.nodes).filter((n) => n.state === "done");
  const unlocked = badges.filter((b) => b.unlocked).length;

  // Donut (38%)
  const pct = 38;
  const r = 54;
  const c = 2 * Math.PI * r;

  return (
    <main className="ed-container ed-page space-y-8">
      <section className="ed-hero px-6 py-8 sm:px-10">
        <span className="ed-chip">📈 Progress</span>
        <span className="ed-chip ed-chip-sun ml-2">🧪 Sample data</span>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{learner.name}&apos;s progress</h1>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["⭐", learner.stars, "Stars"],
            ["⚡", learner.xp.toLocaleString(), "XP"],
            ["🔥", learner.streak, "Day streak"],
            ["✅", done.length, "Levels done"],
          ].map(([e, v, l]) => (
            <div key={l as string} className="rounded-2xl bg-white/15 p-4 text-center">
              <div className="text-3xl">{e}</div>
              <p className="font-display text-3xl font-bold">{v}</p>
              <p className="text-sm font-semibold text-white/80">{l}</p>
            </div>
          ))}
        </div>
      </section>



      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly activity */}
        <section className="ed-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">This week <span className="ed-chip ed-chip-sun ml-1 align-middle !text-xs">Sample</span></h2>
            <span className="ed-chip ed-chip-bolt">{totalMin} min played</span>
          </div>
          <div className="flex h-56 items-end justify-between gap-2 sm:gap-4" role="img" aria-label="Weekly activity bar chart (sample data)">
            {weekly.map((w, i) => {
              const colors = ["#7b4dff", "#2f8bff", "#ff5fa2", "#ffc83d", "#2fd6a0", "#ff6b6b", "#9a73ff"];
              return (
                <div key={w.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="text-xs font-bold text-ink-soft">{w.minutes || "–"}</span>
                  <div
                    className="w-full max-w-[56px] rounded-t-2xl transition-all hover:brightness-110"
                    style={{ height: `${Math.max((w.minutes / max) * 100, 4)}%`, background: colors[i], boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.12)" }}
                  />
                  <span className="font-display text-sm font-semibold">{w.day}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Donut */}
        <section className="ed-card flex flex-col items-center p-6 text-center">
          <h2 className="mb-2 text-2xl font-semibold">Mathematics</h2>
          <div className="relative h-40 w-40">
            <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90" role="img" aria-label={`${pct}% complete`}>
              <circle cx="70" cy="70" r={r} fill="none" stroke="var(--line)" strokeWidth="16" />
              <circle cx="70" cy="70" r={r} fill="none" stroke="#7b4dff" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${(pct / 100) * c} ${c}`} />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <p className="font-display text-4xl font-bold">{pct}%</p>
            </div>
          </div>
          <p className="mt-2 text-sm font-semibold text-ink-soft">of the journey completed</p>
          <span className="ed-chip ed-chip-sun mt-2 !text-xs">Sample data</span>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skill points */}
        <section className="ed-card p-6">
          <SectionHeading title="Skill points (sample)" />
          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex justify-between font-display font-semibold">
                  <span>{s.name}</span>
                  <span>{s.value} / 20</span>
                </div>
                <ProgressBar value={(s.value / 20) * 100} tone={s.tint} label={s.name} />
              </div>
            ))}
          </div>
        </section>

        {/* Completed levels */}
        <section className="ed-card p-6">
          <SectionHeading title="Completed levels (sample)" />
          <ul className="space-y-3">
            {done.map((l) => (
              <li key={l.n} className="flex items-center justify-between rounded-2xl bg-surface-2 px-4 py-2">
                <span className="flex items-center gap-3 font-display text-lg font-semibold">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-mint-400 text-[#064d38]">{l.n}</span>
                  Level {l.n}
                </span>
                <Stars count={l.stars} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Achievement summary */}
      <section className="ed-tint ed-tint-sun flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <span className="text-6xl ed-wiggle">🎖️</span>
          <div>
            <h2 className="text-2xl font-semibold">Achievement summary</h2>
            <p className="text-grape-900/75">{unlocked} of {badges.length} badges unlocked (sample data).</p>
          </div>
        </div>
        <Button href="/rewards" variant="coral">View rewards</Button>
      </section>
    </main>
  );
}
