"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "../../components/Auth/AuthShell";
import FormField from "../../components/Auth/FormField";
import PasswordField from "../../components/Auth/PasswordField";
import AgeGroupCards from "../../components/Auth/AgeGroupCards";
import { useRegistration } from "../../components/Auth/RegistrationContext";
import { register } from "../../lib/auth/authService";
import { MIN_PASSWORD_LENGTH, validateRegister, type RegisterValues } from "../../lib/auth/validation";

/*
  Parent registration (frontend prototype).
  Parents create the account and choose their child's age group.
  Form state is temporary and in-memory only; nothing is saved or sent anywhere.
  Real account creation belongs in lib/auth/authService.ts.
*/

type Field = keyof RegisterValues;

const INITIAL: RegisterValues = {
  parentName: "",
  email: "",
  password: "",
  confirmPassword: "",
  childName: "",
  ageGroup: "",
  acceptedTerms: false,
};

export default function RegisterPage() {
  const router = useRouter();
  const { setRegistration } = useRegistration();
  const [values, setValues] = useState<RegisterValues>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const errors = validateRegister(values);
  const shown = (f: Field) => (touched[f] ? errors[f] : undefined);

  const set = <K extends Field>(f: K, value: RegisterValues[K]) => {
    setValues((v) => ({ ...v, [f]: value }));
    setFormError("");
  };
  const text = (f: Field) => (e: ChangeEvent<HTMLInputElement>) => set(f, e.target.value as never);
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({
      parentName: true,
      email: true,
      password: true,
      confirmPassword: true,
      ageGroup: true,
      acceptedTerms: true,
    });
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const result = await register({
      parentName: values.parentName.trim(),
      email: values.email.trim(),
      password: values.password,
      childName: values.childName.trim() || undefined,
      ageGroup: values.ageGroup,
    });

    if (result.ok) {
      // Keep only what the welcome screen needs, in memory. Never the password.
      setRegistration({
        parentName: values.parentName.trim(),
        email: values.email.trim(),
        childName: values.childName.trim(),
        ageGroup: values.ageGroup,
      });
      router.push("/welcome");
    } else {
      setFormError(result.message);
      setSubmitting(false);
    }
  }

  const invalidProps = (f: Field, id: string) => ({
    "aria-invalid": shown(f) ? true : undefined,
    "aria-describedby": shown(f) ? `${id}-error` : undefined,
  });

  return (
    <AuthShell
      heading={
        <>
          Start your child&apos;s <span className="text-sun-400">learning adventure</span>
        </>
      }
      blurb="Create a parent account in about a minute. You'll choose your child's age group so activities fit them just right."
      points={[
        "You manage the account, your child just plays",
        "Pick an age group and change it any time",
        "Your child's name is optional",
      ]}
    >
      <span className="ed-chip ed-chip-mint">🌟 Free parent account</span>
      <h2 className="mt-3 text-3xl font-semibold">Create your account</h2>
      <p className="mb-6 mt-1 font-semibold text-ink-soft">Parents and guardians set things up. Children never need to sign up.</p>

      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <FormField id="reg-name" label="Your full name" error={shown("parentName")}>
          <input
            id="reg-name"
            className="ed-input"
            type="text"
            autoComplete="name"
            placeholder="e.g. Alex Morgan"
            value={values.parentName}
            onChange={text("parentName")}
            onBlur={blur("parentName")}
            {...invalidProps("parentName", "reg-name")}
          />
        </FormField>

        <FormField id="reg-email" label="Email address" error={shown("email")}>
          <input
            id="reg-email"
            className="ed-input"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={text("email")}
            onBlur={blur("email")}
            {...invalidProps("email", "reg-email")}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="reg-password"
            label="Password"
            error={shown("password")}
            hint={`At least ${MIN_PASSWORD_LENGTH} characters`}
          >
            <PasswordField
              id="reg-password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={values.password}
              onChange={text("password")}
              onBlur={blur("password")}
              invalid={!!shown("password")}
            />
          </FormField>

          <FormField id="reg-confirm" label="Confirm password" error={shown("confirmPassword")}>
            <PasswordField
              id="reg-confirm"
              autoComplete="new-password"
              placeholder="Repeat password"
              value={values.confirmPassword}
              onChange={text("confirmPassword")}
              onBlur={blur("confirmPassword")}
              invalid={!!shown("confirmPassword")}
            />
          </FormField>
        </div>

        <FormField id="reg-child" label="Child's name" optional hint="A first name or nickname is perfect.">
          <input
            id="reg-child"
            className="ed-input"
            type="text"
            autoComplete="off"
            placeholder="e.g. Sam"
            value={values.childName}
            onChange={text("childName")}
          />
        </FormField>

        <AgeGroupCards
          value={values.ageGroup}
          onChange={(v) => {
            set("ageGroup", v);
            setTouched((t) => ({ ...t, ageGroup: true }));
          }}
          error={shown("ageGroup")}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-3 font-semibold">
            <input
              type="checkbox"
              checked={values.acceptedTerms}
              onChange={(e) => {
                set("acceptedTerms", e.target.checked);
                setTouched((t) => ({ ...t, acceptedTerms: true }));
              }}
              aria-invalid={shown("acceptedTerms") ? true : undefined}
              aria-describedby={shown("acceptedTerms") ? "terms-error" : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 rounded accent-[#6234e0]"
            />
            <span>
              I&apos;m a parent or guardian and I agree to the{" "}
              <span className="font-display font-semibold text-grape-500 underline decoration-dotted">Terms &amp; Conditions</span>{" "}
              and{" "}
              <span className="font-display font-semibold text-grape-500 underline decoration-dotted">Privacy Policy</span>.
            </span>
          </label>
          {shown("acceptedTerms") && (
            <p id="terms-error" role="alert" className="ed-error mt-1.5 text-sm font-bold">
              ⚠ {errors.acceptedTerms}
            </p>
          )}
        </div>

        {formError && (
          <p role="alert" className="ed-error text-sm font-bold">
            ⚠ {formError}
          </p>
        )}

        <button type="submit" className="ed-btn ed-btn-coral ed-btn-lg w-full" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center font-semibold text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-display font-semibold text-grape-500 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
