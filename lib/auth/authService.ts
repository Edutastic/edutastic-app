/*
  PROTOTYPE AUTH SERVICE – NOT REAL AUTHENTICATION.

  The login and registration pages only talk to this file. Today every call
  succeeds after a short fake delay and nothing is stored or sent anywhere.

  To add real authentication later, replace the bodies of login() and
  register() with calls to your auth provider / API (and set a session
  cookie on the server). The pages and their form state need no changes as
  long as these functions keep returning an AuthResult.
*/

export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterInput = {
  parentName: string;
  email: string;
  password: string;
  childName?: string;
  ageGroup: string;
};

export type AuthResult = { ok: true } | { ok: false; message: string };

const FAKE_NETWORK_DELAY_MS = 700;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(input: LoginInput): Promise<AuthResult> {
  void input; // TODO: send to the real auth API
  await wait(FAKE_NETWORK_DELAY_MS);
  return { ok: true };
}

export async function register(input: RegisterInput): Promise<AuthResult> {
  void input; // TODO: create the parent account + child profile via the real API
  await wait(FAKE_NETWORK_DELAY_MS);
  return { ok: true };
}
