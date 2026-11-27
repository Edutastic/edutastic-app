import Link from "next/link";
import { notFound } from "next/navigation";
import Decor from "../../../../../components/ui/Decor";
import type { Tint } from "../../../../../lib/sampleData";
import { curriculum } from "../../../../../lib/curriculum/data";
import { STAGE_ORDER, type StageSlug } from "../../../../../lib/curriculum/types";
import { stagePath } from "../../../../../lib/curriculum/paths";

const stageTints: Record<StageSlug, Tint> = {
  tutorial: "bolt",
  "guided-interaction": "mint",
  exercise: "sun",
  test: "coral",
};

export const instant = false;

export default async function TopicPage({
  params,
}: {
  params: Promise<{ ageGroup: string; topicSlug: string }>;
}) {
  const { ageGroup, topicSlug } = await params;
  const topic = curriculum[ageGroup]?.[topicSlug];

  if (!topic) {
    notFound();
  }

  return (
    <main className="ed-container ed-page space-y-8">
      <section className="ed-hero px-6 py-10 sm:px-10">
        <Decor symbols={["🌳", "🍎", "🦊", "🔢", "⭐", "🌿"]} />
        <Link href={"/subjects/math/" + ageGroup} className="ed-chip no-underline">← Ages {ageGroup}</Link>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <div className="grid h-24 w-24 place-items-center rounded-3xl bg-white/20 text-6xl">{topic.emoji}</div>
          <div>
            <span className="ed-chip ed-chip-mint">Lesson 1</span>
            <h1 className="mt-2 text-4xl font-bold sm:text-6xl">{topic.title}</h1>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-lg text-white/90">{topic.description}</p>
      </section>
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-ink-soft">Your adventure</p>
            <h2 className="mt-1 text-3xl font-semibold">Four steps to complete</h2>
          </div>
          <span className="ed-chip ed-chip-solid">0 / 4 complete</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {STAGE_ORDER.map((stageSlug, index) => {
            const stage = topic.stages[stageSlug];

            return (
              <Link
                key={stageSlug}
                href={stagePath(ageGroup, topicSlug, stageSlug)}
                className={"ed-tint ed-tint-" + stageTints[stageSlug] + " ed-card-hover block p-6 no-underline"}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-2xl font-bold opacity-60">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-5xl">{stage.emoji}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{stage.title}</h3>
                <p className="mt-2 text-grape-900/75">{stage.description}</p>
                <p className="mt-5 font-display font-semibold">Start step →</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
