import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  title: string;
  children: ReactNode;
  id?: string;
  className?: string;
  align?: "center" | "left";
};

export function ChapterShell({ index, title, children, id, className, align = "center" }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id ?? index}-title`}
      className={cn("relative px-5 py-24 sm:px-8 md:py-36", className)}
    >
      <div className={cn("mx-auto w-full max-w-5xl", align === "center" && "text-center")}>
        <Reveal className={cn("flex flex-col gap-4", align === "center" && "items-center")}>
          <span className="chapter-label">Chapter {index}</span>
          <h2
            id={`${id ?? index}-title`}
            className="max-w-3xl text-balance font-display text-3xl leading-[1.1] text-ivory sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          <div className={cn("hairline w-24", align === "center" && "mx-auto")} />
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
