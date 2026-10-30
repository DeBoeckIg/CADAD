import Link from "next/link";
import { ArrowRight, Check, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { chapters, chaptersIntro, type Chapter } from "@/content/home";

const chapterStyles: Record<Chapter["id"], { surface: string; kicker: string; check: string }> = {
  custom: { surface: "bg-blue", kicker: "text-sky-light", check: "text-sky" },
  vetnet: { surface: "bg-forest", kicker: "text-peach", check: "text-moss" },
  upcoming: { surface: "bg-onyx", kicker: "text-steel", check: "text-steel" },
};

function ChapterCard({ chapter }: { chapter: Chapter }) {
  const style = chapterStyles[chapter.id];
  return (
    <article
      className={`flex w-full flex-col rounded-feature p-6 text-white sm:p-8 ${style.surface} ${chapter.locked ? "relative overflow-hidden" : ""}`}
    >
      <p className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] ${style.kicker}`}>
        {chapter.locked && <Lock className="h-3.5 w-3.5" aria-hidden="true" />}
        {chapter.kicker}
      </p>
      <h3 className={`mt-4 font-display text-3xl font-bold !text-white ${chapter.locked ? "opacity-80" : ""}`}>
        {chapter.title}
      </h3>
      <p className={`mt-3 leading-relaxed ${chapter.locked ? "text-white/60" : "text-white/85"}`}>{chapter.body}</p>

      <div className={`mt-8 flex-1 rounded-card p-5 ${chapter.locked ? "bg-white/5" : "bg-white"}`}>
        {chapter.locked ? (
          <div aria-hidden="true" className="space-y-3">
            {[80, 64, 72].map((width) => (
              <div key={width} className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-white/10" />
                <span className="h-3 rounded-full bg-white/10" style={{ width: `${width}%` }} />
              </div>
            ))}
            <p className="pt-2 text-sm text-steel">Nombres y detalles reservados.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {chapter.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-charcoal">
                <Check className={`mt-0.5 h-5 w-5 shrink-0 ${style.check}`} aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {chapter.cta && (
        <Link
          href={chapter.cta.href}
          className="mt-6 inline-flex items-center gap-2 self-start rounded-button font-semibold text-white underline-offset-4 hover:underline"
        >
          {chapter.cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}

export function WhatWeDo() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading id="servicios-title" {...chaptersIntro} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {chapters.map((chapter, index) => (
            <Reveal key={chapter.id} delay={index * 100} className="flex">
              <ChapterCard chapter={chapter} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
