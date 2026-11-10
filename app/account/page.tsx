"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import "./account.css";

/*
  Account page (Edutastic).
  Lets a parent change the account credentials and the child's age group.
  The top navigation bar is NOT part of this file: it will come from the
  shared NavBar component in components/Shared/NavBar.
*/

const AGE_GROUPS = [
  { value: "4-6", label: "4 to 6" },
  { value: "7-9", label: "7 to 9" },
  { value: "10-12", label: "10 to 12" },
] as const;

type AgeGroup = (typeof AGE_GROUPS)[number]["value"];

const ACCOUNT_LINKS = [
  { href: "/badges", label: "Badges and trophies" },
  { href: "/evaluation", label: "Retake the evaluation test" },
  { href: "/settings", label: "Settings" },
  { href: "/privacy", label: "Privacy and data safety" },
];

// TODO: replace with the real learner once login / a database exists.
const LEARNER_NAME = "Johnny";

function ChevronRight() {
  return (
    <svg
      className="account-links__chevron"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("4-6");
  const [saved, setSaved] = useState(false);

  const ageLabel =
    AGE_GROUPS.find((group) => group.value === ageGroup)?.label ?? "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: send the new email / password / age group to the backend.
    setSaved(true);
  }

  function markChanged() {
    setSaved(false);
  }

  return (
    <main className="account">
      <h1 className="account__title">Account</h1>

      <div className="account__layout">
        <section className="account__main">
          <div className="account-profile">
            <span className="account-profile__avatar" aria-hidden="true">
              {LEARNER_NAME.charAt(0)}
            </span>
            <div className="account-profile__text">
              <span className="account-profile__name">{LEARNER_NAME}</span>
              <span className="account-profile__meta">
                Learner · Age group {ageLabel}
              </span>
            </div>
          </div>

          <form className="account-card" onSubmit={handleSubmit}>
            <h2 className="account-card__title">Your details</h2>

            <div className="account-fields">
              <div className="account-field">
                <label htmlFor="account-email">Parent email</label>
                <input
                  id="account-email"
                  type="email"
                  autoComplete="email"
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    markChanged();
                  }}
                />
              </div>

              <div className="account-field">
                <label htmlFor="account-password">New password</label>
                <input
                  id="account-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Leave empty to keep it"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    markChanged();
                  }}
                />
              </div>
            </div>

            <fieldset className="account-age">
              <legend>Age group</legend>
              <div className="account-age__options">
                {AGE_GROUPS.map((group) => (
                  <label key={group.value} className="account-age__option">
                    <input
                      type="radio"
                      name="age-group"
                      value={group.value}
                      checked={ageGroup === group.value}
                      onChange={() => {
                        setAgeGroup(group.value);
                        markChanged();
                      }}
                    />
                    <span>{group.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="account-actions">
              <button type="submit" className="account-button account-button--primary">
                Save changes
              </button>
              <Link href="/" className="account-button account-button--secondary">
                Sign out
              </Link>
              <p className="account-actions__status" role="status">
                {saved ? "Saved!" : ""}
              </p>
            </div>
          </form>
        </section>

        <nav className="account-links" aria-label="More account pages">
          {ACCOUNT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="account-links__item">
              {link.label}
              <ChevronRight />
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}