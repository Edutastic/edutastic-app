export const STAGE_ORDER = [
  "tutorial",
  "guided-interaction",
  "exercise",
  "test",
] as const;

export type StageSlug = (typeof STAGE_ORDER)[number];

export type Stage = {
  title: string;
  emoji: string;
  description: string;
};

export type Topic = {
  title: string;
  emoji: string;
  description: string;
  stages: Record<StageSlug, Stage>;
};

export type Curriculum = Record<string, Record<string, Topic>>;

export function isStageSlug(value: string): value is StageSlug {
  return STAGE_ORDER.some((stage) => stage === value);
}