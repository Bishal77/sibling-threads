import { useEffect, useState } from "react";
import { site } from "@/data/rakhiData";
import { CtaButton } from "./CtaButton";
import { cn } from "@/lib/utils";

/**
 * The full-screen "unwrap" veil. Shown once per visit; the user chooses to
 * open the gift, so nothing animates or plays without a gesture.
 */
export function GiftOpening({ onOpen }: { onOpen: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  const open = () => {
    setLeaving(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex flex-col items-center justify-center gap-10 bg-ink px-6 text-center transition-all duration-[900ms] ease-[var(--ease-cinematic)]",
        leaving && "pointer-events-none scale-[1.06] opacity-0",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--glow-warm)", opacity: 0.7 }}
      />
      <div
        className={cn(
          "relative flex flex-col items-center gap-6 transition-all duration-[1400ms] ease-[var(--ease-cinematic)]",
          ready ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-sm",
        )}
      >
        <span className="chapter-label">{site.eyebrow} · {site.year}</span>
        <h1 className="text-balance font-display text-4xl leading-[1.05] text-gradient-gold sm:text-6xl md:text-7xl">
          {site.title}
        </h1>
        <div className="hairline w-40" />
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Something made instead of bought. Take your time with it.
        </p>
        <CtaButton onClick={open} className="mt-4">
          Open your gift
        </CtaButton>
      </div>
    </div>
  );
}
