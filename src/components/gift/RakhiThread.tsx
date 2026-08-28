import { useInView } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

/** A hand-drawn rakhi thread that ties itself as it scrolls into view. */
export function RakhiThread({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div ref={ref} className={cn("mx-auto w-full max-w-md", className)} aria-hidden="true">
      <svg viewBox="0 0 400 120" className="w-full overflow-visible">
        <path
          d="M8 60 C 90 10, 140 110, 200 60 C 260 10, 310 110, 392 60"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="640"
          strokeDashoffset={inView ? 0 : 640}
          style={{ transition: "stroke-dashoffset 2.6s var(--ease-cinematic)" }}
        />
        <g
          style={{
            transformOrigin: "200px 60px",
            transition: "opacity 1.2s ease 1.6s, transform 1.6s var(--ease-cinematic) 1.6s",
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1)" : "scale(0.4)",
          }}
        >
          <circle cx="200" cy="60" r="16" fill="color-mix(in oklab, var(--ember) 70%, transparent)" />
          <circle cx="200" cy="60" r="16" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
          <circle cx="200" cy="60" r="6" fill="var(--gold)" />
        </g>
      </svg>
    </div>
  );
}
