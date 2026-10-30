import type { ReactNode } from "react";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Shared page chrome: skip link, banner, sticky nav, main landmark and footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-navy focus:px-4 focus:py-3 focus:text-white"
      >
        Saltar al contenido
      </a>
      <AnnouncementBanner />
      <SiteHeader />
      <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
