import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { legalNav, mainNav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white/80">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="inverse" showTagline />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            Tecnología con identidad local para organizaciones del NOA. Creadores de VetNet.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] !text-sky-light">Sitio</h2>
          <ul className="space-y-3 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] !text-sky-light">Contacto</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-light" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white hover:underline">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-light" aria-hidden="true" />
              <span>{site.location}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.year} CADAD. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
