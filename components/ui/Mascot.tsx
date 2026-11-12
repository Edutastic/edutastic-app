/** "Felix" – the friendly Edutastic mascot: a fox in a graduation cap. Pure SVG, no assets needed. */
export default function Mascot({ size = 160, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className={className}
      role="img"
      aria-label="Felix the fox, the Edutastic mascot"
    >
      <ellipse cx="80" cy="150" rx="42" ry="6" fill="rgba(0,0,0,0.18)" />

      {/* ears */}
      <path d="M32 70L20 28l40 22z" fill="#ff8a3d" stroke="#c95a12" strokeWidth="4" strokeLinejoin="round" />
      <path d="M128 70l12-42-40 22z" fill="#ff8a3d" stroke="#c95a12" strokeWidth="4" strokeLinejoin="round" />
      <path d="M33 58l-5-18 20 10z" fill="#ff5fa2" />
      <path d="M127 58l5-18-20 10z" fill="#ff5fa2" />

      {/* head */}
      <path
        d="M80 34C50 34 26 56 20 88c10 14 30 44 60 50 30-6 50-36 60-50-6-32-30-54-60-54z"
        fill="#ff8a3d"
        stroke="#c95a12"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* white cheeks + muzzle */}
      <path d="M80 84C62 80 38 90 28 98c14 22 32 36 52 40 20-4 38-18 52-40-10-8-34-18-52-14z" fill="#fff" />

      {/* eyes */}
      <circle cx="58" cy="78" r="8" fill="#26106a" />
      <circle cx="102" cy="78" r="8" fill="#26106a" />
      <circle cx="60.5" cy="75" r="3" fill="#fff" />
      <circle cx="104.5" cy="75" r="3" fill="#fff" />

      {/* nose + smile */}
      <ellipse cx="80" cy="101" rx="8" ry="6" fill="#26106a" />
      <path d="M80 107v6M80 113q-9 9-18 2M80 113q9 9 18 2" fill="none" stroke="#26106a" strokeWidth="3.5" strokeLinecap="round" />

      {/* blush */}
      <circle cx="42" cy="98" r="7" fill="#ff5fa2" opacity="0.4" />
      <circle cx="118" cy="98" r="7" fill="#ff5fa2" opacity="0.4" />

      {/* graduation cap */}
      <path d="M80 6l48 18-48 18-48-18z" fill="#4b25b8" stroke="#26106a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M54 34v14q26 14 52 0V34" fill="#6234e0" stroke="#26106a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M128 24v24" stroke="#26106a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="128" cy="52" r="5" fill="#ffc83d" stroke="#d99a00" strokeWidth="2" />
    </svg>
  );
}
