export type FaqItem = { question: string; answer: string };

export const faqIntro = {
  eyebrow: "Preguntas frecuentes",
  title: "Lo que nos suelen preguntar.",
};

export const faqItems: FaqItem[] = [
  {
    question: "¿Qué es VetNet?",
    answer:
      "VetNet es un sistema de gestión integral para clínicas veterinarias y petshops. Reúne historias clínicas, turnos, plan de vacunación, punto de venta, inventario, reportes y auditoría en una sola plataforma web.",
  },
  {
    question: "¿Ya está disponible?",
    answer:
      "VetNet está en desarrollo activo y se está validando con clínicas piloto de la región. Si querés usarlo en tu clínica, podés sumarte al programa beta o solicitar una demo.",
  },
  {
    question: "¿Sirve para varias sucursales?",
    answer:
      "Sí. VetNet está pensado para operar con varias sucursales: stock global, transferencias de productos entre locales y reportes unificados para el dueño.",
  },
  {
    question: "¿Se puede migrar la información que ya tengo?",
    answer:
      "Sí. Desarrollamos scripts de migración específicos para que no pierdas tu historial, ya sea que vengas de otro sistema o de planillas sueltas. Ordenamos y cargamos los datos por vos.",
  },
  {
    question: "¿Cómo se controla el acceso?",
    answer:
      "Con roles y permisos granulares: por ejemplo, un peluquero canino puede ver solo la agenda del día, sin acceso a facturación ni historias clínicas. Además, cada acción queda registrada en un log de auditoría inmutable con usuario, fecha y origen.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Todavía no publicamos precios. En la demo analizamos el tamaño de tu clínica y la cantidad de sucursales para asesorarte con una propuesta a medida.",
  },
  {
    question: "¿Dónde está CADAD?",
    answer:
      "Estamos en San Miguel de Tucumán, Argentina, y trabajamos con clientes de todo el NOA.",
  },
  {
    question: "¿Hacen software a medida para otros rubros?",
    answer:
      "Sí. Además de VetNet, desarrollamos sistemas a medida para organizaciones de distintos rubros. Empezamos con un relevamiento para entender tu operación y te proponemos un plan por etapas.",
  },
  {
    question: "¿Cómo es el soporte?",
    answer:
      "Directo y cercano: soporte remoto para el día a día y atención presencial en menos de 12 horas desde San Miguel de Tucumán. También hacemos visitas programadas para relevar mejoras.",
  },
];
