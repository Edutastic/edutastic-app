
import { authClient } from "../auth-client";

// ==========================================
// TYPES
// ==========================================

export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterInput = {
  parentName: string;
  email: string;
  password: string;
};

export type AuthResult =
  | { ok: true }
  | { ok: false; message: string };

// ==========================================
// LOGIN
// ==========================================

export async function login(
  input: LoginInput
): Promise<AuthResult> {
  try {
    const { error } = await authClient.signIn.email({
      email: input.email.trim(),
      password: input.password,
      rememberMe: input.remember,
    });

    if (error) {
      return {
        ok: false,
        message: error.message ?? "Login failed.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Unable to connect. Please try again.",
    };
  }
}

// ==========================================
// REGISTRATION
// ==========================================

export async function register(
  input: RegisterInput
): Promise<AuthResult> {
  try {
    const { error } = await authClient.signUp.email({
      name: input.parentName.trim(),
      email: input.email.trim(),
      password: input.password,
    });

    if (error) {
      return {
        ok: false,
        message: error.message ?? "Registration failed.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Unable to connect. Please try again.",
    };
  }
}
