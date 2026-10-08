/**
 * Multilingual content for the four long-tail guide subpages of
 * Cascadas de Tocoihue: como-llegar, horarios-precios, fotos, mejor-epoca.
 *
 * These guides target the high-intent Spanish queries already showing
 * impressions in Google Search Console (cómo llegar, horario, valor entrada,
 * fotos, mejor época). They now exist in es/en/zh (Mapudungun arn is not
 * covered, so `subpageLangs` in `src/i18n/ui.ts` excludes it).
 *
 * Facts stay consistent with the single source of truth in
 * `src/config/attraction.ts` and the visible homepage copy:
 *  - distance Dalcahue → Tocoihue ≈ 20 km on gravel (Ruta U-48)
 *  - Chacao Channel is crossed by ferry (transbordador) from Pargua to Chacao;
 *    the bridge is still under construction and not open to traffic
 *  - high-season window ~10:00–20:00 (confirm by phone)
 *  - reference ticket CLP 1.000–3.000 (carry cash, confirm on arrival)
 */

export type Lang = 'es' | 'en' | 'zh';

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

export interface ComoLlegarContent {
  title: string;
  description: string;
  h1: string;
  lead: string;
  fromDalcahue: RouteStep[];
  options: TransportOption[];
  parking: string;
  faq: FaqItem[];
}

export interface HorariosPreciosContent {
  title: string;
  description: string;
  h1: string;
  lead: string;
  hours: { label: string; value: string }[];
  price: { range: string; note: string; includes: string[] };
  faq: FaqItem[];
}

export interface FotosContent {
  title: string;
  description: string;
  h1: string;
  lead: string;
  tips: string[];
  faq: FaqItem[];
}

export interface MejorEpocaContent {
  title: string;
  description: string;
  h1: string;
  lead: string;
  seasons: TransportOption[];
  pack: string[];
  faq: FaqItem[];
}

export const subpageSlugs = ['como-llegar', 'horarios-precios', 'fotos', 'mejor-epoca'] as const;

export const comoLlegar: Record<Lang, ComoLlegarContent> = {
  es: {
    title: 'Cómo llegar a las Cascadas de Tocoihue (Dalcahue, Chiloé)',
    description:
      'Guía paso a paso para llegar a las Cascadas de Tocoihue en Dalcahue, Chiloé: transbordador de Chacao, Ruta 5, Dalcahue y los 20 km de ripio por la Ruta U-48. Estacionamiento, GPS y consejos prácticos.',
    h1: 'Cómo llegar a las Cascadas de Tocoihue',
    lead:
      'Las Cascadas de Tocoihue están en el sector rural de Tocoihue, comuna de Dalcahue, en la Isla Grande de Chiloé. El último tramo es de ripio, así que la forma más cómoda de llegar es en vehículo propio, taxi o tour desde Dalcahue.',
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
    ],
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
    ],
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
    ],
  },
  en: {
    title: 'How to get to Tocoihue Waterfalls (Dalcahue, Chiloé)',
    description:
      'Step-by-step guide on how to get to the Tocoihue Waterfalls in Dalcahue, Chiloé: the Chacao ferry, Route 5, Dalcahue and the 20 km of gravel on Route U-48. Parking, GPS and practical tips.',
    h1: 'How to get to Tocoihue Waterfalls',
    lead:
      'The Tocoihue Waterfalls are in the rural area of Tocoihue, commune of Dalcahue, on the Big Island of Chiloé. The last stretch is gravel, so the easiest way to get there is by your own vehicle, taxi or a tour from Dalcahue.',
    fromDalcahue: [
      {
        step: 'Leave Dalcahue on Route U-48',
        detail:
          'Take Route U-48 towards the rural area of Tocoihue. This is the road that connects the town with the eastern coast of the commune.',
      },
      {
        step: 'Drive ~20 km on a gravel road',
        detail:
          'After the pavement ends, the road becomes gravel. It is about 20 km to the entrance of the reserve; in dry conditions it is passable with a normal vehicle, with caution.',
      },
      {
        step: 'Reach the entrance and parking',
        detail:
          'The parking area is next to the reserve entrance. From there you walk along the signposted trail to the waterfall viewpoint.',
      },
    ],
    options: [
      {
        icon: '⛴️',
        title: 'Cross by ferry to Chiloé',
        text:
          'From the mainland you cross the Chacao Channel by ferry (transbordador) from Pargua to Chacao. The Chacao Bridge is still under construction and is not open to traffic.',
      },
      {
        icon: '🚌',
        title: 'By bus to Dalcahue',
        text:
          'There are buses from Puerto Montt and from Castro to Dalcahue with regular service. From Dalcahue there is no direct bus to the reserve: the last stretch is by taxi, shared taxi or a tour.',
      },
      {
        icon: '🚗',
        title: 'By car on Route 5',
        text:
          'From Puerto Montt take Route 5 to Pargua, cross the Chacao Channel by ferry and continue on Route 5 south to Dalcahue; from there, Route U-48 takes you to Tocoihue.',
      },
      {
        icon: '✈️',
        title: 'By plane to Mocopulli',
        text:
          'The nearest airport on the island is Mocopulli (MHC), near Castro: about 45–60 minutes by car to Dalcahue via Route 5.',
      },
    ],
    parking:
      'There is parking at the reserve entrance, next to the reception. In high season it is best to arrive early, as space is limited and the gravel road gets worse with rain.',
    faq: [
      {
        q: 'Can you get there by bus directly to the waterfall?',
        a: 'No. The bus goes to Dalcahue (or Castro); from there the last ~20 km of gravel to the reserve is by taxi, shared taxi or a tour arranged in town.',
      },
      {
        q: 'Is the Chacao Bridge open for cars?',
        a: 'No. The crossing to the mainland is by ferry (transbordador) from Pargua to Chacao. The Chacao Bridge is still under construction and is not open to traffic.',
      },
      {
        q: 'How long does it take from Puerto Montt?',
        a: 'By car or bus, the Puerto Montt → Dalcahue trip takes about 2.5–3 hours, including the wait and crossing on the Chacao Channel ferry. From Dalcahue it is about 45 minutes more to the reserve entrance.',
      },
      {
        q: 'Is the gravel road suitable for any car?',
        a: 'In dry conditions, a normal car drives it without problem. After heavy rain the gravel gets muddy and slippery; check the day’s conditions in Dalcahue and prefer a high-clearance or 4×4 vehicle if you go in winter.',
      },
      {
        q: 'Is there parking at Tocoihue Waterfall?',
        a: 'Yes, the parking is at the reserve entrance, next to the reception. From there you walk to the viewpoint along the signposted trail.',
      },
    ],
  },
  zh: {
    title: '如何前往托科伊韦瀑布（查洛埃 达尔卡韦）',
    description:
      '逐步指南：如何前往查洛埃岛达尔卡韦的托科伊韦瀑布——查科渡轮、5 号公路、达尔卡韦，以及 U-48 公路最后的 20 公里碎石路。停车、GPS 与实用建议。',
    h1: '如何前往托科伊韦瀑布',
    lead:
      '托科伊韦瀑布位于查洛埃大岛达尔卡韦市镇的托科伊韦乡村地区。最后一段是碎石路，因此最方便的方式是自驾、出租车，或从达尔卡韦参加当地的一日游。',
    fromDalcahue: [
      {
        step: '从达尔卡韦沿 U-48 公路出发',
        detail: '沿 U-48 公路驶向托科伊韦乡村地区。这条路把镇子与市镇东海岸连接起来。',
      },
      {
        step: '在碎石路上行驶约 20 公里',
        detail: '柏油路结束后变为碎石路。到保护区入口约 20 公里；天气干燥时普通车辆可通行，需谨慎驾驶。',
      },
      {
        step: '到达入口与停车场',
        detail: '停车场就在保护区入口旁。从那里沿指示步道步行前往瀑布观景台。',
      },
    ],
    options: [
      {
        icon: '⛴️',
        title: '乘渡轮跨越查科海峡',
        text: '从大陆在帕尔瓜（Pargua）乘渡轮（transbordador）前往查科（Chacao）。查科大桥仍在建设中，尚未通车。',
      },
      {
        icon: '🚌',
        title: '乘巴士到达尔卡韦',
        text: '从蒙特港（Puerto Montt）和卡斯特罗（Castro）有班车前往达尔卡韦。从达尔卡韦没有直达保护区的巴士：最后一段需乘出租车、合乘小巴或当地一日游。',
      },
      {
        icon: '🚗',
        title: '自驾走 5 号公路',
        text: '从蒙特港沿 5 号公路到帕尔瓜，乘渡轮跨越查科海峡，再沿 5 号公路南行至达尔卡韦；之后由 U-48 公路前往托科伊韦。',
      },
      {
        icon: '✈️',
        title: '飞往莫科普利机场',
        text: '岛上最近的机场是卡斯特罗附近的莫科普利（Mocopulli, MHC）：经 5 号公路到达尔卡韦约 45–60 分钟。',
      },
    ],
    parking:
      '保护区入口、接待处旁设有停车场。旺季建议早到，因为车位有限，且雨后碎石路会更难走。',
    faq: [
      {
        q: '能坐巴士直达瀑布吗？',
        a: '不能。巴士只到达尔卡韦（或卡斯特罗）；从那里最后约 20 公里碎石路需乘出租车、合乘小巴，或在镇上报名一日游。',
      },
      {
        q: '查科大桥通车了吗？',
        a: '还没有。前往大陆需在帕尔瓜乘渡轮（transbordador）到查科。查科大桥仍在建设中，尚未通车。',
      },
      {
        q: '从蒙特港要多久？',
        a: '自驾或乘巴士，蒙特港→达尔卡韦约 2.5–3 小时，含等候与查科海峡渡轮过海时间。从达尔卡韦到保护区入口再约 45 分钟。',
      },
      {
        q: '碎石路普通车能走吗？',
        a: '天气干燥时，普通车辆可通行。大雨后碎石路泥泞易滑；建议在达尔卡韦了解当天路况，冬季出行尽量选高底盘或四驱车。',
      },
      {
        q: '托科伊韦瀑布有停车场吗？',
        a: '有，停车场在保护区入口、接待处旁。从那里沿指示步道步行前往观景台。',
      },
    ],
  },
};

export const horariosPrecios: Record<Lang, HorariosPreciosContent> = {
  es: {
    title: 'Horarios y precios de las Cascadas de Tocoihue (Dalcahue, Chiloé)',
    description:
      'Horarios de apertura, ventana de temporada alta y precio de entrada referencial de las Cascadas de Tocoihue en Dalcahue, Chiloé. Valores aproximados, se recomienda confirmar por teléfono.',
    h1: 'Horarios y precios de las Cascadas de Tocoihue',
    lead:
      'Tocoihue es una reserva de bosque nativo de uso público que abre de día. La ventana fija solo aplica en temporada alta; el resto del año conviene confirmar el horario y el valor de la entrada por teléfono antes de salir.',
    hours: [
      { label: 'Apertura', value: 'De día, aproximadamente 10:00–20:00' },
      { label: 'Temporada alta', value: 'Verano (mayor afluencia y horario más estable)' },
      { label: 'Recomendación', value: 'Confirma el horario del día por teléfono antes de viajar' },
    ],
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
    ],
  },
  en: {
    title: 'Opening hours and prices of Tocoihue Waterfalls (Dalcahue, Chiloé)',
    description:
      'Opening hours, high-season window and reference entry price for the Tocoihue Waterfalls in Dalcahue, Chiloé. Approximate values — we recommend confirming by phone.',
    h1: 'Opening hours and prices of Tocoihue Waterfalls',
    lead:
      'Tocoihue is a native-forest reserve open to the public during the day. The fixed schedule only applies in high season; the rest of the year it is best to confirm the hours and the entry price by phone before setting out.',
    hours: [
      { label: 'Opening', value: 'During the day, approximately 10:00–20:00' },
      { label: 'High season', value: 'Summer (higher attendance and more stable hours)' },
      { label: 'Recommendation', value: 'Confirm the day’s hours by phone before you travel' },
    ],
    price: {
      range: 'Usually between CLP 1,000 and 3,000 per person',
      note: 'Reference value. It may change by season and management; bring cash and confirm on arrival.',
      includes: [
        'Access to the signposted trail to the waterfall viewpoint',
        'A walk through the temperate rainforest (ulmo, coigüe, ferns)',
        'Use of the main viewpoint and the observation walkways',
      ],
    },
    faq: [
      {
        q: 'What are the hours of Tocoihue Waterfall?',
        a: 'It is open during the day, approximately 10:00 to 20:00. The fixed window only applies in high season (summer); the rest of the year the hours may vary, so we recommend confirming by phone before your visit.',
      },
      {
        q: 'How much is the entrance fee?',
        a: 'The reference price is usually between CLP 1,000 and 3,000 per person. This is an approximate amount that may change by season and management; bring cash and confirm on arrival.',
      },
      {
        q: 'Is entry free?',
        a: 'No, Tocoihue charges an entrance fee. The site is a public-use reserve with trail and viewpoint maintenance, so a reference fee of CLP 1,000–3,000 is charged.',
      },
      {
        q: 'What is included in the entrance?',
        a: 'It includes access to the signposted trail to the waterfall viewpoint, the walk through the native forest and the use of the viewpoints and observation walkways.',
      },
      {
        q: 'Can you pay by card?',
        a: 'Not guaranteed. Bring cash (Chilean pesos), as the payment point is at a rural entrance and payment is usually in cash.',
      },
    ],
  },
  zh: {
    title: '托科伊韦瀑布开放时间与门票价格（查洛埃 达尔卡韦）',
    description:
      '查洛埃岛达尔卡韦托科伊韦瀑布的开放时间、旺季时段与参考门票价格。为近似值，建议电话确认。',
    h1: '托科伊韦瀑布开放时间与门票价格',
    lead:
      '托科伊韦是一处白天对外开放的原生森林保护区。固定时段仅在旺季适用；一年中的其他时间，建议出发前电话确认开放时间与门票价格。',
    hours: [
      { label: '开放', value: '白天，约 10:00–20:00' },
      { label: '旺季', value: '夏季（游客较多、时段更稳定）' },
      { label: '建议', value: '出行前电话确认当天开放时间' },
    ],
    price: {
      range: '通常每人 CLP 1,000–3,000',
      note: '为参考价格，可能随季节与管理方调整；请带现金，到达时确认。',
      includes: [
        '通往瀑布观景台的指示步道',
        '穿越温带雨林（ulmo、coigüe、蕨类）的步道',
        '主观景台与观景栈道的使用',
      ],
    },
    faq: [
      {
        q: '托科伊韦瀑布几点开放？',
        a: '白天开放，约 10:00 至 20:00。固定时段仅在旺季（夏季）适用；其他时间可能变动，建议出行前电话确认。',
      },
      {
        q: '门票多少钱？',
        a: '参考价格通常为每人 CLP 1,000–3,000。这是近似值，可能随季节与管理方调整；请带现金，到达时确认。',
      },
      {
        q: '免费进入吗？',
        a: '不免费，托科伊韦收取门票。这里是公共使用保护区，需维护步道与观景台，故收取 CLP 1,000–3,000 的参考费用。',
      },
      {
        q: '门票包含什么？',
        a: '包含通往瀑布观景台的指示步道、原生森林步道，以及观景台与观景栈道的使用。',
      },
      {
        q: '可以刷卡吗？',
        a: '不保证。请带现金（智利比索），因为售票点在乡村入口处，通常以现金支付。',
      },
    ],
  },
};

export const fotos: Record<Lang, FotosContent> = {
  es: {
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
    ],
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
    ],
  },
  en: {
    title: 'Photos of Tocoihue Waterfalls (Dalcahue, Chiloé)',
    description:
      'Real photo gallery of the Tocoihue Waterfalls in Dalcahue, Chiloé, with descriptions, photography tips and the best time of day to capture the waterfall and the native forest.',
    h1: 'Photos of Tocoihue Waterfalls',
    lead:
      'The waterfall drops down a basalt wall in the middle of a temperate rainforest. Here is a selection of real photos from the place and some tips for taking your own.',
    tips: [
      'The most even light is usually mid-morning, when the sun filters through the foliage without burning the image.',
      'After rain the flow rises and the waterfall gains force; the forest mist adds atmosphere to the photos.',
      'Wear clothes and footwear that can get wet: there is permanent spray near the fall.',
      'A camera or phone with stabilization helps, as the viewpoint can be humid and dim under the forest.',
      'Do not step off the signposted viewpoints for the photo: the rock by the fall is slippery.',
    ],
    faq: [
      {
        q: 'Can you take photos inside the reserve?',
        a: 'Yes, photography is welcome on the signposted viewpoints and trails. Stay in the enabled areas and do not approach the edge of the fall or the wet rock wall.',
      },
      {
        q: 'What is the best time of day to photograph the waterfall?',
        a: 'Mid-morning usually has more even light under the forest. After rain the flow is higher and the mist adds atmosphere; that said, the gravel road can be heavier.',
      },
      {
        q: 'Are the photos free to use?',
        a: 'The images in this guide illustrate the place for informational purposes. For commercial use or publication, confirm the rights with the reserve management.',
      },
      {
        q: 'Can you fly a drone at Tocoihue?',
        a: 'Do not assume it is allowed. In a native-forest reserve there are usually restrictions to protect wildlife and visitors’ experience; check with management before flying a drone.',
      },
    ],
  },
  zh: {
    title: '托科伊韦瀑布照片（查洛埃 达尔卡韦）',
    description:
      '查洛埃岛达尔卡韦托科伊韦瀑布的真实照片集，含说明、摄影建议，以及一天中拍摄瀑布与原生森林的最佳时段。',
    h1: '托科伊韦瀑布照片',
    lead: '瀑布从玄武岩崖壁倾泻而下，四周是温带雨林。这里精选了实地拍摄的真实照片，并附上一些拍摄建议。',
    tips: [
      '最均匀的光线通常在上午中段，阳光透过枝叶而不刺眼。',
      '雨后水量增大、瀑布更壮观；林间雾气为照片增添氛围。',
      '穿可弄湿的衣物与鞋：瀑布附近常年有水雾。',
      '带防抖的相机或手机很有帮助，因为观景台在林下可能潮湿昏暗。',
      '不要为拍照离开指示观景台：瀑布旁的岩石很滑。',
    ],
    faq: [
      {
        q: '保护区内可以拍照吗？',
        a: '可以，指示观景台与步道欢迎拍照。请留在开放区域，不要靠近瀑布边缘或湿滑岩壁。',
      },
      {
        q: '一天中什么时间拍瀑布最好？',
        a: '上午中段林下光线通常更均匀。雨后水量更大、雾气更有氛围；不过碎石路可能更难走。',
      },
      {
        q: '照片可以免费使用吗？',
        a: '本指南照片仅用于信息展示。如用于商业或公开发布，请向保护区管理方确认版权。',
      },
      {
        q: '可以在托科伊韦飞无人机吗？',
        a: '不要默认允许。原生森林保护区通常有限制以保护野生动物与游览体验；飞无人机前请先咨询管理方。',
      },
    ],
  },
};

export const mejorEpoca: Record<Lang, MejorEpocaContent> = {
  es: {
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
    ],
    pack: [
      'Chaqueta cortaviento e impermeable',
      'Zapatos de trekking o con buena tracción (el ripio y las rocas mojadas resbalan)',
      'Efectivo para la entrada y gastos básicos',
      'Botella reutilizable con agua',
      'Ropa que pueda mojarse si te acercas al salto',
    ],
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
    ],
  },
  en: {
    title: 'Best time to visit Tocoihue Waterfalls (Chiloé)',
    description:
      'When to visit the Tocoihue Waterfalls in Dalcahue, Chiloé: weather by season, rainy season, waterfall flow and what to bring for a comfortable visit.',
    h1: 'Best time to visit Tocoihue Waterfalls',
    lead:
      'Chiloé has a temperate rainy climate: it rains much of the year. Spring and summer are the most comfortable seasons to walk the trail; autumn and winter bring more rain, but also more flow in the waterfall.',
    seasons: [
      {
        icon: '🌸',
        title: 'Spring (Sep–Nov)',
        text: 'Longer days and moderate rain. The forest renews and the road is usually in good condition. A good season to combine nature and photography.',
      },
      {
        icon: '☀️',
        title: 'Summer (Dec–Feb)',
        text: 'This is high season: more visitors and more stable hours. It can still rain, but temperatures are milder for the walk.',
      },
      {
        icon: '🍂',
        title: 'Autumn (Mar–May)',
        text: 'Fewer people and an autumn landscape, but the rain increases. The gravel can be heavier towards the end of the stretch.',
      },
      {
        icon: '🌧️',
        title: 'Winter (Jun–Aug)',
        text: 'Rainy season: more flow in the waterfall, but muddy roads and cold. Ideal for those looking for water force and who do not mind the rain.',
      },
    ],
    pack: [
      'Windbreaker and waterproof jacket',
      'Trekking shoes or with good traction (the gravel and wet rocks are slippery)',
      'Cash for the entrance and basic expenses',
      'Reusable water bottle',
      'Clothes that can get wet if you get close to the fall',
    ],
    faq: [
      {
        q: 'What is the best time of year to visit Tocoihue?',
        a: 'Spring and summer are the most comfortable for walking the trail, with longer days and less mud. Winter has more rain and more flow in the waterfall, but the gravel road gets difficult.',
      },
      {
        q: 'Is it worth going in winter with rain?',
        a: 'If you are after the waterfall at full force and a rainy-forest atmosphere, yes. Bring a raincoat and traction footwear, and check the gravel road condition in Dalcahue before leaving.',
      },
      {
        q: 'Is there a rainy season in Chiloé?',
        a: 'Yes, Chiloé has a temperate rainy climate and it rains much of the year. Autumn and winter concentrate the heaviest rains; spring and summer are more stable, though it can still rain.',
      },
      {
        q: 'What clothes to bring to visit the waterfall?',
        a: 'Bring a waterproof windbreaker, footwear with good traction (the gravel and wet rock are slippery), cash and a water bottle. Near the fall there is permanent spray, so clothes that can get wet help.',
      },
    ],
  },
  zh: {
    title: '游览托科伊韦瀑布的最佳时节（查洛埃）',
    description: '何时游览查洛埃岛达尔卡韦的托科伊韦瀑布：各季天气、雨季、瀑布水量，以及舒适出行该带什么。',
    h1: '游览托科伊韦瀑布的最佳时节',
    lead:
      '查洛埃属温带海洋性多雨气候：一年大多时间有雨。春季与夏季是步行步道最舒适的季节；秋季与冬季雨水更多，但瀑布水量也更充沛。',
    seasons: [
      {
        icon: '🌸',
        title: '春季（9–11月）',
        text: '白昼更长、降雨适中。森林焕新，路况通常较好。是结合自然与摄影的好季节。',
      },
      {
        icon: '☀️',
        title: '夏季（12–2月）',
        text: '这是旺季：游客更多、时段更稳定。仍可能下雨，但气温对步行更温和。',
      },
      {
        icon: '🍂',
        title: '秋季（3–5月）',
        text: '人更少、秋色迷人，但降雨增多。接近路段末尾时碎石路可能更泥泞。',
      },
      {
        icon: '🌧️',
        title: '冬季（6–8月）',
        text: '雨季：瀑布水量更大，但道路泥泞、天气寒冷。适合追求水量与雨林氛围、不介意淋雨的人。',
      },
    ],
    pack: [
      '防风防水外套',
      '徒步鞋或抓地力好的鞋（碎石与湿岩易滑）',
      '用于门票与基本开销的现金',
      '可重复使用的水瓶',
      '靠近瀑布时可弄湿的衣物',
    ],
    faq: [
      {
        q: '一年中什么时候游览托科伊韦最好？',
        a: '春季与夏季步行步道最舒适，白昼更长、泥泞更少。冬季雨水多、瀑布水量大，但碎石路更难走。',
      },
      {
        q: '冬季下雨值得去吗？',
        a: '如果你想要瀑布最壮观的水势与雨林氛围，值得。带雨衣与抓地鞋，出发前在达尔卡韦了解碎石路路况。',
      },
      {
        q: '查洛埃有雨季吗？',
        a: '有，查洛埃属温带多雨气候，一年大多时间有雨。秋冬降水最集中；春夏更稳定，但仍可能下雨。',
      },
      {
        q: '游览瀑布要带什么衣服？',
        a: '带防风防水外套、抓地力好的鞋（碎石与湿岩易滑）、现金和水瓶。靠近瀑布处常年有水雾，可弄湿的衣物更实用。',
      },
    ],
  },
};

export const subpageCards: Record<Lang, { slug: string; icon: string; title: string; text: string }[]> = {
  es: [
    { slug: 'como-llegar', icon: '🧭', title: 'Cómo llegar', text: 'Ruta, transbordador de Chacao y estacionamiento' },
    { slug: 'horarios-precios', icon: '🎟️', title: 'Horarios y precios', text: 'Cuándo abre y cuánto cuesta la entrada' },
    { slug: 'fotos', icon: '📷', title: 'Fotos', text: 'Galería y consejos de fotografía' },
    { slug: 'mejor-epoca', icon: '🌿', title: 'Mejor época', text: 'Cuándo visitar y qué llevar' },
  ],
  en: [
    { slug: 'como-llegar', icon: '🧭', title: 'How to get there', text: 'Route, Chacao ferry and parking' },
    { slug: 'horarios-precios', icon: '🎟️', title: 'Hours & prices', text: 'When it opens and how much entry costs' },
    { slug: 'fotos', icon: '📷', title: 'Photos', text: 'Gallery and photography tips' },
    { slug: 'mejor-epoca', icon: '🌿', title: 'Best time to visit', text: 'When to go and what to bring' },
  ],
  zh: [
    { slug: 'como-llegar', icon: '🧭', title: '如何前往', text: '路线、查科渡轮与停车' },
    { slug: 'horarios-precios', icon: '🎟️', title: '开放时间与门票', text: '几点开放、门票多少钱' },
    { slug: 'fotos', icon: '📷', title: '照片', text: '图集与摄影建议' },
    { slug: 'mejor-epoca', icon: '🌿', title: '最佳时节', text: '何时去、带什么' },
  ],
};
