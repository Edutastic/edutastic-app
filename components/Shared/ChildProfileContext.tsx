"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { ChildProfileSummary } from "../../lib/child-profiles/types";

const ACTIVE_PROFILE_KEY = "edutastic:active-child-profile";

type ChildProfileContextValue = {
  profiles: ChildProfileSummary[];
  activeProfile: ChildProfileSummary | null;
  activeProfileId: string;
  profilesLoading: boolean;
  profileLoadError: string;
  selectProfile: (id: string) => void;
  replaceProfiles: (profiles: ChildProfileSummary[], preferredId?: string) => void;
};

const Context = createContext<ChildProfileContextValue>({
  profiles: [],
  activeProfile: null,
  activeProfileId: "",
  profilesLoading: true,
  profileLoadError: "",
  selectProfile: () => {},
  replaceProfiles: () => {},
});

function isChildProfile(value: unknown): value is ChildProfileSummary {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "string" &&
    "nickname" in value &&
    typeof value.nickname === "string" &&
    "ageGroupKey" in value &&
    typeof value.ageGroupKey === "string" &&
    "avatar" in value &&
    typeof value.avatar === "string"
  );
}

export function ChildProfileProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [profiles, setProfiles] = useState<ChildProfileSummary[]>([]);
  const [activeProfileId, setActiveProfileId] = useState("");
  const [profilesLoading, setProfilesLoading] = useState(true);
  const [profileLoadError, setProfileLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfiles() {
      setProfilesLoading(true);

      try {
        const response = await fetch("/api/child-profiles", { cache: "no-store" });

        if (response.status === 401) {
          if (!cancelled) {
            setProfiles([]);
            setActiveProfileId("");
            setProfileLoadError("");
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to load child profiles.");
        }

        const result: unknown = await response.json();
        if (!Array.isArray(result) || !result.every(isChildProfile)) {
          throw new Error("The child profile response was invalid.");
        }

        const nextProfiles = result.filter(isChildProfile);
        const storedId = localStorage.getItem(ACTIVE_PROFILE_KEY);
        const nextActiveId = nextProfiles.some((profile) => profile.id === storedId)
          ? storedId ?? ""
          : nextProfiles[0]?.id ?? "";

        if (!cancelled) {
          setProfiles(nextProfiles);
          setActiveProfileId(nextActiveId);
          setProfileLoadError("");
          if (nextActiveId) {
            localStorage.setItem(ACTIVE_PROFILE_KEY, nextActiveId);
          } else {
            localStorage.removeItem(ACTIVE_PROFILE_KEY);
          }
        }
      } catch {
        if (!cancelled) {
          setProfiles([]);
          setActiveProfileId("");
          setProfileLoadError("Unable to load child profiles. Please refresh the page.");
        }
      } finally {
        if (!cancelled) {
          setProfilesLoading(false);
        }
      }
    }

    void loadProfiles();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const selectProfile = useCallback((id: string) => {
    setActiveProfileId(id);
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  }, []);

  const replaceProfiles = useCallback(
    (nextProfiles: ChildProfileSummary[], preferredId?: string) => {
      const selectedId =
        (preferredId && nextProfiles.some((profile) => profile.id === preferredId)
          ? preferredId
          : undefined) ??
        (nextProfiles.some((profile) => profile.id === activeProfileId)
          ? activeProfileId
          : undefined) ??
        nextProfiles[0]?.id ??
        "";

      setProfiles(nextProfiles);
      setActiveProfileId(selectedId);
      setProfilesLoading(false);
      setProfileLoadError("");

      if (selectedId) {
        localStorage.setItem(ACTIVE_PROFILE_KEY, selectedId);
      } else {
        localStorage.removeItem(ACTIVE_PROFILE_KEY);
      }
    },
    [activeProfileId],
  );

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? null,
    [profiles, activeProfileId],
  );

  return (
    <Context.Provider
      value={{
        profiles,
        activeProfile,
        activeProfileId,
        profilesLoading,
        profileLoadError,
        selectProfile,
        replaceProfiles,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useChildProfiles = () => useContext(Context);
