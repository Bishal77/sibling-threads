import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Memory } from "@/data/rakhiData";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const shapeClass: Record<NonNullable<Memory["shape"]>, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

export function MemoryGallery({ memories }: { memories: Memory[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex === null ? null : memories[openIndex];

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + memories.length) % memories.length)),
    [memories.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, close, step]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {memories.map((memory, i) => (
          <Reveal key={memory.title + i} delay={(i % 3) * 120} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="lift group block w-full overflow-hidden rounded-sm border border-border bg-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Open memory: ${memory.title}`}
            >
              <div className={cn("relative overflow-hidden", shapeClass[memory.shape ?? "square"])}>
                <img
                  src={memory.image}
                  alt={memory.title}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cinematic)] group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80"
                />
              </div>
              <div className="space-y-1 px-4 py-4">
                <span className="chapter-label text-[0.6rem]">{memory.date}</span>
                <p className="font-display text-xl text-ivory">{memory.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{memory.caption}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 px-4 py-8 backdrop-blur-xl animate-fade-up-soft"
          onClick={close}
        >
          <div
            className="relative flex max-h-full w-full max-w-4xl flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image}
              alt={active.title}
              className="max-h-[62vh] w-full rounded-sm object-contain"
            />
            <div className="text-center">
              <span className="chapter-label text-[0.6rem]">{active.date}</span>
              <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">{active.title}</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {active.caption}
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous memory"
                className="glass-panel flex size-11 items-center justify-center rounded-full text-gold"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="font-sans text-xs tracking-[0.3em] text-muted-foreground">
                {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(memories.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next memory"
                className="glass-panel flex size-11 items-center justify-center rounded-full text-gold"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close memory"
              autoFocus
              className="glass-panel absolute -top-2 right-0 flex size-11 items-center justify-center rounded-full text-ivory sm:-right-2"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
