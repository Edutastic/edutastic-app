import type { ReactNode } from "react";
import Logo from "../Shared/Logo/Logo";
import Mascot from "../ui/Mascot";
import Decor from "../ui/Decor";

type Props = {
  heading: ReactNode;
  blurb: string;
  points: string[];
  children: ReactNode;
};

/**
 * Two-panel layout shared by the login and registration pages:
 * a branded panel with Felix on one side and the form card on the other.
 * On phones the panel shrinks to a compact header above the form.
 * (A <div role="main"> is used instead of <main> so the global mobile
 * tab-bar spacing rule for <main> doesn't apply to these full-screen pages.)
 */
export default function AuthShell({ heading, blurb, points, children }: Props) {
  return (
    <div role="main" className="min-h-screen">
      <div className="ed-container grid min-h-screen gap-6 py-4 sm:py-8 lg:grid-cols-[1fr_1.15fr] lg:items-stretch lg:gap-10">
        {/* Brand panel */}
        <aside className="ed-hero ed-pop flex flex-col px-6 py-6 sm:px-10 sm:py-8">
          <Decor symbols={["⭐", "✨", "📚", "💫", "🌈", "⭐"]} />

          <Logo light size="md" />

          <div className="mt-6 flex items-center justify-between gap-4 lg:mt-10 lg:block">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{heading}</h1>
              <p className="max-w-md text-base text-white/85 sm:text-lg">{blurb}</p>
            </div>
            <Mascot size={92} className="ed-float shrink-0 drop-shadow-lg lg:hidden" />
          </div>

          <div className="hidden flex-1 items-center justify-center py-6 lg:flex">
            <Mascot size={250} className="ed-float drop-shadow-xl" />
          </div>

          <ul className="hidden space-y-2 lg:block">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-semibold text-white/90">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint-400 text-sm font-bold text-[#064d38]" aria-hidden="true">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </aside>

        {/* Form side */}
        <section className="flex items-center justify-center">
          <div className="ed-card ed-pop w-full max-w-xl p-6 sm:p-8">{children}</div>
        </section>
      </div>
    </div>
  );
}
