"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { mainNav, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-nav">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="CADAD, ir al inicio" className="rounded-md" onClick={close}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-base text-charcoal transition-colors hover:text-navy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href={site.vetnetDemoUrl} variant="ghost" size="sm">
            Ver VetNet
          </ButtonLink>
          <ButtonLink href="/#contacto" size="sm">
            Hablemos
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="rounded-button p-2 text-navy hover:bg-sky-pale lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-silver bg-white lg:hidden">
        <nav aria-label="Principal móvil" className="mx-auto max-w-[1200px] px-4 pb-6 pt-2 sm:px-6">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block border-b border-silver py-4 text-lg font-medium text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.vetnetDemoUrl} variant="ghost" onClick={close}>
              Ver VetNet
            </ButtonLink>
            <ButtonLink href="/#contacto" onClick={close}>
              Hablemos
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
