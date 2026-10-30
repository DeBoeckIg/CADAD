export const site = {
  name: "CADAD",
  tagline: "Software y soluciones · Tucumán",
  description:
    "CADAD desarrolla software a medida con identidad local desde San Miguel de Tucumán. Conocé VetNet, nuestra plataforma de gestión para clínicas veterinarias del NOA.",
  url: "https://cadad.vercel.app",
  email: "grupoadmincadad@gmail.com",
  location: "San Miguel de Tucumán, Argentina",
  vetnetDemoUrl: "https://vetnetmvp.vercel.app/",
  year: 2026,
} as const;

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Servicios", href: "/#servicios" },
  { label: "VetNet", href: "/#vetnet" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Equipo", href: "/#equipo" },
  { label: "FAQ", href: "/#faq" },
];

export const legalNav: NavLink[] = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
];

export const announcement = {
  text: "VetNet está en fase piloto.",
  linkLabel: "Sumate al programa de clínicas beta",
  href: "/#beta",
};
