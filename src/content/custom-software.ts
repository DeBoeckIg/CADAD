import { Handshake, MapPinned, Scale, ShieldCheck, type LucideIcon } from "lucide-react";

export const customIntro = {
  eyebrow: "Software a medida",
  title: "Construimos el sistema que tu operación necesita.",
  lead: "Resolvemos problemas concretos, por etapas cortas y con entregas visibles.",
};

export type ProcessStep = { title: string; body: string };

export const processSteps: ProcessStep[] = [
  { title: "Relevamiento", body: "Visitamos tu organización y detectamos dónde se pierde tiempo." },
  { title: "Diseño", body: "Validás prototipos antes de escribir una línea de código." },
  { title: "Desarrollo", body: "Entregas cortas, demos frecuentes y pruebas automatizadas." },
  { title: "Implementación", body: "Migramos tus datos, capacitamos al equipo y seguimos cerca." },
];

export type Strength = { icon: LucideIcon; text: string };

export const strengths: Strength[] = [
  { icon: MapPinned, text: "Soporte presencial en menos de 12 h" },
  { icon: Scale, text: "Normativa argentina integrada" },
  { icon: ShieldCheck, text: "Logs inmutables y roles granulares" },
  { icon: Handshake, text: "Migración y capacitación incluidas" },
];
