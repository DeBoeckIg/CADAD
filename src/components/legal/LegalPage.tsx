import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { provisionalNotice, type LegalDocument } from "@/content/legal";
import { site } from "@/content/site";

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <SiteShell>
      <Container className="py-16 sm:py-24">
        <article className="mx-auto max-w-3xl">
          <Link href="/" className="text-link inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al inicio
          </Link>
          <h1 className="mt-6 font-display text-4xl leading-[1.1] font-black sm:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-sm text-graphite">
            Última actualización: <time dateTime="2026-10-29">{doc.updatedAt}</time>
          </p>

          <div role="note" className="mt-8 flex items-start gap-3 rounded-card bg-marigold/25 p-4 text-sm leading-relaxed text-onyx ring-1 ring-marigold">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#8a5a00]" aria-hidden="true" />
            <p>{provisionalNotice}</p>
          </div>

          <div className="mt-10 rounded-feature bg-white p-6 shadow-nav sm:p-10">
            <p className="text-lg leading-relaxed text-charcoal">{doc.intro}</p>
            {doc.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-charcoal">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-charcoal marker:text-sky">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className="mt-12 border-t border-silver pt-6 text-sm text-graphite">
              ¿Dudas? Escribinos a{" "}
              <a href={`mailto:${site.email}`} className="text-link break-all">
                {site.email}
              </a>
              .
            </p>
          </div>
        </article>
      </Container>
    </SiteShell>
  );
}
