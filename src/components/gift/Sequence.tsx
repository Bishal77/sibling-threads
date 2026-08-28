import { useInView, useSequence } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stepMs?: number;
};

/** Reveals lines one after another, like a letter being read aloud. */
export function Sequence({ lines, className, lineClassName, stepMs = 850 }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const visible = useSequence(lines.length, inView, stepMs);

  return (
    <div ref={ref} className={cn("flex flex-col gap-5", className)}>
      {lines.map((line, i) => (
        <p
          key={line + i}
          className={cn(
            "font-display text-xl leading-relaxed text-ivory/90 transition-all duration-1000 ease-[var(--ease-cinematic)] sm:text-2xl md:text-[1.7rem]",
            i < visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[3px]",
            lineClassName,
          )}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
