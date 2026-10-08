/**
 * Spanish-only subpage content for Cascadas de Tocoihue.
 *
 * These four guides target the high-intent Spanish queries already showing
 * impressions in Google Search Console (cómo llegar, horario, valor entrada,
 * fotos, mejor época). They are deliberately Spanish-only for now — the report
 * prioritises Spanish and warns against indexing half-translated pages — so the
 * pages are published with `i18n={false}` (no hreflang to non-existent
 * language versions).
 *
 * Facts stay consistent with the single source of truth in
 * `src/config/attraction.ts` and the visible homepage copy:
 *  - distance Dalcahue → Tocoihue ≈ 20 km on gravel (Ruta U-48)
 *  - Chacao Channel is crossed by ferry (transbordador) from Pargua to Chacao;
 *    the bridge is still under construction and not open to traffic
 *  - high-season window ~10:00–20:00 (confirm by phone)
 *  - reference ticket CLP 1.000–3.000 (carry cash, confirm on arrival)
 */

export interface FaqItem {
  q: string;
  a: string;
}

export interface RouteStep {
  step: string;
  detail: string;
}

export interface TransportOption {
  icon: string;
  title: string;
  text: string;
}

export interface SubpageCard {
  slug: string;
  icon: string;
  title: string;
  text: string;
}

/** Cards shown on the homepage to cross-link the four guides. */
export const subpageCards: SubpageCard[] = [
  {
    slug: 'como-llegar',
    icon: '🧭',
    title: 'Cómo llegar',
    text: 'Ruta, transbordador de Chacao y estacionamiento',
  },
  {
    slug: 'horarios-precios',
    icon: '🎟️',
    title: 'Horarios y precios',
    text: 'Cuándo abre y cuánto cuesta la entrada',
  },
  {
    slug: 'fotos',
    icon: '📷',
    title: 'Fotos',
    text: 'Galería y consejos de fotografía',
  },
  {
    slug: 'mejor-epoca',
    icon: '🌿',
    title: 'Mejor época',
    text: 'Cuándo visitar y qué llevar',
  },
];

export const comoLlegar = {
  slug: 'como-llegar',
  title: 'Cómo llegar a las Cascadas de Tocoihue (Dalcahue, Chiloé)',
  description:
    'Guía paso a paso para llegar a las Cascadas de Tocoihue en Dalcahue, Chiloé: transbordador de Chacao, Ruta 5, Dalcahue y los 20 km de ripio por la Ruta U-48. Estacionamiento, coordenadas GPS y consejos prácticos.',
  h1: 'Cómo llegar a las Cascadas de Tocoihue',
  lead:
    'Las Cascadas de Tocoihue están en el sector rural de Tocoihue, comuna de Dalcahue, en la Isla Grande de Chiloé. El último tramo es de ripio, así que la forma más cómoda de llegar es en vehículo propio, taxi o tour desde Dalcahue.',
  /** Turn-by-turn from the town of Dalcahue (the last paved reference point). */
  fromDalcahue: [
    {
      step: 'Sal de Dalcahue por la Ruta U-48',
      detail:
        'Toma la Ruta U-48 en dirección al sector rural de Tocoihue. Es la carretera que conecta el pueblo con la costa oriente de la comuna.',
    },
    {
      step: 'Avanza ~20 km por camino de ripio',
      detail:
        'Tras dejar el pavimento, el camino se vuelve de ripio. Son aproximadamente 20 km hasta la entrada de la reserva; en seco es transitable con vehículo normal, con precaución.',
    },
    {
      step: 'Llega a la entrada y el estacionamiento',
      detail:
        'El estacionamiento queda junto a la entrada de la reserva. Desde ahí se camina por el sendero señalizado hasta el mirador de la cascada.',
    },
  ] as RouteStep[],
  /** Ways to reach the island / Dalcahue, in priority order. */
  options: [
    {
      icon: '⛴️',
      title: 'En transbordador hasta Chiloé',
      text:
        'Desde el continente cruzas el Canal de Chacao en transbordador (ferry) desde Pargua hasta Chacao. El Puente de Chacao sigue en construcción y todavía no está habilitado para el tránsito.',
    },
    {
      icon: '🚌',
      title: 'En bus hasta Dalcahue',
      text:
        'Hay buses desde Puerto Montt y desde Castro hasta Dalcahue con frecuencia. Desde Dalcahue no hay bus directo a la reserva: el último tramo se hace en taxi, colectivo o tour.',
    },
    {
      icon: '🚗',
      title: 'En auto por la Ruta 5',
      text:
        'Desde Puerto Montt ve por la Ruta 5 hasta Pargua, cruza el Canal de Chacao en transbordador y sigue por la Ruta 5 hacia el sur hasta Dalcahue; desde ahí, la Ruta U-48 te lleva a Tocoihue.',
    },
    {
      icon: '✈️',
      title: 'En avión a Mocopulli',
      text:
        'El aeropuerto más cercano en la isla es Mocopulli (MHC), cerca de Castro: unos 45–60 min de auto hasta Dalcahue por la Ruta 5.',
    },
  ] as TransportOption[],
  parking:
    'Hay estacionamiento en la entrada de la reserva, al lado de la recepción. En temporada alta conviene llegar temprano, porque el espacio es limitado y el camino de ripio se complica con la lluvia.',
  faq: [
    {
      q: '¿Se puede llegar en bus directo a las cascadas?',
      a: 'No. El bus llega hasta Dalcahue (o Castro); desde ahí el último tramo de unos 20 km de ripio hasta la reserva se hace en taxi, colectivo o tour contratado en el pueblo.',
    },
    {
      q: '¿El Puente de Chacao ya está abierto para los autos?',
      a: 'No. El cruce al continente se hace en transbordador (ferry) desde Pargua hasta Chacao. El Puente de Chacao sigue en construcción y todavía no está habilitado para el tránsito.',
    },
    {
      q: '¿Cuánto se tarda desde Puerto Montt?',
      a: 'En auto o bus, el trayecto Puerto Montt → Dalcahue suma unas 2,5–3 horas, incluyendo la espera y el cruce en transbordador por el Canal de Chacao. Desde Dalcahue faltan unos 45 min más hasta la entrada de la reserva.',
    },
    {
      q: '¿El camino de ripio es apto para cualquier auto?',
      a: 'En seco, un auto normal lo recorre sin problema. Tras lluvias fuertes el ripio se embarra y sube/baja; conviene consultar el estado del día en Dalcahue y preferir un vehículo alto o 4×4 si vas en invierno.',
    },
    {
      q: '¿Hay estacionamiento en la Cascada de Tocoihue?',
      a: 'Sí, el estacionamiento está en la entrada de la reserva, junto a la recepción. Desde allí se camina al mirador por el sendero señalizado.',
    },
  ] as FaqItem[],
};

export const horariosPrecios = {
  slug: 'horarios-precios',
  title: 'Horarios y precios de las Cascadas de Tocoihue (Dalcahue, Chiloé)',
  description:
    'Horarios de apertura, ventana de temporada alta y precio de entrada referencial de las Cascadas de Tocoihue en Dalcahue, Chiloé. Valores aproximados, se recomienda confirmar por teléfono.',
  h1: 'Horarios y precios de las Cascadas de Tocoihue',
  lead:
    'Tocoihue es una reserva de bosque nativo de uso público que abre de día. La ventana fija solo aplica en temporada alta; el resto del año conviene confirmar el horario y el valor de la entrada por teléfono antes de salir.',
  hours: [
    {
      label: 'Apertura',
      value: 'De día, aproximadamente 10:00–20:00',
    },
    {
      label: 'Temporada alta',
      value: 'Verano (mayor afluencia y horario más estable)',
    },
    {
      label: 'Recomendación',
      value: 'Confirma el horario del día por teléfono antes de viajar',
    },
  ] as { label: string; value: string }[],
  price: {
    range: 'Normalmente entre CLP 1.000 y 3.000 por persona',
    note: 'Valor referencial. Puede cambiar según temporada y administración; conviene llevar efectivo y confirmar al llegar.',
    includes: [
      'Acceso al sendero señalizado hasta el mirador de la cascada',
      'Recorrido por el bosque nativo templado lluvioso (ulmo, coigüe, helechos)',
      'Uso del mirador principal y de las pasarelas de observación',
    ],
  },
  faq: [
    {
      q: '¿Cuál es el horario de la Cascada de Tocoihue?',
      a: 'Abre de día, aproximadamente de 10:00 a 20:00. La ventana fija solo aplica en temporada alta (verano); el resto del año el horario puede variar, por eso recomendamos confirmar por teléfono antes de la visita.',
    },
    {
      q: '¿Cuánto cuesta la entrada?',
      a: 'El valor referencial suele estar entre CLP 1.000 y 3.000 por persona. Es un monto aproximado que puede cambiar según temporada y administración; lleva efectivo y confirma al llegar.',
    },
    {
      q: '¿La entrada es gratis?',
      a: 'No, Tocoihue cobra entrada. El sitio es una reserva de uso público con mantenimiento del sendero y miradores, por lo que se paga un valor referencial de CLP 1.000 a 3.000.',
    },
    {
      q: '¿Qué incluye la entrada?',
      a: 'Incluye el acceso al sendero señalizado hasta el mirador de la cascada, el recorrido por el bosque nativo y el uso de los miradores y pasarelas de observación.',
    },
    {
      q: '¿Se puede pagar con tarjeta?',
      a: 'No está garantizado. Lleva efectivo (pesos chilenos), porque el punto de pago queda en la entrada rural y el cobro suele ser en efectivo.',
    },
  ] as FaqItem[],
};

export const fotos = {
  slug: 'fotos',
  title: 'Fotos de las Cascadas de Tocoihue (Dalcahue, Chiloé)',
  description:
    'Galería de fotos reales de las Cascadas de Tocoihue en Dalcahue, Chiloé, con descripción, consejos de fotografía y el mejor momento del día para captar la cascada y el bosque nativo.',
  h1: 'Fotos de las Cascadas de Tocoihue',
  lead:
    'La cascada cae por una pared de basalto en medio de un bosque nativo templado lluvioso. Aquí tienes una selección de fotos reales del lugar y algunos consejos para sacar las tuyas.',
  tips: [
    'La luz más pareja suele estar a mitad de la mañana, cuando el sol entra entre el follaje sin quemar la imagen.',
    'Tras la lluvia el caudal sube y la cascada gana fuerza; la neblina del bosque suma atmósfera a las fotos.',
    'Lleva ropa y calzado que puedan mojarse: cerca del salto hay rocío permanente.',
    'Una cámara o celular con estabilización ayuda, porque el mirador puede tener humedad y poca luz bajo el bosque.',
    'No te apartes de los miradores señalizados para la foto: la roca junto al salto está resbaladiza.',
  ] as string[],
  faq: [
    {
      q: '¿Se pueden sacar fotos dentro de la reserva?',
      a: 'Sí, la fotografía es bienvenida en los miradores y senderos señalizados. Mantente en los sectores habilitados y no te acerques al borde del salto ni a la pared de roca mojada.',
    },
    {
      q: '¿Cuál es el mejor momento del día para fotografiar la cascada?',
      a: 'A mitad de la mañana suele haber luz más pareja bajo el bosque. Tras la lluvia el caudal es mayor y la neblina aporta atmósfera; eso sí, el camino de ripio puede estar más pesado.',
    },
    {
      q: '¿Las fotos son de uso libre?',
      a: 'Las imágenes de esta guía ilustran el lugar con fines de información. Para uso comercial o publicación, confirma los derechos con la administración de la reserva.',
    },
    {
      q: '¿Se puede volar dron en Tocoihue?',
      a: 'No asumas que está permitido. En una reserva de bosque nativo suele haber restricciones para proteger la fauna y la experiencia de los visitantes; consulta con la administración antes de volar un dron.',
    },
  ] as FaqItem[],
};

export const mejorEpoca = {
  slug: 'mejor-epoca',
  title: 'Mejor época para visitar las Cascadas de Tocoihue (Chiloé)',
  description:
    'Cuándo visitar las Cascadas de Tocoihue en Dalcahue, Chiloé: clima por estación, temporada de lluvias, caudal de la cascada y qué llevar para una visita cómoda.',
  h1: 'Mejor época para visitar las Cascadas de Tocoihue',
  lead:
    'Chiloé tiene clima templado lluvioso: llueve gran parte del año. La primavera y el verano son las épocas más cómodas para caminar el sendero; el otoño e invierno traen más lluvia, pero también más caudal en la cascada.',
  seasons: [
    {
      icon: '🌸',
      title: 'Primavera (sep–nov)',
      text:
        'Días más largos y lluvia moderada. El bosque se renueva y el camino suele estar en buen estado. Buena época para combinar naturaleza y fotografía.',
    },
    {
      icon: '☀️',
      title: 'Verano (dic–feb)',
      text:
        'Es la temporada alta: afluencia mayor y horario más estable. Puede llover igual, pero las temperaturas son más amables para la caminata.',
    },
    {
      icon: '🍂',
      title: 'Otoño (mar–may)',
      text:
        'Menos gente y paisaje otoñal, pero la lluvia aumenta. El ripio puede estar más pesado hacia el final del tramo.',
    },
    {
      icon: '🌧️',
      title: 'Invierno (jun–ago)',
      text:
        'Temporada de lluvias: más caudal en la cascada, pero camino embarrado y frío. Ideal para quienes buscan fuerza de agua y no les molesta la lluvia.',
    },
  ] as TransportOption[],
  pack: [
    'Chaqueta cortaviento e impermeable',
    'Zapatos de trekking o con buena tracción (el ripio y las rocas mojadas resbalan)',
    'Efectivo para la entrada y gastos básicos',
    'Botella reutilizable con agua',
    'Ropa que pueda mojarse si te acercas al salto',
  ] as string[],
  faq: [
    {
      q: '¿Cuál es la mejor época del año para visitar Tocoihue?',
      a: 'Primavera y verano son las más cómodas para caminar el sendero, con días más largos y menos barro. El invierno tiene más lluvia y más caudal en la cascada, pero el camino de ripio se complica.',
    },
    {
      q: '¿Vale la pena ir en invierno con lluvia?',
      a: 'Si buscas la cascada con más fuerza y atmósfera de bosque lluvioso, sí. Lleva impermeable y calzado con tracción, y consulta el estado del camino de ripio en Dalcahue antes de salir.',
    },
    {
      q: '¿Hay temporada de lluvias en Chiloé?',
      a: 'Sí, Chiloé tiene clima templado lluvioso y llueve gran parte del año. El otoño e invierno concentran las lluvias más fuertes; la primavera y el verano son más estables, aunque puede llover igual.',
    },
    {
      q: '¿Qué ropa llevar para visitar la cascada?',
      a: 'Lleva cortaviento impermeable, calzado con buena tracción (el ripio y la roca mojada resbalan), efectivo y una botella de agua. Cerca del salto hay rocío permanente, así que ropa que pueda mojarse ayuda.',
    },
  ] as FaqItem[],
};
