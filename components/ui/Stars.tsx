type Props = { count: number; total?: number; size?: number; className?: string };

/** Visual star rating (sample data only). */
export default function Stars({ count, total = 3, size = 22, className = "" }: Props) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${count} of ${total} stars`}>
      {Array.from({ length: total }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"
            fill={i < count ? "#ffc83d" : "#d9d0f2"}
            stroke={i < count ? "#d99a00" : "#bdb2e2"}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}
