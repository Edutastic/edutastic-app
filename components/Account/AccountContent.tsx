"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { ageGroups } from "../../lib/sampleData";
import {
  CHILD_PROFILE_AVATARS,
} from "../../lib/child-profiles/constants";
import type { ChildProfileSummary } from "../../lib/child-profiles/types";
import { useChildProfiles } from "../Shared/ChildProfileContext";
import {
  createChildProfile,
  updateChildProfile,
} from "../../app/account/actions";

const ACCOUNT_LINKS = [
  { href: "/rewards", label: "Badges and trophies", emoji: "🏆" },
  { href: "/progress", label: "My progress", emoji: "📈" },
  { href: "/settings", label: "Settings", emoji: "⚙️" },
  { href: "/teacher", label: "AI Teacher", emoji: "🦉" },
];

type AccountContentProps = {
  parentName: string;
  parentEmail: string;
  initialChildProfiles: ChildProfileSummary[];
};

export default function AccountContent({
  parentName,
  parentEmail,
  initialChildProfiles,
}: AccountContentProps) {
  const router = useRouter();
  const {
    profiles,
    activeProfileId,
    profilesLoading,
    profileLoadError,
    selectProfile,
    replaceProfiles,
  } = useChildProfiles();
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [ageGroupKey, setAgeGroupKey] = useState(ageGroups[0].value);
  const [avatar, setAvatar] = useState<string>(CHILD_PROFILE_AVATARS[0]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [email, setEmail] = useState(parentEmail);
  const [savingEmail, setSavingEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [signOutError, setSignOutError] = useState("");

  const childProfiles =
    profilesLoading || profileLoadError ? initialChildProfiles : profiles;
  const selectedProfileId =
    activeProfileId || (initialChildProfiles[0]?.id ?? "");

  function startAddingProfile() {
    setEditingProfileId(null);
    setNickname("");
    setAgeGroupKey(ageGroups[0].value);
    setAvatar(CHILD_PROFILE_AVATARS[0]);
    setFormError("");
    setSaveMessage("");
  }

  function startEditingProfile(profile: ChildProfileSummary) {
    setEditingProfileId(profile.id);
    setNickname(profile.nickname);
    setAgeGroupKey(profile.ageGroupKey);
    setAvatar(profile.avatar);
    setFormError("");
    setSaveMessage("");
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError("");
    setEmailMessage("");

    const newEmail = email.trim().toLowerCase();
    if (!newEmail) {
      setEmailError("Enter a valid email address.");
      return;
    }

    if (newEmail === parentEmail.toLowerCase()) {
      setEmailMessage("This is already your account email.");
      return;
    }

    setSavingEmail(true);

    try {
      const { error } = await authClient.changeEmail({
        newEmail,
        callbackURL: "/account",
      });

      if (error) {
        setEmailError(error.message ?? "Unable to update your email. Please try again.");
        return;
      }

      setEmail(newEmail);
      setEmailMessage("Parent email updated.");
      router.refresh();
    } catch {
      setEmailError("Unable to update your email. Please try again.");
    } finally {
      setSavingEmail(false);
    }
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFormError("");
    setSaveMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const result = editingProfileId
        ? await updateChildProfile(editingProfileId, formData)
        : await createChildProfile(formData);

      if (!result.ok) {
        setFormError(result.message);
        return;
      }

      replaceProfiles(result.profiles, result.activeProfileId);
      setEditingProfileId(result.activeProfileId);
      const updatedProfile = result.profiles.find(
        (profile) => profile.id === result.activeProfileId,
      );
      if (updatedProfile) {
        setNickname(updatedProfile.nickname);
        setAgeGroupKey(updatedProfile.ageGroupKey);
        setAvatar(updatedProfile.avatar);
      }
      setSaveMessage("Child profile saved.");
      router.refresh();
    } catch {
      setFormError("Unable to save this child profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setSignOutError("");

    try {
      const { error } = await authClient.signOut();
      if (error) {
        setSignOutError(error.message ?? "Unable to sign out. Please try again.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setSignOutError("Unable to sign out. Please try again.");
    }
  }

  return (
    <main className="ed-container ed-page space-y-6">
      <section className="ed-hero flex flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:text-left">
        <div className="ed-pop grid h-28 w-28 shrink-0 place-items-center rounded-full border-4 border-sun-400 bg-white text-6xl shadow-[0_6px_0_#d99a00]" aria-hidden="true">
          👤
        </div>
        <div>
          <span className="ed-chip">👤 Parent account</span>
          <h1 className="mt-1 text-4xl font-bold">{parentName}</h1>
          <p className="text-white/85">{parentEmail}</p>
        </div>
      </section>

      <section className="ed-card space-y-4 p-6">
        <div>
          <h2 className="text-2xl font-semibold">Parent email</h2>
          <p className="mt-1 font-semibold text-ink-soft">
            Update the email you use to sign in.
          </p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={handleEmailSubmit}>
          <div className="min-w-0 flex-1">
            <label htmlFor="parent-email" className="mb-1 block font-display font-semibold">
              Email address
            </label>
            <input
              id="parent-email"
              className="ed-input"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
                setEmailMessage("");
              }}
            />
          </div>
          <button type="submit" className="ed-btn ed-btn-mint" disabled={savingEmail}>
            {savingEmail ? "Updating…" : "Update email"}
          </button>
        </form>
        {emailError && <p role="alert" className="ed-error text-sm font-bold">{emailError}</p>}
        {emailMessage && <p role="status" className="font-display font-semibold text-mint-600">{emailMessage}</p>}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="ed-card space-y-6 p-6">
          <div>
            <h2 className="text-2xl font-semibold">Children&apos;s accounts</h2>
            <p className="mt-1 font-semibold text-ink-soft">
              Each child gets a profile with their own name, age group, and saved avatar.
            </p>
          </div>

          {profileLoadError && (
            <p role="alert" className="ed-error text-sm font-bold">{profileLoadError}</p>
          )}

          {childProfiles.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2" aria-label="Child profiles">
              {childProfiles.map((profile) => {
                const ageLabel =
                  ageGroups.find((group) => group.value === profile.ageGroupKey)?.label ??
                  profile.ageGroupKey;
                const active = selectedProfileId === profile.id;

                return (
                  <div
                    key={profile.id}
                    className={`ed-card flex items-center gap-3 p-4 ${
                      active ? "border-grape-600 bg-grape-100" : ""
                    }`}
                  >
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectProfile(profile.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-4xl">
                        {profile.avatar}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-display text-lg font-semibold">
                          {profile.nickname}
                        </span>
                        <span className="block text-sm font-semibold text-ink-soft">
                          {ageLabel}{active ? " · Active" : ""}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="ed-btn ed-btn-ghost ed-btn-sm shrink-0"
                      onClick={() => startEditingProfile(profile)}
                      aria-label={`Edit ${profile.nickname}'s profile`}
                    >
                      Edit
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="rounded-2xl bg-surface-2 p-4 font-semibold text-ink-soft">
              Add your first child profile to get started.
            </p>
          )}

          <form className="space-y-5 border-t border-line pt-5" onSubmit={handleProfileSubmit}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">
                {editingProfileId ? "Edit child profile" : "Add a child account"}
              </h3>
              {editingProfileId && (
                <button
                  type="button"
                  className="ed-btn ed-btn-ghost ed-btn-sm"
                  onClick={startAddingProfile}
                >
                  Add another child
                </button>
              )}
            </div>

            <div>
              <label htmlFor="child-nickname" className="mb-1 block font-display font-semibold">
                Child&apos;s name
              </label>
              <input
                id="child-nickname"
                name="nickname"
                className="ed-input"
                type="text"
                autoComplete="off"
                maxLength={50}
                required
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="e.g. Alex"
              />
            </div>

            <fieldset>
              <legend className="mb-3 text-xl font-semibold font-display">Age group</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {ageGroups.map((group) => (
                  <label
                    key={group.value}
                    className={`cursor-pointer rounded-2xl border-[3px] p-3 text-center transition-transform hover:-translate-y-1 ${
                      ageGroupKey === group.value
                        ? "border-grape-600 bg-grape-100 text-grape-900 shadow-[0_5px_0_#6234e0]"
                        : "border-line bg-surface-2"
                    }`}
                  >
                    <input
                      type="radio"
                      name="ageGroupKey"
                      value={group.value}
                      className="sr-only"
                      checked={ageGroupKey === group.value}
                      onChange={() => setAgeGroupKey(group.value)}
                    />
                    <span className="block text-3xl">{group.emoji}</span>
                    <span className="font-display font-semibold">{group.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-xl font-semibold font-display">Choose an avatar</legend>
              <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Child avatar">
                {CHILD_PROFILE_AVATARS.map((childAvatar) => (
                  <button
                    key={childAvatar}
                    type="button"
                    role="radio"
                    aria-checked={avatar === childAvatar}
                    aria-label={`Avatar ${childAvatar}`}
                    onClick={() => setAvatar(childAvatar)}
                    className={`grid h-14 w-14 place-items-center rounded-2xl border-[3px] text-3xl transition-transform hover:-translate-y-1 ${
                      avatar === childAvatar
                        ? "border-grape-600 bg-grape-100 shadow-[0_5px_0_#6234e0]"
                        : "border-line bg-surface-2"
                    }`}
                  >
                    {childAvatar}
                  </button>
                ))}
              </div>
              <input type="hidden" name="avatar" value={avatar} />
            </fieldset>

            {formError && <p role="alert" className="ed-error text-sm font-bold">⚠ {formError}</p>}
            {saveMessage && <p role="status" className="font-display font-semibold text-mint-600">{saveMessage}</p>}

            <button type="submit" className="ed-btn ed-btn-mint" disabled={saving}>
              {saving ? "Saving…" : editingProfileId ? "Save profile" : "Add child profile"}
            </button>
          </form>

          <div className="border-t border-line pt-5">
            <button type="button" className="ed-btn ed-btn-ghost" onClick={handleSignOut}>
              Sign out
            </button>
            {signOutError && (
              <p role="alert" className="ed-error mt-3 text-sm font-bold">{signOutError}</p>
            )}
          </div>
        </section>

        <nav className="space-y-3" aria-label="More account pages">
          {ACCOUNT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="ed-card ed-card-hover flex items-center justify-between gap-3 px-5 py-4 no-underline">
              <span className="flex items-center gap-3 font-display text-lg font-semibold">
                <span className="text-3xl">{link.emoji}</span>
                {link.label}
              </span>
              <span aria-hidden="true" className="text-xl text-grape-500">›</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
