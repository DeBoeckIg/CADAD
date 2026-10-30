import { Clock, DatabaseZap, MapPin, Stethoscope, type LucideIcon } from "lucide-react";

export const hero = {
  eyebrow: "Software y soluciones · Tucumán",
  title: "Software con identidad local, hecho en Tucumán.",
  lead: "Diseñamos y desarrollamos software a medida para organizaciones del NOA, con soporte directo y cercano. Nuestro primer producto es VetNet: la gestión integral para clínicas veterinarias.",
  primaryCta: { label: "Hablemos", href: "/#contacto" },
  secondaryCta: { label: "Nuestros Proyectos", href: "/#servicios" },
  video: { src: "/videos/hero-loop.mp4" },
};

export const vetnetShowcase = {
  video: {
    mp4: "/videos/vetnet-demo.mp4",
    webm: "/videos/vetnet-demo.webm",
    label:
      "Video de VetNet en uso: panel de inicio, agenda de turnos y punto de venta agregando productos al carrito.",
  },
  screenshot: {
    src: "/screens/dashboard.webp",
    alt: "Panel de inicio de VetNet con pacientes esperando, próximos turnos y recordatorios de vacunas vencidas.",
  },
};

/** `value` is the rendered (SSR) text; `count` opts numeric stats into a count-up. */
export type TrustItem = {
  icon: LucideIcon;
  value: string;
  label: string;
  count?: { to: number; prefix?: string; suffix?: string };
};

export const trustCaption = "Pensado para la realidad de las clínicas del norte argentino";

export const trustItems: TrustItem[] = [
  {
    icon: Stethoscope,
    value: "~1.500",
    label: "veterinarios activos en el NOA",
    count: { to: 1500, prefix: "~" },
  },
  { icon: Clock, value: "< 12 h", label: "soporte técnico presencial", count: { to: 12, prefix: "< ", suffix: " h" } },
  { icon: DatabaseZap, value: "Migración", label: "asistida y segura de tus datos" },
  { icon: MapPin, value: "Tucumán", label: "base en San Miguel de Tucumán" },
];

export type Chapter = {
  id: "custom" | "vetnet" | "upcoming";
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
  cta?: { label: string; href: string };
  locked?: boolean;
};

export const chaptersIntro = {
  eyebrow: "Qué hacemos",
  title: "Lo que construimos, y lo que viene.",
  lead: "Escuchamos primero, construimos después y nos quedamos cerca cuando el sistema ya está en uso.",
};

export const chapters: Chapter[] = [
  {
    id: "custom",
    kicker: "A medida",
    title: "Software a medida",
    body: "Sistemas web diseñados para tu operación real, no al revés. Relevamos, diseñamos y desarrollamos con vos.",
    bullets: ["Relevamiento de procesos", "Integración con normativa argentina", "Soporte presencial en la región"],
    cta: { label: "Ver cómo trabajamos", href: "/#a-medida" },
  },
  {
    id: "vetnet",
    kicker: "Producto",
    title: "VetNet",
    body: "Gestión integral para clínicas veterinarias y petshops: historia clínica, turnos, ventas, stock y auditoría en un solo lugar.",
    bullets: ["Consultorio y fichas clínicas", "Caja con código de barras", "Multisucursal y roles"],
    cta: { label: "Conocé VetNet", href: "/#vetnet" },
  },
  {
    id: "upcoming",
    kicker: "Próximamente",
    title: "Próximos productos",
    body: "Estamos trabajando en nuevas soluciones para otros rubros de la región. Pronto vas a poder conocerlas.",
    bullets: ["En diseño", "Validación con clientes reales", "Mismo soporte cercano"],
    locked: true,
  },
];

export const beta = {
  eyebrow: "Programa de clínicas beta",
  title: "Sumá tu clínica al piloto de VetNet.",
  body: "Buscamos entre 3 y 5 clínicas del NOA que usen VetNet a costo mínimo a cambio de su feedback.",
  image: { src: "/images/dog-peek.webp", width: 420, height: 538 },
  perks: [
    "Instalación y migración de datos asistida",
    "Capacitación presencial para tu equipo",
    "Línea directa con quienes desarrollan el sistema",
    "Prioridad en las próximas funcionalidades",
  ],
  cta: { label: "Quiero participar", href: "/#contacto" },
};
