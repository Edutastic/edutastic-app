type Props = {
  value: number; // 0–100
  tone?: "mint" | "sun" | "coral" | "grape";
  label?: string;
  className?: string;
};

export default function ProgressBar({ value, tone = "mint", label, className = "" }: Props) {
  const v = Math.max(0, Math.min(100, value));
  const toneClass =
    tone === "sun" ? "ed-progress-sun" : tone === "coral" ? "ed-progress-coral" : tone === "grape" ? "ed-progress-grape" : "";
  return (
    <div
      className={`ed-progress ${toneClass} ${className}`}
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <span style={{ width: `${v}%` }} />
    </div>
  );
}
