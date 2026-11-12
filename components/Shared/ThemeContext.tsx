"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/*
  Session-only theme state. Dark is the default.
  The <html> tag starts with data-theme="dark" (see app/layout.tsx) so there is
  no flash; this provider keeps the attribute in sync when the Settings toggle
  changes it. Not persisted: a full reload goes back to dark.
*/

export type Theme = "dark" | "light";
type ThemeCtx = { theme: Theme; setTheme: (t: Theme) => void };

const Ctx = createContext<ThemeCtx>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
