import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "coral" | "mint" | "sun" | "bolt" | "ghost" | "white";

const variantClass: Record<ButtonVariant, string> = {
  primary: "",
  coral: "ed-btn-coral",
  mint: "ed-btn-mint",
  sun: "ed-btn-sun",
  bolt: "ed-btn-bolt",
  ghost: "ed-btn-ghost",
  white: "ed-btn-white",
};

type Props = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

/** Chunky, press-down button. Renders a Next <Link> when `href` is given. */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...rest
}: Props) {
  const cls = `ed-btn ${variantClass[variant]} ${
    size === "lg" ? "ed-btn-lg" : size === "sm" ? "ed-btn-sm" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
