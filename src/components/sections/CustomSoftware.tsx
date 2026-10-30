import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { customIntro, processSteps, strengths } from "@/content/custom-software";
import { ProcessStepper } from "./ProcessStepper";

export function CustomSoftware() {
  return (
    <section id="a-medida" aria-labelledby="a-medida-title" className="py-16 sm:py-24">
      <Container>
        <Reveal className="rounded-feature bg-blue px-4 py-12 sm:px-10 lg:px-16 lg:py-16">
          <SectionHeading id="a-medida-title" tone="inverse" {...customIntro} />
          <ProcessStepper steps={processSteps} />
        </Reveal>

        <Reveal className="mt-12">
          <h3 className="sr-only">Por qué trabajar con CADAD</h3>
          <ul className="grid gap-x-8 gap-y-5 border-y border-silver py-8 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-pale text-blue">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-semibold leading-snug text-navy">{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
