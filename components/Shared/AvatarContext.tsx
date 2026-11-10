"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { learner } from "../../lib/sampleData";

/*
  Session-only avatar state (visual demo).
  Lives in memory while the app is open: it is NOT saved anywhere and resets
  on a full page reload. Replace with real profile data when accounts exist.
*/

type AvatarCtx = { avatar: string; setAvatar: (a: string) => void };

const Ctx = createContext<AvatarCtx>({ avatar: learner.avatar, setAvatar: () => {} });

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatar, setAvatar] = useState(learner.avatar);
  return <Ctx.Provider value={{ avatar, setAvatar }}>{children}</Ctx.Provider>;
}

export const useAvatar = () => useContext(Ctx);
