/** Pages that render full-screen without the main navigation and footer. */
const CHROMELESS_PREFIXES = ["/game", "/login", "/register", "/welcome"];

export function isChromeless(pathname: string): boolean {
  return CHROMELESS_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}
