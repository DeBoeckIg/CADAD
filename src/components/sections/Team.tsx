import { UserRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team, teamIntro } from "@/content/about";

export function Team() {
  return (
    <section id="equipo" aria-labelledby="equipo-title" className="py-16 sm:py-24">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeading id="equipo-title" eyebrow={teamIntro.eyebrow} title={teamIntro.title} />
          <p className="text-lg leading-[1.55] text-graphite">{teamIntro.history}</p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {team.map((member, index) => (
            <Reveal
              as="li"
              key={member.name}
              delay={index * 80}
              className="flex flex-col overflow-hidden rounded-card bg-white shadow-nav"
            >
              <div className="relative flex aspect-square items-center justify-center bg-sky-pale">
                <span aria-hidden="true" className="font-display text-[5.5rem] leading-none font-black text-navy sm:text-[7rem]">
                  {member.letter}
                </span>
                <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-pale-sky text-blue">
                  <UserRound className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Foto pendiente</span>
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold sm:text-lg">
                  <span className="sr-only">Letra {member.letter}: </span>
                  {member.name}
                </h3>
                <p className="mt-1 text-sm leading-snug text-graphite">{member.role}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-steel" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} / 05
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
