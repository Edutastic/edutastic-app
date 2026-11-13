/*
  Form validation for the parent login / registration screens.
  Pure functions with no UI or network code, so they can be reused on the
  server when real authentication is added (always re-validate server-side).
*/

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValues = {
  parentName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

function emailError(email: string): string | undefined {
  const v = email.trim();
  if (!v) return "Please enter your email address.";
  if (!EMAIL_PATTERN.test(v)) return "That doesn't look like a valid email address.";
  return undefined;
}

export function validateLogin(values: LoginValues): FieldErrors<LoginValues> {
  const errors: FieldErrors<LoginValues> = {};
  const email = emailError(values.email);
  if (email) errors.email = email;
  if (!values.password) errors.password = "Please enter your password.";
  return errors;
}

export function validateRegister(values: RegisterValues): FieldErrors<RegisterValues> {
  const errors: FieldErrors<RegisterValues> = {};

  if (!values.parentName.trim()) {
    errors.parentName = "Please enter your full name.";
  } else if (values.parentName.trim().length > 100) {
    errors.parentName = "Your name is too long.";
  }

  const email = emailError(values.email);
  if (email) errors.email = email;

  if (!values.password) {
    errors.password = "Please choose a password.";
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  } else if (values.password.length > MAX_PASSWORD_LENGTH) {
    errors.password = `Use no more than ${MAX_PASSWORD_LENGTH} characters.`;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "The passwords don't match.";
  }

  if (!values.acceptedTerms) errors.acceptedTerms = "Please accept the terms and conditions to continue.";

  return errors;
}
