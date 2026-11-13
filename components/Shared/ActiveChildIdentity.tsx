"use client";

import { ageGroups } from "../../lib/sampleData";
import { useChildProfiles } from "./ChildProfileContext";

export function ActiveChildName({ fallback }: { fallback: string }) {
  const { activeProfile } = useChildProfiles();
  return <>{activeProfile?.nickname ?? fallback}</>;
}

type ActiveChildCardProps = {
  fallbackName: string;
  fallbackAvatar: string;
  fallbackAgeGroup: string;
  rank: string;
};

export function ActiveChildCard({
  fallbackName,
  fallbackAvatar,
  fallbackAgeGroup,
  rank,
}: ActiveChildCardProps) {
  const { activeProfile } = useChildProfiles();
  const ageGroup = activeProfile
    ? ageGroups.find((group) => group.value === activeProfile.ageGroupKey)?.label ??
      activeProfile.ageGroupKey
    : `Age ${fallbackAgeGroup}`;

  return (
    <div className="flex items-center gap-3">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-grape-100 text-3xl">
        {activeProfile?.avatar ?? fallbackAvatar}
      </div>
      <div>
        <p className="font-display text-lg font-semibold leading-none">
          {activeProfile?.nickname ?? fallbackName}
        </p>
        <p className="text-sm text-ink-soft">{rank} · {ageGroup}</p>
      </div>
    </div>
  );
}
