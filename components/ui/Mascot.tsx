/** "Eddie" – the friendly Edutastic mascot. Pure SVG, no assets needed. */
export default function Mascot({ size = 160, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className={className}
      role="img"
      aria-label="Eddie, the Edutastic mascot"
    >
      <ellipse cx="80" cy="148" rx="42" ry="7" fill="rgba(0,0,0,0.18)" />
      {/* body */}
      <path d="M80 28c-34 0-56 24-56 56 0 32 22 58 56 58s56-26 56-58c0-32-22-56-56-56z" fill="#ffc83d" stroke="#d99a00" strokeWidth="4" />
      <ellipse cx="80" cy="102" rx="34" ry="30" fill="#fff3c4" />
      {/* ears / tufts */}
      <path d="M38 46l-8-20 24 10z" fill="#ff5fa2" stroke="#c93f7e" strokeWidth="3" strokeLinejoin="round" />
      <path d="M122 46l8-20-24 10z" fill="#ff5fa2" stroke="#c93f7e" strokeWidth="3" strokeLinejoin="round" />
      {/* eyes */}
      <circle cx="62" cy="76" r="15" fill="#fff" stroke="#26106a" strokeWidth="3" />
      <circle cx="98" cy="76" r="15" fill="#fff" stroke="#26106a" strokeWidth="3" />
      <circle cx="65" cy="78" r="7" fill="#26106a" />
      <circle cx="95" cy="78" r="7" fill="#26106a" />
      <circle cx="67" cy="75" r="2.5" fill="#fff" />
      <circle cx="97" cy="75" r="2.5" fill="#fff" />
      {/* beak + smile */}
      <path d="M72 92h16l-8 12z" fill="#ff6b6b" stroke="#c93f3f" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M62 112q18 14 36 0" fill="none" stroke="#26106a" strokeWidth="3.5" strokeLinecap="round" />
      {/* blush */}
      <circle cx="44" cy="98" r="7" fill="#ff5fa2" opacity="0.45" />
      <circle cx="116" cy="98" r="7" fill="#ff5fa2" opacity="0.45" />
      {/* graduation cap */}
      <path d="M80 8l46 18-46 18-46-18z" fill="#4b25b8" stroke="#26106a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M52 36v14q28 14 56 0V36" fill="#6234e0" stroke="#26106a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M126 26v22" stroke="#26106a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="126" cy="52" r="5" fill="#ffc83d" stroke="#d99a00" strokeWidth="2" />
    </svg>
  );
}
