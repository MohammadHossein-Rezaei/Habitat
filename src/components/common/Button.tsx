import clsx from "clsx";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded text-sm font-medium transition focus:outline-none";
  const variants = {
    primary: "bg-zinc-800 text-white hover:bg-zinc-700",
    secondary: "bg-zinc-200 text-zinc-800 hover:bg-zinc-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(base, variants[variant], className, {
        "opacity-50 cursor-not-allowed": disabled,
      })}
    >
      {children}
    </button>
  );
}
