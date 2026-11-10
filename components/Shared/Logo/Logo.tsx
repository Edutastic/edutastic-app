import Link from "next/link";

type Props = { light?: boolean; size?: "sm" | "md" | "lg" };

/** Edutastic logo: a smiling star-badge plus a multicolour wordmark. */
export default function Logo({ light = false, size = "md" }: Props) {
  const badge = size === "lg" ? 56 : size === "sm" ? 34 : 44;
  const text = size === "lg" ? "text-4xl" : size === "sm" ? "text-xl" : "text-2xl";
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 no-underline" aria-label="Edutastic home">
      <svg width={badge} height={badge} viewBox="0 0 48 48" aria-hidden="true" className="ed-wiggle">
        <path
          d="M24 3l5.6 11.6 12.7 1.7-9.3 8.8 2.4 12.6L24 31.5 12.6 37.7 15 25.1 5.7 16.3l12.7-1.7z"
          fill="#ffc83d"
          stroke="#d99a00"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="22" r="2.2" fill="#26106a" />
        <circle cx="29" cy="22" r="2.2" fill="#26106a" />
        <path d="M18.5 27.5q5.5 5 11 0" fill="none" stroke="#26106a" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className={`font-display font-bold leading-none ${text}`} style={{ color: light ? "#fff" : undefined }}>
        <span style={{ color: light ? "#fff" : "#6234e0" }}>Edu</span>
        <span style={{ color: "#ff5fa2" }}>tas</span>
        <span style={{ color: light ? "#ffc83d" : "#2f8bff" }}>tic</span>
      </span>
    </Link>
  );
}
