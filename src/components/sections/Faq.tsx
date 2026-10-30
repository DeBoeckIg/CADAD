import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqIntro, faqItems } from "@/content/faq";
import { FaqAccordion } from "./FaqAccordion";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <SectionHeading id="faq-title" {...faqIntro} />
        </Reveal>
        <Reveal delay={100}>
          <FaqAccordion items={faqItems} />
        </Reveal>
      </Container>
    </section>
  );
}
