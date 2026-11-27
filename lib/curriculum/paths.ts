import type { StageSlug } from "./types";

export function topicPath(ageGroup: string, topicSlug: string) {
  return `/subjects/math/${encodeURIComponent(ageGroup)}/${encodeURIComponent(topicSlug)}`;
}

export function stagePath(
  ageGroup: string,
  topicSlug: string,
  stage: StageSlug,
) {
  return `${topicPath(ageGroup, topicSlug)}/${stage}`;
}