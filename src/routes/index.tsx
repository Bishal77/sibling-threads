import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "@/components/gift/Atmosphere";
import { AudioController } from "@/components/gift/AudioController";
import { GiftOpening } from "@/components/gift/GiftOpening";
import { RakhiThread } from "@/components/gift/RakhiThread";
import { Reveal } from "@/components/gift/Reveal";
import { ScrollProgress } from "@/components/gift/ScrollProgress";
import { Sequence } from "@/components/gift/Sequence";
import { site, sisters } from "@/data/rakhiData";

const title = `${site.title} — Raksha Bandhan ${site.year}`;
const description =
  "A handmade digital Raksha Bandhan gift for two sisters: eight chapters of memories, unsaid things, promises and a letter.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sibling-threads.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sibling-threads.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.title,
          description,
          url: "https://sibling-threads.lovable.app/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen">
      <Atmosphere intensity="high" />
      {!opened ? <GiftOpening onOpen={() => setOpened(true)} /> : null}
      <ScrollProgress />
      <AudioController />

      <section className="flex min-h-[92vh] flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <Reveal className="flex flex-col items-center gap-6">
          <span className="chapter-label">
            {site.eyebrow} · {site.year}
          </span>
          <h1 className="max-w-4xl text-balance font-display text-4xl leading-[1.05] text-gradient-gold sm:text-6xl md:text-7xl">
            {site.title}
          </h1>
          <RakhiThread className="mt-2" />
          <p className="font-sans text-xs uppercase tracking-[0.36em] text-muted-foreground">
            {site.from}
          </p>
        </Reveal>
      </section>

      <section className="px-5 pb-24 sm:px-8" aria-label="Opening message">
        <div className="mx-auto max-w-2xl text-center">
          <Sequence lines={site.openingMessage} />
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8" aria-labelledby="choose-title">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="flex flex-col items-center gap-4">
            <span className="chapter-label">Two doors</span>
            <h2 id="choose-title" className="font-display text-3xl text-ivory sm:text-4xl">
              Whose gift is this?
            </h2>
            <div className="hairline mx-auto w-24" />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {sisters.map((sister, i) => (
              <Reveal key={sister.slug} delay={i * 140}>
                <Link
                  to="/for/$slug"
                  params={{ slug: sister.slug }}
                  className="lift glass-panel group flex h-full flex-col items-center gap-4 rounded-sm px-8 py-14"
                >
                  <span className="font-display text-4xl text-gold transition-transform duration-700 group-hover:scale-110">
                    {sister.flower}
                  </span>
                  <p className="font-display text-2xl text-ivory sm:text-3xl">{sister.name}</p>
                  <span className="chapter-label text-[0.6rem]">{sister.nickname}</span>
                  <span className="mt-2 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-gold">
                    Open →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280} className="mt-14">
            <Link
              to="/three-of-us"
              className="font-sans text-[0.7rem] uppercase tracking-[0.32em] text-muted-foreground underline-offset-8 transition-colors hover:text-gold hover:underline"
            >
              Or see the three of us together
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
