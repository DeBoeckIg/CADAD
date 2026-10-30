export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
};

export const provisionalNotice =
  "Texto provisorio: este documento es un borrador informativo mientras VetNet se encuentra en fase piloto. Puede cambiar antes del lanzamiento comercial y no reemplaza el asesoramiento legal profesional.";

const UPDATED_AT = "29 de octubre de 2026";
const CONTACT = "grupoadmincadad@gmail.com";

export const terms: LegalDocument = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio de CADAD y del programa piloto de VetNet.",
  updatedAt: UPDATED_AT,
  intro:
    "Estos términos regulan el uso del sitio web de CADAD y, en lo que corresponda, la participación en el programa piloto de VetNet. Al navegar el sitio o utilizar nuestros servicios aceptás estas condiciones.",
  sections: [
    {
      heading: "1. Quiénes somos",
      paragraphs: [
        "CADAD es un equipo de desarrollo de software con domicilio en San Miguel de Tucumán, Provincia de Tucumán, República Argentina. Desarrollamos software a medida y productos propios, entre ellos VetNet, un sistema de gestión para clínicas veterinarias y petshops.",
      ],
    },
    {
      heading: "2. Uso del sitio",
      paragraphs: [
        "El contenido de este sitio tiene fines informativos. Podés navegarlo libremente siempre que no lo utilices para actividades ilícitas, no intentes vulnerar su seguridad ni interfieras con su funcionamiento.",
        "El formulario de contacto del sitio es, por el momento, demostrativo y no transmite ni almacena datos. Para comunicarte con nosotros escribinos por correo electrónico.",
      ],
    },
    {
      heading: "3. VetNet en fase piloto",
      paragraphs: [
        "VetNet se encuentra en desarrollo activo. Durante la fase piloto, las funcionalidades pueden cambiar, interrumpirse temporalmente o presentar errores. La demo pública utiliza exclusivamente datos ficticios y no debe usarse para cargar información real de pacientes o clientes.",
        "Las clínicas que se sumen al programa beta lo harán mediante un acuerdo particular que detallará alcance, costos (que pueden ser reducidos o nulos), niveles de soporte y el compromiso de brindar feedback sobre el funcionamiento del sistema.",
      ],
    },
    {
      heading: "4. Datos de las clínicas",
      paragraphs: [
        "La información que cada clínica carga en VetNet le pertenece. CADAD actúa como encargado del tratamiento y solo la utiliza para prestar el servicio. Ante la finalización del vínculo, la clínica podrá solicitar la exportación de sus datos en un formato estructurado.",
      ],
      list: [
        "Acceso mediante usuarios personales y roles con permisos granulares.",
        "Registro de auditoría inmutable de las acciones relevantes (usuario, fecha y dirección IP).",
        "Respaldos periódicos en la nube, distribuidos geográficamente.",
      ],
    },
    {
      heading: "5. Propiedad intelectual",
      paragraphs: [
        "La marca CADAD, la marca VetNet, el código fuente, el diseño y los contenidos de este sitio pertenecen a CADAD o se usan con autorización. No está permitido reproducirlos ni distribuirlos sin consentimiento previo y por escrito.",
      ],
    },
    {
      heading: "6. Responsabilidad",
      paragraphs: [
        "Trabajamos para que el sitio y nuestros servicios funcionen de forma continua y segura, pero no podemos garantizar la ausencia total de interrupciones. En la medida permitida por la ley, CADAD no será responsable por daños indirectos derivados del uso del sitio o de versiones piloto del software.",
      ],
    },
    {
      heading: "7. Cambios en estos términos",
      paragraphs: [
        "Podemos actualizar estos términos. Publicaremos la versión vigente en esta página indicando la fecha de última actualización.",
      ],
    },
    {
      heading: "8. Ley aplicable y contacto",
      paragraphs: [
        "Estos términos se rigen por las leyes de la República Argentina. Ante cualquier controversia serán competentes los tribunales ordinarios de la ciudad de San Miguel de Tucumán.",
        `Para consultas sobre estos términos escribinos a ${CONTACT}.`,
      ],
    },
  ],
};

export const privacy: LegalDocument = {
  title: "Política de privacidad",
  description: "Cómo CADAD trata los datos personales conforme a la Ley 25.326.",
  updatedAt: UPDATED_AT,
  intro:
    "En CADAD creemos en la soberanía de los datos: la información de tu clínica es tuya. Esta política explica qué datos tratamos, con qué finalidad y cuáles son tus derechos, de acuerdo con la Ley 25.326 de Protección de los Datos Personales de la República Argentina.",
  sections: [
    {
      heading: "1. Responsable",
      paragraphs: [
        `CADAD, con domicilio en San Miguel de Tucumán, Argentina, es responsable del tratamiento de los datos recabados a través de este sitio. Contacto: ${CONTACT}.`,
      ],
    },
    {
      heading: "2. Qué datos tratamos",
      list: [
        "Datos de contacto que nos envíes voluntariamente por correo electrónico (nombre, empresa o clínica, email, teléfono y mensaje).",
        "Datos técnicos mínimos de navegación necesarios para el funcionamiento y la seguridad del sitio.",
        "En el caso de clínicas que utilicen VetNet: datos de usuarios del sistema, de tutores y de pacientes cargados por la propia clínica.",
      ],
      paragraphs: [
        "El formulario de contacto del sitio es actualmente demostrativo: no envía ni almacena la información que completes.",
      ],
    },
    {
      heading: "3. Finalidad",
      paragraphs: [
        "Usamos los datos para responder consultas, coordinar demos, prestar y mejorar nuestros servicios y cumplir obligaciones legales. No vendemos ni cedemos datos personales a terceros con fines comerciales.",
      ],
    },
    {
      heading: "4. Datos cargados en VetNet",
      paragraphs: [
        "Respecto de la información que las clínicas cargan en VetNet, la clínica es responsable de la base de datos y CADAD actúa como encargado del tratamiento, procesándola únicamente según sus instrucciones y para prestar el servicio.",
      ],
      list: [
        "Control de acceso por roles: cada persona ve solo lo que su función requiere.",
        "Logs de auditoría inmutables que registran quién realizó cada acción, cuándo y desde qué dirección IP.",
        "Respaldos cifrados en la nube, alojados en servidores ubicados en distintas regiones.",
        "Exportación de datos a pedido de la clínica al finalizar el servicio.",
      ],
    },
    {
      heading: "5. Conservación y seguridad",
      paragraphs: [
        "Conservamos los datos durante el tiempo necesario para cumplir la finalidad para la que fueron recabados y las obligaciones legales aplicables. Aplicamos medidas técnicas y organizativas razonables para protegerlos contra pérdida, acceso no autorizado o alteración.",
      ],
    },
    {
      heading: "6. Tus derechos",
      paragraphs: [
        `Como titular de los datos podés ejercer en forma gratuita los derechos de acceso, rectificación, actualización y supresión escribiendo a ${CONTACT}. Responderemos dentro de los plazos previstos por la Ley 25.326.`,
        "La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA (AAIP), en su carácter de Órgano de Control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.",
      ],
    },
    {
      heading: "7. Cookies",
      paragraphs: [
        "Este sitio no utiliza cookies publicitarias ni de seguimiento de terceros. Podemos usar almacenamiento local del navegador para recordar preferencias simples, como haber cerrado el aviso superior.",
      ],
    },
    {
      heading: "8. Cambios en esta política",
      paragraphs: [
        "Podemos actualizar esta política. La versión vigente estará siempre publicada en esta página con su fecha de última actualización.",
      ],
    },
  ],
};
