import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "solid" | "ghost";
};

export function CtaButton({ children, className, tone = "solid", ...rest }: Props) {
  return (
    <button
      {...rest}
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-3.5",
        "font-sans text-[0.72rem] uppercase tracking-[0.32em] transition-all duration-500",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        tone === "solid"
          ? "border border-gold/50 bg-gold/10 text-gold hover:border-gold hover:bg-gold/20 hover:shadow-[var(--shadow-gold)]"
          : "border border-border text-muted-foreground hover:border-gold/50 hover:text-gold",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
    </button>
  );
}
