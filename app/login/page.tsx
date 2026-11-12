"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "../../components/Auth/AuthShell";
import FormField from "../../components/Auth/FormField";
import PasswordField from "../../components/Auth/PasswordField";
import { login } from "../../lib/auth/authService";
import { validateLogin, type LoginValues } from "../../lib/auth/validation";

/*
  Parent login (frontend prototype).
  Any valid-looking email + password "signs in". Real authentication belongs in
  lib/auth/authService.ts – this page does not need to change for that.
*/

type Field = keyof LoginValues;

export default function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const errors = validateLogin(values);
  const shown = (f: Field) => (touched[f] ? errors[f] : undefined);

  const update = (f: Field) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [f]: e.target.value }));
    setFormError("");
  };
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setNotice("");
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const result = await login({ ...values, remember });
    if (result.ok) {
      router.push("/");
    } else {
      setFormError(result.message);
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      heading={
        <>
          Welcome back to <span className="text-sun-400">Edutastic</span>
        </>
      }
      blurb="Sign in to manage your child's learning, check how they're doing and update their settings."
      points={[
        "See your child's progress at a glance",
        "Choose the right age group for them",
        "Parents stay in control of the account",
      ]}
    >
      <span className="ed-chip ed-chip-bolt">👨‍👩‍👧 Parent &amp; guardian sign in</span>
      <h2 className="mt-3 text-3xl font-semibold">Sign in</h2>
      <p className="mb-6 mt-1 font-semibold text-ink-soft">Good to see you again! Enter your details to continue.</p>

      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <FormField id="login-email" label="Email address" error={shown("email")}>
          <input
            id="login-email"
            className="ed-input"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={update("email")}
            onBlur={blur("email")}
            aria-invalid={shown("email") ? true : undefined}
            aria-describedby={shown("email") ? "login-email-error" : undefined}
          />
        </FormField>

        <FormField id="login-password" label="Password" error={shown("password")}>
          <PasswordField
            id="login-password"
            autoComplete="current-password"
            placeholder="Your password"
            value={values.password}
            onChange={update("password")}
            onBlur={blur("password")}
            invalid={!!shown("password")}
          />
        </FormField>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2.5 font-semibold">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-5 w-5 rounded accent-[#6234e0]"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={() => setNotice("Password reset isn't available in this prototype yet.")}
            className="font-display font-semibold text-grape-500 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {notice && (
          <p role="status" className="rounded-2xl bg-bolt-100 px-4 py-3 text-sm font-bold text-[#0f4fa8]">
            ℹ️ {notice}
          </p>
        )}
        {formError && (
          <p role="alert" className="ed-error text-sm font-bold">
            ⚠ {formError}
          </p>
        )}

        <button type="submit" className="ed-btn ed-btn-lg w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center font-semibold text-ink-soft">
        New to Edutastic?{" "}
        <Link href="/register" className="font-display font-semibold text-grape-500 hover:underline">
          Create a parent account
        </Link>
      </p>
    </AuthShell>
  );
}
