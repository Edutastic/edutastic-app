type Props = { symbols?: string[] };

const spots = [
  { top: "8%", left: "6%", size: "2.2rem", cls: "ed-float" },
  { top: "62%", left: "3%", size: "1.8rem", cls: "ed-float-slow" },
  { top: "14%", left: "46%", size: "1.6rem", cls: "ed-twinkle" },
  { top: "74%", left: "52%", size: "2.4rem", cls: "ed-float" },
  { top: "10%", left: "88%", size: "2rem", cls: "ed-float-slow" },
  { top: "70%", left: "92%", size: "1.7rem", cls: "ed-twinkle" },
];

/** Decorative floating shapes for hero sections (aria-hidden). */
export default function Decor({ symbols = ["⭐", "✨", "🌈", "💫", "🎈", "⭐"] }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none overflow-hidden"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      {spots.map((s, i) => (
        <span
          key={i}
          className={`absolute opacity-70 ${s.cls}`}
          style={{ top: s.top, left: s.left, fontSize: s.size, animationDelay: `${i * 0.5}s` }}
        >
          {symbols[i % symbols.length]}
        </span>
      ))}
    </div>
  );
}
