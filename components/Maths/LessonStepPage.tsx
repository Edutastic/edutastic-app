import Link from "next/link";
import type { Tint } from "../../lib/sampleData";
import type { Stage, StageSlug, Topic } from "../../lib/curriculum/types";
import { STAGE_ORDER } from "../../lib/curriculum/types";
import { stagePath, topicPath } from "../../lib/curriculum/paths";

type Props = {
  ageGroup: string;
  topicSlug: string;
  topic: Topic;
  stageSlug: StageSlug;
  stage: Stage;
};

const stageTints: Record<StageSlug, Tint> = {
  tutorial: "bolt",
  "guided-interaction": "mint",
  exercise: "sun",
  test: "coral",
};

export default function LessonStepPage({
  ageGroup,
  topicSlug,
  topic,
  stageSlug,
  stage,
}: Props) {
  const stageIndex = STAGE_ORDER.indexOf(stageSlug);
  const nextStage = STAGE_ORDER[stageIndex + 1];

  return (
    <main className="ed-container ed-page space-y-8">
      <Link href={topicPath(ageGroup, topicSlug)} className="ed-chip ed-chip-solid no-underline">← {topic.title}</Link>
      <section className={"ed-tint ed-tint-" + stageTints[stageSlug] + " p-6 sm:p-10"}>
        <div className="text-7xl">{stage.emoji}</div>
        <p className="mt-5 font-display text-sm font-semibold uppercase tracking-widest opacity-70">{topic.title} · Lesson 1</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{stage.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-grape-900/75">{stage.description}</p>
      </section>
      <section className="ed-card p-6 sm:p-8">
        <div className="flex min-h-52 flex-col items-center justify-center text-center"><span className="text-6xl">✨</span><h2 className="mt-4 text-2xl font-semibold">Coming together soon</h2><p className="mt-2 max-w-lg text-ink-soft">This space is ready for the {stage.title.toLowerCase()} activity.</p></div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {nextStage ? <Link href={stagePath(ageGroup, topicSlug, nextStage)} className="ed-btn ed-btn-lg ed-btn-mint">Continue →</Link> : <Link href={topicPath(ageGroup, topicSlug)} className="ed-btn ed-btn-lg ed-btn-sun">Back to topic</Link>}
        </div>
      </section>
    </main>
  );
}
