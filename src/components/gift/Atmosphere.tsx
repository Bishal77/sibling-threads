import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reveal";

type Props = { density?: number; intensity?: "low" | "high" };

/**
 * Fixed cinematic backdrop: warm glow, light rays, drifting embers and grain.
 * Purely decorative — hidden from assistive tech, disabled under reduced motion.
 */
export function Atmosphere({ density = 18, intensity = "low" }: Props) {
  const reduced = usePrefersReducedMotion();

  const embers = useMemo(
    () =>
      Array.from({ length: density }, (_, i) => ({
        id: i,
        left: (i * 37 + 11) % 100,
        size: 1 + ((i * 13) % 5) * 0.7,
        duration: 26 + ((i * 7) % 22),
        delay: -((i * 5) % 30),
        drift: ((i % 5) - 2) * 26,
        opacity: 0.28 + ((i % 4) * 0.13),
      })),
    [density],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden grain">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{ background: "var(--glow-warm)", opacity: intensity === "high" ? 1 : 0.72 }}
      />
      <div
        className="absolute left-1/2 top-[-30vh] h-[90vh] w-[120vw] -translate-x-1/2"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 0%, transparent 0deg, color-mix(in oklab, var(--gold) 9%, transparent) 25deg, transparent 50deg, color-mix(in oklab, var(--ember) 7%, transparent) 78deg, transparent 105deg)",
          filter: "blur(28px)",
          animation: reduced ? undefined : "glowPulse 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[60vh]"
        style={{ background: "var(--gradient-veil)" }}
      />
      {!reduced &&
        embers.map((e) => (
          <span
            key={e.id}
            className="absolute bottom-[-6vh] rounded-full bg-gold"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              ["--drift" as string]: `${e.drift}px`,
              ["--ember-opacity" as string]: e.opacity,
              boxShadow: "0 0 8px 1px color-mix(in oklab, var(--gold) 60%, transparent)",
              animation: `emberFloat ${e.duration}s linear ${e.delay}s infinite`,
            }}
          />
        ))}
    </div>
  );
}
