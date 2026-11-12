"use client";

import { useState, type ReactNode } from "react";
import { useTheme } from "../../components/Shared/ThemeContext";

/*
  Settings page.
  The light/dark toggle works for the current visit (it sets data-theme on <html>);
  language and sound are visual placeholders. Nothing is saved yet.
*/

function Row({ emoji, title, desc, children }: { emoji: string; title: string; desc: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-grape-100 text-3xl">{emoji}</span>
        <div>
          <h3 className="text-xl font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-ink-soft">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const [lang, setLang] = useState<"en" | "nl">("en");
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);

  function toggleTheme() {
    setTheme(dark ? "light" : "dark");
  }

  return (
    <main className="ed-container ed-page max-w-3xl space-y-6">
      <section className="ed-hero px-6 py-8 sm:px-10">
        <span className="ed-chip">⚙️ Settings</span>
        <h1 className="mt-2 text-4xl font-bold">Make it yours</h1>
        <p className="text-white/85">Choose how Edutastic looks and sounds.</p>
      </section>

      <section className="ed-card divide-y-2 divide-line px-6">
        <Row emoji={dark ? "🌙" : "☀️"} title="Theme" desc={dark ? "Dark mode is on" : "Light mode is on"}>
          <button
            type="button"
            role="switch"
            aria-checked={dark}
            aria-label="Dark mode"
            className="ed-switch"
            onClick={toggleTheme}
          />
        </Row>

        <Row emoji="🌍" title="Language" desc="Choose English or Dutch (design preview)">
          <div className="flex gap-2" role="radiogroup" aria-label="Language">
            {([
              ["en", "🇬🇧 English"],
              ["nl", "🇳🇱 Nederlands"],
            ] as const).map(([v, label]) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={lang === v}
                onClick={() => setLang(v)}
                className={`rounded-2xl border-[3px] px-3 py-2 font-display text-sm font-semibold sm:text-base ${
                  lang === v ? "border-grape-600 bg-grape-100 text-grape-900" : "border-line bg-surface-2"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Row>

        <Row emoji="🔊" title="Sound effects" desc="Fun sounds when you play">
          <button type="button" role="switch" aria-checked={sound} aria-label="Sound effects" className="ed-switch" onClick={() => setSound((v) => !v)} />
        </Row>

        <Row emoji="🎵" title="Music" desc="Happy background tunes">
          <button type="button" role="switch" aria-checked={music} aria-label="Music" className="ed-switch" onClick={() => setMusic((v) => !v)} />
        </Row>
      </section>

      <p className="text-center text-sm font-semibold text-ink-soft">
        Settings are a design preview and are not saved yet.
      </p>
    </main>
  );
}
