import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-navy"
    >
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden"
        src={hero.video.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-navy/60" aria-hidden="true" />

      <Container className="py-24 text-center sm:py-32">
        <div className="animate-rise mx-auto max-w-4xl">
          <Chip tone="pale-sky">{hero.eyebrow}</Chip>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.5rem] leading-[1.05] font-black text-white sm:text-6xl lg:text-[4.5rem]"
          >
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.5] text-white/85 sm:text-xl">{hero.lead}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
