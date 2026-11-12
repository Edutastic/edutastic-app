"use client";

import Logo from "../../components/Shared/Logo/Logo";
import Mascot from "../../components/ui/Mascot";
import Decor from "../../components/ui/Decor";
import Button from "../../components/ui/Button";
import { useRegistration } from "../../components/Auth/RegistrationContext";
import { ageGroups } from "../../lib/sampleData";

/*
  Welcome / confirmation screen shown after "Create account".
  Reads the temporary in-memory registration details; if someone opens this
  URL directly (or reloads) there is nothing to show, so we offer a way back.
*/
export default function WelcomePage() {
  const { registration } = useRegistration();

  if (!registration) {
    return (
      <div role="main" className="grid min-h-screen place-items-center px-4">
        <div className="ed-card ed-pop max-w-md space-y-4 p-8 text-center">
          <Mascot size={110} className="ed-float mx-auto block" />
          <h1 className="text-3xl font-semibold">Nothing to show yet</h1>
          <p className="font-semibold text-ink-soft">
            Create an account first and we&apos;ll show your welcome screen here.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/register" variant="coral">Create account</Button>
            <Button href="/login" variant="ghost">Sign in</Button>
          </div>
        </div>
      </div>
    );
  }

  const group = ageGroups.find((g) => g.value === registration.ageGroup);
  const firstName = registration.parentName.split(" ")[0];
  const child = registration.childName || "Your child";

  return (
    <div role="main" className="min-h-screen">
      <div className="ed-container flex min-h-screen max-w-3xl flex-col justify-center gap-6 py-6">
        <section className="ed-hero ed-pop px-6 py-8 text-center sm:px-10 sm:py-10">
          <Decor symbols={["🎉", "⭐", "✨", "🎈", "🌟", "🎊"]} />
          <div className="flex justify-center">
            <Logo light size="sm" />
          </div>
          <Mascot size={170} className="ed-float mx-auto mt-4 block drop-shadow-xl" />
          <span className="ed-chip mt-2">✅ Account created</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Welcome, <span className="text-sun-400">{firstName}</span>!
          </h1>
          <p className="mx-auto mt-2 max-w-md text-lg text-white/85">
            You&apos;re all set. Felix the Fox is excited to meet {registration.childName || "your child"}!
          </p>

          {/* Summary card */}
          <div className="ed-card text-ink mx-auto mt-6 max-w-md p-5 text-left">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-bubble-500">
              {registration.childName ? `${child}'s learning` : "Your child's learning"}
            </p>
            <div className="mt-2 flex items-center gap-4">
              <div className="ed-wiggle grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-grape-100 text-5xl" aria-hidden="true">
                {group?.emoji ?? "🎓"}
              </div>
              <div>
                <p className="font-display text-2xl font-semibold leading-tight">{group?.label ?? "Age group not set"}</p>
                {group && <p className="font-semibold text-ink-soft">{group.blurb}</p>}
              </div>
            </div>
            <p className="mt-3 break-words text-sm font-semibold text-ink-soft">Account: {registration.email}</p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <Button href="/" variant="sun" size="lg">Continue to dashboard →</Button>
            <p className="text-sm text-white/80">You can change the age group any time in Account.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
