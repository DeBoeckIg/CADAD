import {
  BarChart3,
  Building2,
  CalendarClock,
  ClipboardList,
  FileWarning,
  HeartHandshake,
  Layers,
  PackageSearch,
  Receipt,
  ShieldCheck,
  Sparkles,
  Sprout,
  TimerReset,
  UserX,
  type LucideIcon,
} from "lucide-react";

export const vetnetIntro = {
  eyebrow: "VetNet · nuestro primer producto",
  title: "Tu clínica, organizada de principio a fin.",
  lead: "VetNet une el consultorio y el mostrador en un solo sistema: fichas clínicas, turnos, vacunas, ventas, stock y auditoría, pensado con veterinarios del NOA.",
  status: "En fase piloto con clínicas de la región",
};

export type Problem = { icon: LucideIcon; text: string };

export const problemsTitle = "¿Te suena alguno de estos problemas?";

export const problems: Problem[] = [
  { icon: Layers, text: "Fichas de pacientes repartidas en planillas distintas." },
  { icon: CalendarClock, text: "Turnos en papel o en chats, con superposiciones." },
  { icon: Receipt, text: "Cerrar la caja juntando tickets al final del día." },
  { icon: PackageSearch, text: "No saber cuánto stock queda hasta que se agota." },
  { icon: UserX, text: "Sin registro de quién modifica información sensible." },
  { icon: FileWarning, text: "Miedo a perder el historial al cambiar de sistema." },
];

export type FeatureTab = {
  id: string;
  number: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  /** Short looping clip of the module in use; the screenshot doubles as its poster. */
  video: { mp4: string; webm: string; label: string };
  screenshot: { src: string; alt: string };
};

export const featuresTitle = "Todo lo que pasa en la clínica, en cuatro módulos.";

export const featureTabs: FeatureTab[] = [
  {
    id: "clinica",
    number: "01",
    label: "Historias clínicas y pacientes",
    title: "Consultorio con la ficha completa a mano",
    body: "Cola de consultorio, ficha del paciente con su dueño, línea de tiempo clínica y consulta guiada con signos vitales, síntomas, diagnóstico y tratamiento.",
    points: ["Ficha por paciente y dueño", "Timeline clínico", "Antecedentes y alergias visibles"],
    video: {
      mp4: "/videos/tab-consultorio.mp4",
      webm: "/videos/tab-consultorio.webm",
      label: "Video de VetNet: se abre la consulta de Rocco y se cargan motivo, signos vitales y diagnóstico.",
    },
    screenshot: {
      src: "/screens/consultorio.webp",
      alt: "Pantalla de consulta de VetNet con datos del paciente Rocco, signos vitales, síntomas, diagnóstico y antecedentes.",
    },
  },
  {
    id: "agenda",
    number: "02",
    label: "Agenda, turnos y vacunas",
    title: "Turnos con estados y sin superposiciones",
    body: "Agenda del día, turnos programados por veterinario con estados (pendiente, confirmado, finalizado, cancelado) y plan de vacunación con recordatorios de vencimiento.",
    points: ["Estados de turno", "Pase directo a la cola", "Plan de vacunación"],
    video: {
      mp4: "/videos/tab-turnos.mp4",
      webm: "/videos/tab-turnos.webm",
      label: "Video de VetNet: turnos filtrados por estado y carga de un nuevo turno para Luna.",
    },
    screenshot: {
      src: "/screens/turnos.webp",
      alt: "Listado de turnos programados en VetNet con paciente, dueño, motivo, veterinario y estado.",
    },
  },
  {
    id: "ventas",
    number: "03",
    label: "Ventas, stock e inventario",
    title: "Caja rápida y stock inteligente",
    body: "Punto de venta con lector de código de barras y distintos medios de pago. Inventario con mínimos, alertas de stock bajo y control de fechas de vencimiento.",
    points: ["Lector de código de barras", "Alertas de vencimiento", "Stock mínimo por producto"],
    video: {
      mp4: "/videos/tab-venta.mp4",
      webm: "/videos/tab-venta.webm",
      label: "Video de VetNet: punto de venta buscando productos, agregándolos al carrito y eligiendo pago con débito.",
    },
    screenshot: {
      src: "/screens/punto-de-venta.webp",
      alt: "Punto de venta de VetNet con carrito de tres productos, total y medios de pago.",
    },
  },
  {
    id: "control",
    number: "04",
    label: "Multisucursal, seguridad y reportes",
    title: "Control total, en una o varias sucursales",
    body: "Stock global y transferencias entre sucursales, reportes unificados, roles con permisos granulares y un registro de auditoría que no se puede editar ni borrar.",
    points: ["Sucursales Centro y Norte", "Roles y permisos", "Auditoría inmutable"],
    video: {
      mp4: "/videos/tab-auditoria.mp4",
      webm: "/videos/tab-auditoria.webm",
      label: "Video de VetNet: usuarios y roles en Configuración y registro de auditoría filtrado por usuario.",
    },
    screenshot: {
      src: "/screens/auditoria.webp",
      alt: "Registro de auditoría de VetNet con fecha, usuario, rol, módulo y acción de cada evento.",
    },
  },
];

export type Benefit = { icon: LucideIcon; title: string; body: string };

export const benefitsTitle = "Lo que gana tu clínica";

export const benefits: Benefit[] = [
  { icon: ClipboardList, title: "Organización", body: "Cada paciente, turno y venta en su lugar, accesible en segundos." },
  { icon: TimerReset, title: "Ahorro de tiempo", body: "Menos carga manual en recepción y cierres de caja sin planillas." },
  { icon: Layers, title: "Información centralizada", body: "Consultorio y mostrador comparten los mismos datos." },
  { icon: HeartHandshake, title: "Mejor atención", body: "El historial completo a mano en cada consulta." },
  { icon: BarChart3, title: "Control administrativo", body: "Reportes de ventas, consultas y stock para decidir mejor." },
  { icon: ShieldCheck, title: "Seguridad y trazabilidad", body: "Roles, auditoría inmutable y respaldos en la nube." },
  { icon: Building2, title: "Crecimiento ordenado", body: "Sumá sucursales sin perder el control global." },
];

export const roadmap = {
  label: "En desarrollo",
  icon: Sparkles,
  items: ["Recetario aprobado por SENASA", "Notificaciones", "Módulo de WhatsApp", "Stock inteligente"],
};

export const pilotNote = {
  icon: Sprout,
  text: "VetNet está en desarrollo activo junto a clínicas piloto. Podés recorrer la demo con datos de prueba.",
};
