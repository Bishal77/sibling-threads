import { useState } from "react";
import { cn } from "@/lib/utils";
import { CtaButton } from "./CtaButton";

type Letter = { salutation: string; paragraphs: string[]; signoff: string };

/** A sealed envelope that opens into a handwritten letter. */
export function Envelope({ letter, name }: { letter: Letter; name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-2xl">
      {!open ? (
        <div className="flex flex-col items-center gap-8">
          <div className="glass-panel relative flex aspect-[3/2] w-full max-w-md items-center justify-center overflow-hidden rounded-sm">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1/2 border-b border-gold/30"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", background: "color-mix(in oklab, var(--gold) 8%, transparent)" }}
            />
            <div className="relative flex size-20 items-center justify-center rounded-full border border-gold/50 bg-ember/40 font-display text-2xl text-gold">
              {name.slice(0, 1)}
            </div>
          </div>
          <CtaButton onClick={() => setOpen(true)}>Open the letter</CtaButton>
        </div>
      ) : (
        <article
          className={cn(
            "rounded-sm border border-gold/25 bg-paper px-6 py-10 text-left text-paper-foreground shadow-[var(--shadow-lift)] animate-fade-up-soft sm:px-12 sm:py-14",
          )}
        >
          <p className="font-hand text-2xl text-paper-foreground">{letter.salutation}</p>
          <div className="mt-6 space-y-5">
            {letter.paragraphs.map((p, i) => (
              <p key={i} className="font-hand text-lg leading-[1.9]">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-10 text-right font-hand text-xl">{letter.signoff}</p>
        </article>
      )}
    </div>
  );
}
