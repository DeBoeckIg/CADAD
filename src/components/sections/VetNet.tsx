import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { ProductVideoFrame } from "@/components/ui/ProductVideoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { vetnetShowcase } from "@/content/home";
import { site } from "@/content/site";
import {
  benefits,
  benefitsTitle,
  featureTabs,
  featuresTitle,
  pilotNote,
  problems,
  problemsTitle,
  roadmap,
  vetnetIntro,
} from "@/content/vetnet";
import { BetaProgram } from "./BetaProgram";
import { TrustBar } from "./TrustBar";
import { VetNetFeatures } from "./VetNetFeatures";

function Problems() {
  return (
    <div className="mt-16">
      <Reveal>
        <h3 className="text-2xl font-semibold tracking-[0.01em]">{problemsTitle}</h3>
      </Reveal>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map(({ icon: Icon, text }, index) => (
          <Reveal as="li" key={text} delay={(index % 3) * 80} className="flex items-start gap-4 rounded-card bg-white p-6 shadow-nav">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-button bg-peach/40 text-[#7a2a0c]">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="pt-1.5 leading-snug text-charcoal">{text}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

function Benefits() {
  return (
    <div className="mt-24">
      <Reveal>
        <h3 className="font-display text-3xl font-black sm:text-4xl">{benefitsTitle}</h3>
      </Reveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, body }, index) => (
          <Reveal as="li" key={title} delay={index * 80} className="rounded-card border border-silver bg-white p-6">
            <Icon className="h-6 w-6 text-forest" aria-hidden="true" />
            <h4 className="mt-4 text-lg font-semibold text-navy">{title}</h4>
            <p className="mt-2 text-[15px] leading-relaxed text-graphite">{body}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

function Roadmap() {
  const RoadmapIcon = roadmap.icon;
  const PilotIcon = pilotNote.icon;
  return (
    <div className="mt-12 flex flex-col gap-6 rounded-feature bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-forest">
          <RoadmapIcon className="h-4 w-4" aria-hidden="true" />
          {roadmap.label}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {roadmap.items.map((item, index) => (
            <li key={item}>
              <Chip tone={index === 0 ? "marigold" : "pale-sky"}>{item}</Chip>
            </li>
          ))}
        </ul>
      </div>
      <p className="flex max-w-md items-start gap-3 text-sm leading-relaxed text-graphite">
        <PilotIcon className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
        {pilotNote.text}
      </p>
    </div>
  );
}

export function VetNet() {
  return (
    <section id="vetnet" aria-labelledby="vetnet-title" className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading id="vetnet-title" eyebrow={vetnetIntro.eyebrow} title={vetnetIntro.title} lead={vetnetIntro.lead} />
          </Reveal>
          <div className="flex shrink-0 flex-col items-start gap-3">
            <Chip tone="marigold">{vetnetIntro.status}</Chip>
            <ButtonLink href={site.vetnetDemoUrl} variant="ghost">
              Probar la demo
            </ButtonLink>
          </div>
        </div>

        <Reveal className="mt-12">
          <ProductVideoFrame
            mp4={vetnetShowcase.video.mp4}
            webm={vetnetShowcase.video.webm}
            poster={vetnetShowcase.screenshot.src}
            label={vetnetShowcase.video.label}
          />
        </Reveal>
        <TrustBar />

        <Problems />

        <div className="mt-24">
          <Reveal>
            <h3 className="mb-10 max-w-2xl font-display text-3xl font-black sm:text-4xl">{featuresTitle}</h3>
          </Reveal>
          <VetNetFeatures tabs={featureTabs} />
        </div>

        <Benefits />
        <BetaProgram />
        <Roadmap />
      </Container>
    </section>
  );
}
