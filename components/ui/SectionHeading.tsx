import Link from "next/link";

type Props = {
  title: string;
  eyebrow?: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function SectionHeading({ title, eyebrow, actionLabel, actionHref }: Props) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-bubble-500">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      </div>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="font-display font-semibold text-grape-500 hover:underline">
          {actionLabel} →
        </Link>
      )}
    </div>
  );
}
