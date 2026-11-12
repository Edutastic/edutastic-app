"use client";

import { ageGroups } from "../../lib/sampleData";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

/**
 * Selectable age-group cards (one at a time). Built on native radio inputs,
 * so keyboard (arrow keys / space) and screen readers work out of the box.
 */
export default function AgeGroupCards({ value, onChange, error }: Props) {
  return (
    <fieldset aria-describedby={error ? "ageGroup-error" : undefined}>
      <legend className="mb-1 font-display font-semibold">Your child&apos;s age group</legend>
      <p className="mb-3 text-sm font-semibold text-ink-soft">
        This tailors the activities. You can change it later in Account.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ageGroups.map((g) => {
          const on = value === g.value;
          return (
            <label
              key={g.value}
              className={`relative cursor-pointer rounded-2xl border-[3px] p-3 text-center transition-all duration-150 hover:-translate-y-1 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-sun-400 ${
                on
                  ? "border-grape-600 bg-grape-100 text-grape-900 shadow-[0_5px_0_#6234e0]"
                  : "border-line bg-surface-2 shadow-[0_5px_0_var(--line)]"
              }`}
            >
              <input
                type="radio"
                name="ageGroup"
                value={g.value}
                checked={on}
                onChange={() => onChange(g.value)}
                className="sr-only"
              />
              {on && (
                <span
                  aria-hidden="true"
                  className="ed-pop absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-mint-400 text-sm font-bold text-[#064d38] shadow"
                >
                  ✓
                </span>
              )}
              <span className={`block text-4xl ${on ? "ed-wiggle" : ""}`} aria-hidden="true">{g.emoji}</span>
              <span className="mt-1 block font-display text-base font-semibold leading-tight sm:text-lg">{g.label}</span>
              <span className={`block text-xs font-semibold ${on ? "text-grape-800" : "text-ink-soft"}`}>{g.blurb}</span>
            </label>
          );
        })}
      </div>

      {error && (
        <p id="ageGroup-error" role="alert" className="ed-error mt-2 text-sm font-bold">
          ⚠ {error}
        </p>
      )}
    </fieldset>
  );
}
