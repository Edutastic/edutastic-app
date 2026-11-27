import Link from "next/link";
import { notFound } from "next/navigation";
import Decor from "../../../../components/ui/Decor";
import ProgressBar from "../../../../components/ui/ProgressBar";
import { ageGroups } from "../../../../lib/sampleData";
import { curriculum } from "../../../../lib/curriculum/data";
import { topicPath } from "../../../../lib/curriculum/paths";

const topicTints = ["coral", "bolt", "sun", "mint", "bubble", "grape"] as const;

export const instant = false;

export default async function MathAgeGroupPage({
  params,
}: {
  params: Promise<{ ageGroup: string }>;
}) {
  const { ageGroup } = await params;
  const group = ageGroups.find((item) => item.value === ageGroup);
  const topics = curriculum[ageGroup];

  if (!group || !topics) {
    notFound();
  }

  return (
    <main className="ed-container ed-page space-y-8">
      <section className="ed-hero ed-hero-math px-6 py-10 sm:px-10">
        <Decor symbols={["🌳", "🍎", "🐿️", "🔢", "⭐", "🌿"]} />
        <span className="ed-chip">{group.emoji} {group.label}</span>
        <h1 className="mt-3 text-4xl font-bold sm:text-6xl">Welcome to the {group.blurb}!</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/90">Choose a topic and start learning one step at a time.</p>
      </section>
      <section className="grid gap-5 sm:grid-cols-2">
        {Object.entries(topics).map(([topicSlug, topic], index) => (
          <Link
            key={topicSlug}
            href={topicPath(ageGroup, topicSlug)}
            className={"ed-tint ed-tint-" + topicTints[index % topicTints.length] + " ed-card-hover block p-6 no-underline"}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white text-5xl shadow-[0_4px_0_rgba(38,16,106,0.14)]">{topic.emoji}</div>
              <span className="ed-chip ed-chip-mint">Ready</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold">{topic.title}</h2>
            <p className="mt-2 text-lg text-grape-900/75">{topic.description}</p>
            <ProgressBar value={0} label={topic.title + " progress"} className="mt-5" />
            <p className="mt-4 font-display text-lg font-semibold">Explore topic →</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
