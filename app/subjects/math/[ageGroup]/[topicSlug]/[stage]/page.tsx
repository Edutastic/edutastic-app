import { notFound } from "next/navigation";
import LessonStepPage from "../../../../../../components/Maths/LessonStepPage";
import { curriculum } from "../../../../../../lib/curriculum/data";
import { isStageSlug } from "../../../../../../lib/curriculum/types";

export const instant = false;

export default async function StagePage({
  params,
}: {
  params: Promise<{
    ageGroup: string;
    topicSlug: string;
    stage: string;
  }>;
}) {
  const { ageGroup, topicSlug, stage: stageParam } = await params;
  const topic = curriculum[ageGroup]?.[topicSlug];

  if (!topic || !isStageSlug(stageParam)) {
    notFound();
  }

  return (
    <LessonStepPage
      ageGroup={ageGroup}
      topicSlug={topicSlug}
      topic={topic}
      stageSlug={stageParam}
      stage={topic.stages[stageParam]}
    />
  );
}
