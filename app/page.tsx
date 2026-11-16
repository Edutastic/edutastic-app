import Link from "next/link";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import Stars from "../components/ui/Stars";
import Mascot from "../components/ui/Mascot";
import Decor from "../components/ui/Decor";
import SectionHeading from "../components/ui/SectionHeading";
import { ActiveChildCard, ActiveChildName } from "../components/Shared/ActiveChildIdentity";
import { learner, subjects, recentActivities } from "../lib/sampleData";

export default function Home() {
  const xpPct = Math.round((learner.xp / learner.xpNext) * 100);
  const comingSoon = subjects.filter((s) => !s.active);

  return (
    <main className="ed-container ed-page space-y-8">
      {/* Welcome hero */}
      <section className="ed-hero ed-pop px-6 py-8 sm:px-10 sm:py-10">
        <Decor />
        <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <span className="ed-chip">👋 Welcome back</span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Hi <ActiveChildName fallback={learner.name} />! <br />
              Ready to <span className="text-sun-400">play &amp; learn?</span>
            </h1>
            <p className="max-w-lg text-lg text-white/85">
              Jump into today&apos;s adventure, collect stars and keep your fire streak burning!
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="ed-chip">🔥 {learner.streak} day streak</span>
              <span className="ed-chip">⭐ {learner.stars} stars</span>
              <span className="ed-chip">⚡ {learner.xp.toLocaleString()} XP</span>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button href="/game" variant="sun" size="lg">▶ Continue playing</Button>
              <Button href="/subjects" variant="white" size="lg">Pick a subject</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Mascot size={230} className="ed-float drop-shadow-xl" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Mathematics section */}
          <section>
            <SectionHeading eyebrow="Your adventure" title="Mathematics" actionLabel="Open" actionHref="/subjects/math" />
            <Link href="/subjects/math" className="ed-tint ed-tint-bolt ed-card-hover relative block overflow-hidden p-6 no-underline">
              <div className="flex items-center gap-5">
                <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-white text-6xl shadow-[0_6px_0_rgba(38,16,106,0.15)] ed-wiggle">🔢</div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-semibold">Numbers &amp; Fun</h3>
                  <p className="text-grape-800/80">Level 4 is waiting for you!</p>
                  <ProgressBar value={38} label="Mathematics progress" />
                  <p className="text-sm font-bold text-grape-800/70">38% of the journey</p>
                </div>
              </div>
              <span aria-hidden="true" className="absolute -right-3 -top-3 text-7xl opacity-20">➕</span>
            </Link>
          </section>

          {/* Daily challenge */}
          <section>
            <div className="ed-tint ed-tint-sun relative overflow-hidden p-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-white text-5xl shadow-[0_5px_0_rgba(38,16,106,0.15)] ed-float">🎁</div>
                <div className="flex-1">
                  <span className="ed-chip ed-chip-coral">⏳ Daily challenge</span>
                  <h3 className="mt-1 text-2xl font-semibold">Today&apos;s surprise challenge</h3>
                  <p className="text-grape-900/75">Finish it to earn bonus stars. (Placeholder challenge)</p>
                </div>
                <Button href="/game" variant="coral">Play now</Button>
              </div>
            </div>
          </section>

          {/* Recently played */}
          <section>
            <SectionHeading title="Recently played" />
            <div className="grid gap-4 sm:grid-cols-3">
              {recentActivities.map((a) => (
                <Link key={a.title} href="/game" className="ed-card ed-card-hover block p-4 text-center no-underline">
                  <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-grape-100 text-4xl">{a.emoji}</div>
                  <p className="font-display text-lg font-semibold leading-tight">{a.title}</p>
                  <p className="mb-2 text-sm text-ink-soft">{a.when}</p>
                  <Stars count={a.stars} />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <aside className="space-y-6">
          <section className="ed-card p-5">
            <h2 className="mb-3 text-2xl font-semibold">My progress</h2>
            <ActiveChildCard
              fallbackName={learner.name}
              fallbackAvatar={learner.avatar}
              fallbackAgeGroup={learner.ageGroup}
              rank={learner.rank}
            />
            <div className="mt-4 space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-sm font-bold">
                  <span>⚡ XP</span>
                  <span>{learner.xp} / {learner.xpNext}</span>
                </div>
                <ProgressBar value={xpPct} tone="grape" label="XP progress" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm font-bold">
                  <span>⭐ Stars</span>
                  <span>{learner.stars}</span>
                </div>
                <ProgressBar value={64} tone="sun" label="Star collection" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm font-bold">
                  <span>🔥 Streak</span>
                  <span>{learner.streak} days</span>
                </div>
                <ProgressBar value={70} tone="coral" label="Streak" />
              </div>
            </div>
            <div className="mt-4">
              <Button href="/progress" variant="ghost" size="sm" className="w-full">See all stats</Button>
            </div>
          </section>

          <section className="ed-tint ed-tint-grape p-5">
            <div className="flex items-center gap-4">
              <Mascot size={72} />
              <div>
                <h3 className="text-xl font-semibold">Meet your AI Teacher</h3>
                <p className="text-sm text-grape-900/75">Coming soon: a friendly helper just for you.</p>
              </div>
            </div>
            <Button href="/teacher" variant="primary" size="sm" className="mt-4">Say hello 👋</Button>
          </section>
        </aside>
      </div>

      {/* More subjects */}
      <section>
        <SectionHeading eyebrow="More fun ahead" title="New worlds coming soon" actionLabel="All subjects" actionHref="/subjects" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {comingSoon.map((s) => (
            <div key={s.slug} className={`ed-tint ed-tint-${s.tint} relative p-5 text-center`}>
              <div className="text-5xl opacity-90">{s.emoji}</div>
              <p className="mt-2 font-display text-lg font-semibold leading-tight">{s.name}</p>
              <span className="ed-chip ed-chip-solid mt-2 !text-grape-900">🔒 Soon</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
