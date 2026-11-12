"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { isChromeless } from "../../../lib/routes";

const LINKS = [
  { href: "/subjects", label: "Learn" },
  { href: "/rewards", label: "Rewards" },
  { href: "/progress", label: "Progress" },
  { href: "/teacher", label: "AI Teacher" },
  { href: "/account", label: "Account" },
  { href: "/settings", label: "Settings" },
];

export default function Footer() {
  const pathname = usePathname();
  if (isChromeless(pathname)) return null;

  return (
    <footer
      className="mt-10 pb-16 text-white md:pb-0"
      style={{ background: "linear-gradient(135deg,#26106a,#4b25b8)", borderTop: "6px solid #ffc83d" }}
    >
      <div className="ed-container grid gap-8 py-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <Logo light size="md" />
          <p className="max-w-md text-white/80">
            Learning is a game! Edutastic turns practice into play for curious kids aged 4–12.
          </p>
          <div className="flex gap-2 text-2xl" aria-hidden="true">
            <span className="ed-float">⭐</span>
            <span className="ed-float-slow">🌈</span>
            <span className="ed-float">🚀</span>
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 font-display text-lg">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/90 hover:text-sun-400 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-sm text-white/70">
        © 2026 Edutastic · Design preview with sample data
      </div>
    </footer>
  );
}
