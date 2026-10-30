import { Clock, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactIntro } from "@/content/contact";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-white py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <SectionHeading id="contacto-title" {...contactIntro} />
          <ul className="mt-10 space-y-6">
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-sky-pale text-blue">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">Email</p>
                <a href={`mailto:${site.email}`} className="text-link break-all">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-sky-pale text-blue">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">Ubicación</p>
                <p className="text-graphite">{site.location} · alcance en todo el NOA</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-sky-pale text-blue">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">Soporte</p>
                <p className="text-graphite">Atención presencial en menos de 12 horas.</p>
              </div>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={100} className="rounded-feature bg-parchment p-2 sm:p-3">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
