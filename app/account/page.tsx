"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Button from "../../components/ui/Button";
import { ageGroups } from "../../lib/sampleData";
import { useAvatar } from "../../components/Shared/AvatarContext";

/*
  Account page (Edutastic).
  Lets a parent change the account credentials and the child's age group.
  Visual only: there is no authentication or backend yet.
*/

const AVATARS = ["🦊", "🐼", "🦁", "🐙", "🦄", "🐸", "🚀", "🐯"];

const ACCOUNT_LINKS = [
  { href: "/rewards", label: "Badges and trophies", emoji: "🏆" },
  { href: "/progress", label: "My progress", emoji: "📈" },
  { href: "/settings", label: "Settings", emoji: "⚙️" },
  { href: "/teacher", label: "AI Teacher", emoji: "🦉" },
];

// TODO: replace with the real learner once login / a database exists.
const LEARNER_NAME = "John Marston";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageGroup, setAgeGroup] = useState("4-5");
  const { avatar, setAvatar } = useAvatar();
  const [saved, setSaved] = useState(false);

  const ageLabel = ageGroups.find((g) => g.value === ageGroup)?.label ?? "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: send the new email / password / age group to the backend.
    setSaved(true);
  }

  return (
    <main className="ed-container ed-page space-y-6">
      <section className="ed-hero flex flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:text-left">
        <div key={avatar} className="ed-pop grid h-28 w-28 shrink-0 place-items-center rounded-full border-4 border-sun-400 bg-white text-7xl shadow-[0_6px_0_#d99a00]" aria-hidden="true">
          {avatar}
        </div>
        <div>
          <span className="ed-chip">👤 Account</span>
          <h1 className="mt-1 text-4xl font-bold">{LEARNER_NAME}</h1>
          <p className="text-white/85">Learner · {ageLabel}</p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <form className="ed-card space-y-6 p-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="mb-1 text-2xl font-semibold">Pick an avatar</h2>
            <p className="mb-3 text-sm font-semibold text-ink-soft">Tap one to try it on. (Preview only, not saved.)</p>
            <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Avatar">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  role="radio"
                  aria-checked={avatar === a}
                  aria-label={`Avatar ${a}`}
                  onClick={() => setAvatar(a)}
                  className={`relative grid h-16 w-16 place-items-center rounded-2xl border-[3px] text-4xl transition-transform hover:-translate-y-1 ${
                    avatar === a ? "border-grape-600 bg-grape-100 shadow-[0_5px_0_#6234e0]" : "border-line bg-surface-2"
                  }`}
                >
                  {a}
                  {avatar === a && (
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-mint-400 text-sm font-bold text-[#064d38]" aria-hidden="true">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Your details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="account-email" className="mb-1 block font-display font-semibold">Parent email</label>
                <input
                  id="account-email"
                  className="ed-input"
                  type="email"
                  autoComplete="email"
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSaved(false); }}
                />
              </div>
              <div>
                <label htmlFor="account-password" className="mb-1 block font-display font-semibold">New password</label>
                <input
                  id="account-password"
                  className="ed-input"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Leave empty to keep it"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setSaved(false); }}
                />
              </div>
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 text-2xl font-semibold font-display">Age group</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ageGroups.map((g) => (
                <label
                  key={g.value}
                  className={`cursor-pointer rounded-2xl border-[3px] p-4 text-center transition-transform hover:-translate-y-1 ${
                    ageGroup === g.value ? "border-grape-600 bg-grape-100 text-grape-900 shadow-[0_5px_0_#6234e0]" : "border-line bg-surface-2"
                  }`}
                >
                  <input
                    type="radio"
                    name="age-group"
                    value={g.value}
                    className="sr-only"
                    checked={ageGroup === g.value}
                    onChange={() => { setAgeGroup(g.value); setSaved(false); }}
                  />
                  <span className="block text-4xl">{g.emoji}</span>
                  <span className="font-display text-lg font-semibold">{g.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="ed-btn ed-btn-mint">Save changes</button>
            <Button href="/" variant="ghost">Sign out</Button>
            <p role="status" className="font-display font-semibold text-mint-600">{saved ? "Saved! ✓" : ""}</p>
          </div>
        </form>

        <nav className="space-y-3" aria-label="More account pages">
          {ACCOUNT_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="ed-card ed-card-hover flex items-center justify-between gap-3 px-5 py-4 no-underline">
              <span className="flex items-center gap-3 font-display text-lg font-semibold">
                <span className="text-3xl">{l.emoji}</span>
                {l.label}
              </span>
              <span aria-hidden="true" className="text-xl text-grape-500">›</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
