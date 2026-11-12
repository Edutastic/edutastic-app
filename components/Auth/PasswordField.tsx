"use client";

import { useState, type InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  id: string;
  invalid?: boolean;
};

/** Password input with a show/hide button. */
export default function PasswordField({ id, invalid, ...rest }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        className="ed-input"
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        // inline style: the unlayered .ed-input padding would override a utility class
        style={{ paddingRight: "5.5rem" }}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-pressed={visible}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1.5 font-display text-sm font-semibold text-grape-500 transition-colors hover:bg-grape-100 hover:text-grape-700 focus-visible:outline-3 focus-visible:outline-sun-400"
      >
        {visible ? "🙈 Hide" : "👁️ Show"}
      </button>
    </div>
  );
}
