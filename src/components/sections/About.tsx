import { Container } from "@/components/ui/Container";
import { LogoReveal } from "@/components/ui/LogoReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutIntro, logoReveal, mission, values, vision, type Statement } from "@/content/about";

function Highlighted({ text, highlight }: Pick<Statement, "text" | "highlight">) {
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="underline decoration-marigold decoration-4 underline-offset-[6px] [text-decoration-skip-ink:none]">{highlight}</span>
      {after}
    </>
  );
}

function StatementBlock({ kicker, label, text, highlight }: Statement) {
  return (
    <figure className="flex flex-col gap-4">
      <figcaption className="flex items-baseline gap-3">
        <span className="font-display text-lg italic text-sky-light">{kicker}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{label}</span>
      </figcaption>
      <blockquote className="font-display text-2xl leading-[1.3] font-bold text-white sm:text-3xl">
        <Highlighted text={text} highlight={highlight} />
      </blockquote>
    </figure>
  );
}

export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="bg-white py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <SectionHeading id="nosotros-title" {...aboutIntro} />
          </Reveal>
          <LogoReveal {...logoReveal} className="order-first w-full max-w-sm shrink-0 lg:order-none lg:max-w-md" />
        </div>

        <Reveal className="mt-12 grid gap-10 rounded-feature bg-navy p-8 sm:p-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/15">
          <div className="lg:pr-12">
            <StatementBlock {...mission} />
          </div>
          <div className="lg:pl-12">
            <StatementBlock {...vision} />
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-sky">Nuestros valores</h3>
          </Reveal>
          <ul className="mt-4">
            {values.map(({ icon: Icon, title, body }, index) => (
              <Reveal
                as="li"
                key={title}
                delay={index * 60}
                className="group flex flex-col gap-1 border-b border-silver py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="flex items-center gap-4">
                  <Icon
                    className="h-6 w-6 shrink-0 text-steel transition-colors duration-300 group-hover:text-sky"
                    aria-hidden="true"
                  />
                  <span className="font-display text-3xl font-black text-navy transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl">
                    {title}
                  </span>
                </span>
                <span className="pl-10 text-graphite sm:pl-0 sm:text-right sm:text-lg">{body}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
