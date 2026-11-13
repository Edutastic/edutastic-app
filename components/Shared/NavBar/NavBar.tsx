"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { learner } from "../../../lib/sampleData";
import { useChildProfiles } from "../ChildProfileContext";
import { isChromeless } from "../../../lib/routes";

export const NAV_ITEMS = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/subjects", label: "Learn", emoji: "🎮" },
  { href: "/rewards", label: "Rewards", emoji: "🏆" },
  { href: "/progress", label: "Progress", emoji: "📈" },
  { href: "/teacher", label: "Teacher", emoji: "🦉" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export default function NavBar() {
  const pathname = usePathname();
  const {
    profiles,
    activeProfileId,
    profilesLoading,
    selectProfile,
  } = useChildProfiles();

  // Game and sign-in screens are full-screen: no navigation bar.
  if (isChromeless(pathname)) return null;

  return (
    <>
      <header className="ed-nav">
        <div className="ed-container flex h-[68px] items-center justify-between gap-4">
          <Logo size="md" />

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="ed-navlink"
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                <span aria-hidden="true">{item.emoji}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {!profilesLoading && profiles.length > 0 && (
              <label className="flex min-w-0 items-center gap-1.5">
                <span aria-hidden="true" className="text-2xl">
                  {profiles.find((profile) => profile.id === activeProfileId)?.avatar ?? "👧"}
                </span>
                <select
                  aria-label="Active child profile"
                  className="ed-input h-11 max-w-32 py-0 text-sm"
                  value={activeProfileId}
                  onChange={(event) => selectProfile(event.target.value)}
                >
                  {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>{profile.nickname}</option>
                  ))}
                </select>
              </label>
            )}
            <span className="ed-chip ed-chip-sun" title="Daily streak (sample)">🔥 {learner.streak}</span>
            <span className="ed-chip ed-chip-sun hidden sm:inline-flex" title="Stars (sample)">⭐ {learner.stars}</span>
            <Link
              href="/account"
              aria-label="Account"
              className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-grape-400 bg-bubble-100 text-2xl shadow-[0_4px_0_#7b4dff] transition-transform hover:-translate-y-0.5"
            >
              👤
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav aria-label="Main (mobile)" className="ed-tabbar md:hidden">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="ed-tab"
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
          >
            <span aria-hidden="true">{item.emoji}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
