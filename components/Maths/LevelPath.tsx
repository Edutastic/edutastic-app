import Link from "next/link";
import Stars from "../ui/Stars";
import type { NodeState, Tint } from "../../lib/sampleData";

type Node = { n: number; state: NodeState; stars: number };
type Props = { title: string; name: string; emoji: string; tint: Tint; nodes: Node[] };

const W = 300;
const STEP = 124;
const R = 39;

function xAt(i: number) {
  return Math.round(W / 2 + 88 * Math.sin(i * 1.15));
}
const yAt = (i: number) => i * STEP + 70;

/** One stage of the winding level path. Purely visual sample data. */
export default function LevelPath({ title, name, emoji, tint, nodes }: Props) {
  const height = nodes.length * STEP + 50;

  // Build a smooth winding path through the nodes.
  let d = `M ${xAt(0)} ${yAt(0)}`;
  for (let i = 1; i < nodes.length; i++) {
    const y0 = yAt(i - 1);
    const y1 = yAt(i);
    d += ` C ${xAt(i - 1)} ${y0 + 60}, ${xAt(i)} ${y1 - 60}, ${xAt(i)} ${y1}`;
  }

  // Part of the path that is "completed" (up to the current/last done node)
  const reached = nodes.reduce((acc, nd, i) => (nd.state === "done" || nd.state === "current" ? i : acc), 0);
  let dDone = `M ${xAt(0)} ${yAt(0)}`;
  for (let i = 1; i <= reached; i++) {
    const y0 = yAt(i - 1);
    const y1 = yAt(i);
    dDone += ` C ${xAt(i - 1)} ${y0 + 60}, ${xAt(i)} ${y1 - 60}, ${xAt(i)} ${y1}`;
  }

  return (
    <section className="space-y-4">
      <div className={`ed-tint ed-tint-${tint} flex items-center gap-4 px-5 py-4`}>
        <span className="text-5xl">{emoji}</span>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-widest opacity-70">{title}</p>
          <h2 className="text-2xl font-semibold sm:text-3xl">{name}</h2>
        </div>
      </div>

      <div className="relative mx-auto" style={{ width: W, height }}>
        <svg width={W} height={height} className="absolute inset-0" aria-hidden="true">
          <path d={d} fill="none" stroke="var(--line)" strokeWidth="14" strokeLinecap="round" strokeDasharray="2 22" />
          <path d={dDone} fill="none" stroke="#2fd6a0" strokeWidth="14" strokeLinecap="round" strokeDasharray="2 22" />
        </svg>

        {nodes.map((nd, i) => {
          const left = xAt(i) - R;
          const top = yAt(i) - R;
          const locked = nd.state === "locked";
          const cls = `ed-node ed-node-${nd.state}`;
          const content = nd.state === "locked" ? "🔒" : nd.state === "done" ? "✓" : nd.n;
          return (
            <div key={nd.n}>
              {locked ? (
                <span className={cls} style={{ left, top }} aria-disabled="true" aria-label={`Level ${nd.n} (locked)`}>
                  {content}
                </span>
              ) : (
                <Link href="/game" className={cls} style={{ left, top }} aria-label={`Level ${nd.n}`}>
                  {content}
                </Link>
              )}
              {nd.state === "current" && (
                <span
                  className="ed-chip ed-chip-coral ed-float absolute whitespace-nowrap"
                  style={{ left: xAt(i) - 34, top: top - 40 }}
                >
                  START!
                </span>
              )}
              {nd.state === "done" && (
                <span className="absolute" style={{ left: xAt(i) - 36, top: top + 84 }}>
                  <Stars count={nd.stars} size={24} />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
