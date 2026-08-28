import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Atmosphere } from "@/components/gift/Atmosphere";
import { AudioController } from "@/components/gift/AudioController";
import { ChapterShell } from "@/components/gift/ChapterShell";
import { CtaButton } from "@/components/gift/CtaButton";
import { Envelope } from "@/components/gift/Envelope";
import { MemoryGallery } from "@/components/gift/MemoryGallery";
import { PromiseCard } from "@/components/gift/PromiseCard";
import { RakhiThread } from "@/components/gift/RakhiThread";
import { Reveal } from "@/components/gift/Reveal";
import { ScrollProgress } from "@/components/gift/ScrollProgress";
import { Sequence } from "@/components/gift/Sequence";
import { getSister, site } from "@/data/rakhiData";

export const Route = createFileRoute("/for/$slug")({
  loader: ({ params }) => {
    const sister = getSister(params.slug);
    if (!sister) throw notFound();
    return { sister };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `For ${loaderData.sister.name} — ${site.title}`;
    const description = `A handmade Raksha Bandhan ${site.year} gift written for ${loaderData.sister.nickname}: memories, unsaid things, promises and a letter.`;
    const url = `https://sibling-threads.lovable.app/for/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: SisterNotFound,
  component: SisterJourney,
});

function SisterNotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Atmosphere density={8} />
      <span className="chapter-label">Nothing here</span>
      <h1 className="font-display text-3xl text-ivory">This gift doesn't exist</h1>
      <Link to="/" className="text-sm text-gold underline-offset-8 hover:underline">
        Back to the beginning
      </Link>
    </main>
  );
}

function SisterJourney() {
  const { sister } = Route.useLoaderData();
  const [finale, setFinale] = useState(false);

  return (
    <main className="relative min-h-screen">
      <Atmosphere />
      <ScrollProgress />
      <AudioController />

      {/* Opening */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <Reveal className="flex flex-col items-center gap-5">
          <span className="chapter-label">
            {site.eyebrow} · {site.year}
          </span>
          <span className="font-display text-4xl text-gold">{sister.flower}</span>
          <h1 className="text-balance font-display text-4xl leading-[1.05] text-gradient-gold sm:text-6xl">
            For {sister.nickname}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {sister.name} — scroll slowly. There's no rush, and there's no ending you need to reach.
          </p>
          <div className="hairline mt-4 w-32" />
        </Reveal>
      </section>

      {/* 01 */}
      <ChapterShell id="before" index="01" title="Before you continue">
        <div className="mx-auto max-w-2xl">
          <Sequence lines={sister.before} />
        </div>
      </ChapterShell>

      {/* 02 */}
      <ChapterShell id="special" index="02" title="Why you're special to me">
        <div className="grid gap-4 sm:grid-cols-2">
          {sister.special.map((line, i) => (
            <Reveal key={line + i} delay={(i % 2) * 120}>
              <div className="glass-panel lift h-full rounded-sm px-7 py-8 text-left">
                <span className="chapter-label text-[0.55rem]">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-xl leading-relaxed text-ivory">{line}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-12">
          <p className="mx-auto max-w-2xl text-balance font-display text-2xl leading-relaxed text-gradient-gold sm:text-3xl">
            {sister.specialClosing}
          </p>
        </Reveal>
      </ChapterShell>

      {/* 03 */}
      <ChapterShell id="memories" index="03" title="Our memories" align="left">
        <MemoryGallery memories={sister.memories} />
      </ChapterShell>

      {/* 04 */}
      <ChapterShell id="unsaid" index="04" title="Things I never say out loud">
        <div className="mx-auto max-w-2xl">
          <Sequence lines={sister.unsaidThings} stepMs={1100} />
        </div>
      </ChapterShell>

      {/* 05 */}
      <ChapterShell id="thread" index="05" title="The thread">
        <div className="mx-auto max-w-2xl">
          <RakhiThread />
          <Reveal delay={200}>
            <p className="mt-10 text-balance font-display text-xl leading-relaxed text-ivory/90 sm:text-2xl">
              A rakhi is just thread. It costs almost nothing. That has always been the point — the
              value was never in the object.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Consider this one tied. It doesn't fray, it doesn't fade, and you can come back to it
              whenever you want.
            </p>
          </Reveal>
        </div>
      </ChapterShell>

      {/* 06 */}
      <ChapterShell id="promises" index="06" title="My promises to you">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sister.promises.map((p, i) => (
            <PromiseCard key={p + i} text={p} index={i} />
          ))}
        </div>
      </ChapterShell>

      {/* 07 */}
      <ChapterShell id="letter" index="07" title="A letter, in my own hand">
        <Envelope letter={sister.letter} name={sister.nickname} />
      </ChapterShell>

      {/* 08 */}
      <ChapterShell id="capsule" index="08" title="A time capsule">
        <div className="mx-auto max-w-2xl">
          <Sequence lines={sister.timeCapsule} stepMs={1000} />
          <Reveal delay={300} className="mt-12">
            {!finale ? (
              <CtaButton onClick={() => setFinale(true)}>Read the last line</CtaButton>
            ) : (
              <p className="text-balance font-display text-3xl leading-tight text-gradient-gold animate-fade-up-soft sm:text-4xl">
                You were always loved.
              </p>
            )}
          </Reveal>
        </div>
      </ChapterShell>

      {/* Final */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-5 pb-32 text-center sm:px-8">
        <Reveal className="flex flex-col items-center gap-5">
          <div className="hairline w-32" />
          <p className="font-display text-2xl text-ivory sm:text-3xl">
            Happy Raksha Bandhan, {sister.nickname}.
          </p>
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.36em] text-muted-foreground">
            {site.from}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/three-of-us">
              <CtaButton tone="ghost">The three of us</CtaButton>
            </Link>
            <Link to="/">
              <CtaButton tone="ghost">Back to the start</CtaButton>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
