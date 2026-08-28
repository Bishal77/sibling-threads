import { Link, createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "@/components/gift/Atmosphere";
import { AudioController } from "@/components/gift/AudioController";
import { RakhiThread } from "@/components/gift/RakhiThread";
import { Reveal } from "@/components/gift/Reveal";
import { ScrollProgress } from "@/components/gift/ScrollProgress";
import { Sequence } from "@/components/gift/Sequence";
import { site, threeOfUs } from "@/data/rakhiData";
import { cn } from "@/lib/utils";

const title = `The Three of Us — Raksha Bandhan ${site.year}`;
const description =
  "A family timeline: two sisters, one brother, and the moments between childhood and today.";

export const Route = createFileRoute("/three-of-us")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://sibling-threads.lovable.app/three-of-us" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sibling-threads.lovable.app/three-of-us" }],
  }),
  component: ThreeOfUs,
});

function ThreeOfUs() {
  return (
    <main className="relative min-h-screen">
      <Atmosphere />
      <ScrollProgress />
      <AudioController />

      <section className="px-5 pb-16 pt-28 text-center sm:px-8 md:pt-36">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <span className="chapter-label">Together</span>
          <h1 className="text-balance font-display text-3xl leading-[1.1] text-gradient-gold sm:text-5xl">
            {threeOfUs.heading}
          </h1>
          <RakhiThread />
        </Reveal>
      </section>

      <section className="px-5 sm:px-8" aria-label="Family photo">
        <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-sm border border-border">
          <img
            src={threeOfUs.photo}
            alt="The three of us together"
            loading="lazy"
            decoding="async"
            className="w-full object-cover"
          />
        </Reveal>
      </section>

      <section className="px-5 py-24 sm:px-8 md:py-32" aria-labelledby="timeline-title">
        <div className="mx-auto max-w-4xl">
          <Reveal className="flex flex-col items-center gap-4 text-center">
            <span className="chapter-label">Timeline</span>
            <h2 id="timeline-title" className="font-display text-3xl text-ivory sm:text-4xl">
              How we got here
            </h2>
            <div className="hairline w-24" />
          </Reveal>

          <ol className="relative mt-16 space-y-14 border-l border-gold/20 pl-6 sm:pl-10">
            {threeOfUs.milestones.map((m, i) => (
              <li key={m.era + i}>
                <Reveal
                  delay={(i % 3) * 100}
                  className={cn("relative grid gap-5 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-center")}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.85rem] top-2 size-2.5 rounded-full bg-gold shadow-[0_0_16px_2px_color-mix(in_oklab,var(--gold)_60%,transparent)] sm:-left-[2.9rem]"
                  />
                  <div>
                    <span className="chapter-label text-[0.6rem]">{m.era}</span>
                    <h3 className="mt-2 font-display text-2xl text-ivory">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.caption}</p>
                  </div>
                  <div className="overflow-hidden rounded-sm border border-border">
                    <img
                      src={m.image}
                      alt={m.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-1000 hover:scale-105"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-32 text-center sm:px-8">
        <div className="mx-auto max-w-2xl">
          <Sequence lines={threeOfUs.closing} className="items-center" />
          <Reveal delay={200} className="mt-14">
            <Link
              to="/"
              className="font-sans text-[0.7rem] uppercase tracking-[0.32em] text-muted-foreground underline-offset-8 transition-colors hover:text-gold hover:underline"
            >
              ← Back to the beginning
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
