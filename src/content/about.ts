import { FlaskConical, Lock, Puzzle, Users, type LucideIcon } from "lucide-react";

export const aboutIntro = {
  eyebrow: "Nosotros",
  title: "Tecnología con identidad local.",
};

export const logoReveal = {
  mp4: "/videos/cadad-logo.mp4",
  webm: "/videos/cadad-logo.webm",
  poster: "/videos/cadad-logo-poster.webp",
  label: "Logo de CADAD: Software y soluciones, Tucumán",
};

/** `highlight` must be a substring of `text`; it gets an accent underline. */
export type Statement = { kicker: string; label: string; text: string; highlight: string };

export const mission: Statement = {
  kicker: "Hoy",
  label: "Misión",
  text: "Simplificar la gestión veterinaria para que cada profesional dedique su tiempo a cuidar vidas.",
  highlight: "cuidar vidas",
};

export const vision: Statement = {
  kicker: "Mañana",
  label: "Visión",
  text: "Ser el socio tecnológico de las clínicas veterinarias del NOA.",
  highlight: "socio tecnológico",
};

export type Value = { icon: LucideIcon; title: string; body: string };

export const values: Value[] = [
  { icon: Users, title: "Cercanía", body: "Soporte presencial en Tucumán." },
  { icon: Puzzle, title: "Integración", body: "Clínica y comercio en un solo sistema." },
  { icon: FlaskConical, title: "Validación", body: "Probado en clínicas reales." },
  { icon: Lock, title: "Seguridad", body: "Auditoría, roles y respaldos." },
];

export const teamIntro = {
  eyebrow: "Equipo",
  title: "Cinco personas, cinco letras.",
  history:
    "CADAD nació en 2026 en San Miguel de Tucumán, cuando cinco desarrolladores decidimos construir software con identidad local para resolver problemas reales de la región. Nuestro primer producto, VetNet, está hecho para las clínicas veterinarias del NOA y crece junto a ellas.",
};

export type TeamMember = { letter: string; name: string; role: string };

export const team: TeamMember[] = [
  { letter: "C", name: "Desarrollador 1", role: "Rol a definir · Dirección y alianzas" },
  { letter: "A", name: "Desarrollador 2", role: "Rol a definir · Arquitectura y backend" },
  { letter: "D", name: "Desarrollador 3", role: "Rol a definir · Producto y operaciones" },
  { letter: "A", name: "Desarrollador 4", role: "Rol a definir · Frontend y experiencia" },
  { letter: "D", name: "Desarrollador 5", role: "Rol a definir · Calidad y soporte" },
];
