import { useState } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** A flip card — tap to turn a sealed promise over and read it. */
export function PromiseCard({ text, index }: { text: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 90}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-pressed={open}
        aria-label={open ? "Hide promise" : `Reveal promise ${index + 1}`}
        className="group relative block h-52 w-full [perspective:1400px] focus-visible:outline-none"
      >
        <div
          className={cn(
            "relative size-full transition-transform duration-[900ms] ease-[var(--ease-cinematic)] [transform-style:preserve-3d]",
            open && "[transform:rotateY(180deg)]",
          )}
        >
          <div className="glass-panel absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-sm [backface-visibility:hidden]">
            <span className="font-display text-4xl text-gold/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="chapter-label text-[0.6rem]">Tap to open</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center rounded-sm border border-gold/40 bg-maroon/70 px-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-balance text-center font-display text-lg leading-relaxed text-ivory sm:text-xl">
              {text}
            </p>
          </div>
        </div>
      </button>
    </Reveal>
  );
}
