import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
};

/** Label + control + inline error message. The control must use `id` and `${id}-error` for aria-describedby. */
export default function FormField({ id, label, error, optional, hint, children }: Props) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 font-display font-semibold">
        <span>{label}</span>
        {optional && <span className="text-xs font-bold text-ink-soft">Optional</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-sm font-semibold text-ink-soft">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="ed-error mt-1.5 text-sm font-bold">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
