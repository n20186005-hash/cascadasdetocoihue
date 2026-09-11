/**
 * One-off i18n content migration for the SEO/CTR work.
 *
 * Adds: rewritten meta tags, the Horarios section, the Cómo llegar section,
 * the Nombre y leyenda section, an "access" FAQ category and the nav labels.
 * Idempotent: re-running overwrites these keys only.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const PATHS = {
  es: 'src/i18n/es.json',
  zh: 'src/i18n/zh.json',
  en: 'src/i18n/en.json',
  arn: 'src/i18n/arn.json',
};

const meta = {
  es: {
    title: 'Cascadas de Tocoihue: Horarios, Cómo Llegar y Guía de Visita (Chiloé)',
    description:
      'Planifica tu visita a las Cascadas de Tocoihue en Dalcahue, Chiloé. Conoce los horarios actualizados, rutas de cómo llegar, la leyenda local y tarifas.',
  },
  en: {
    title: 'Tocoihue Waterfalls, Chiloé: Hours, How to Get There & Visit Guide',
    description:
      'Plan your visit to the Tocoihue Waterfalls in Dalcahue, Chiloé. Opening hours, step-by-step directions, GPS coordinates, local legend and ticket prices.',
  },
  zh: {
    title: 'Tocoihue 瀑布（奇洛埃）：开放时间、怎么去、游览攻略',
    description:
      '奇洛埃达尔卡韦 Tocoihue 瀑布游览攻略：最新开放时间与季节可达性、从达尔卡韦出发的详细路线、GPS 坐标与 Plus Code、门票价格与当地地名传说。',
  },
  arn: {
    title: 'Cascadas de Tocoihue (Chiloé): Aravo, Chumül Amulen ha Guía',
    description:
      'Tocoihue küyen, Dalcahue, Chiloé. Aravo, rüpü Dalcahue guive, coordenadas GPS, leyenda huilliche ha tarifa.',
  },
};

const header = {
  es: { schedule: 'Horarios', directions: 'Cómo llegar', heritage: 'Nombre y leyenda', transport: 'Transporte' },
  en: { schedule: 'Hours', directions: 'Directions', heritage: 'Name & legend', transport: 'Transport' },
  zh: { schedule: '开放时间', directions: '怎么去', heritage: '地名与传说', transport: '交通方式' },
  arn: { schedule: 'Aravo', directions: 'Chumül amulen', heritage: 'Üy ha ngütram', transport: 'Chara' },
};

const transportTitles = {
  es: 'Formas de llegar: bus, auto, ferry y avión',
  en: 'Ways to reach the falls: bus, car, ferry and plane',
  zh: '到达方式：巴士、自驾、渡轮与航班',
  arn: "Chumül amulen: bus, auto, ferry ha avión",
};

const schedule = {
  es: {
    eyebrow: 'Horarios y acceso',
    title: 'Horarios, temporada y tarifas de las Cascadas de Tocoihue',
    subtitle:
      'El recinto es una reserva natural privada que abre de día. El horario fijo se aplica en temporada alta y puede variar por clima, caudal del río o mantención del sendero: confirma siempre antes de viajar.',
    hoursTitle: 'Horario de apertura',
    hours: [
      { label: 'Temporada alta (diciembre – marzo)', value: '≈ 10:00 – 20:00, todos los días' },
      { label: 'Resto del año', value: 'Solo con luz de día; el cierre es más temprano' },
      { label: 'Último ingreso', value: 'Se recomienda al menos 1 hora antes del cierre' },
    ],
    hoursNote:
      'Al ser una reserva que depende del clima, el acceso puede cerrarse sin aviso previo por lluvia intensa, viento fuerte o crecida del río.',
    seasonTitle: 'Accesibilidad por temporada',
    season: [
      {
        label: 'Diciembre – marzo (verano)',
        value:
          'Temporada alta, horario fijo y mayor afluencia. Conviene llegar antes de las 11:00 para evitar la congestión del camino de ripio.',
      },
      {
        label: 'Abril – mayo (otoño)',
        value:
          'Menos visitantes y bosque todavía verde. Las lluvias empiezan a aumentar y el sendero se vuelve resbaladizo.',
      },
      {
        label: 'Junio – agosto (invierno)',
        value:
          'El mes de mayor pluviosidad: el salto baja con más fuerza, pero hay barro, menos horas de luz y días de cierre por temporal.',
      },
      {
        label: 'Septiembre – noviembre (primavera)',
        value:
          'Sendero más cómodo, más horas de luz y buena visibilidad; el caudal empieza a bajar. Es la época más equilibrada para caminar.',
      },
    ],
    seasonNote:
      'La visita se hace siempre a pie por un sendero de bosque, no es un recorrido vehicular ni un circuito para autos.',
    ticketsTitle: 'Tarifas orientativas',
    tickets: [
      { label: 'Adultos (12 años o más)', value: '≈ CLP 3.000 por persona' },
      { label: 'Adultos mayores', value: '≈ CLP 2.000 por persona' },
      { label: 'Niños y niñas (5 a 11 años)', value: '≈ CLP 1.000 por persona' },
      { label: 'Uso del baño', value: '≈ CLP 500 adicionales' },
    ],
    ticketsNote:
      'Valores referenciales recogidos de visitantes recientes: pueden cambiar y conviene confirmarlos al llegar. Lleva efectivo en billetes pequeños, porque la señal para pago con tarjeta es intermitente en el sector rural.',
    contactTitle: 'Antes de viajar',
    contactText:
      'Por ser un recinto privado con acceso sujeto al clima, la forma más segura de confirmar apertura, horario exacto y tarifas vigentes es llamar o escribir por WhatsApp al número publicado del recinto.',
    confirmNote:
      'Si vienes desde lejos, confirma el mismo día: es habitual que el acceso se cierre temporalmente por temporales de viento o lluvia intensa.',
    relatedTitle: 'Sigue planificando',
    related: [
      { label: 'Cómo llegar a las cascadas de Tocoihue desde Dalcahue', href: '#directions' },
      { label: 'El tiempo de hoy y el pronóstico de 7 días', href: '#weather' },
      { label: 'Historia de Tocoihue y Dalcahue', href: '#history' },
    ],
  },
  en: {
    eyebrow: 'Hours and access',
    title: 'Opening hours, season and ticket prices at the Tocoihue Waterfalls',
    subtitle:
      'The property is a private nature reserve that opens during daylight. Fixed hours apply in high season and can change with weather, river flow or trail maintenance: always confirm before travelling.',
    hoursTitle: 'Opening hours',
    hours: [
      { label: 'High season (December – March)', value: '≈ 10:00 – 20:00, every day' },
      { label: 'Rest of the year', value: 'Daylight only; closing is earlier' },
      { label: 'Last entry', value: 'At least 1 hour before closing is recommended' },
    ],
    hoursNote:
      'Because the reserve depends on the weather, access can close without notice in heavy rain, strong wind or when the river rises.',
    seasonTitle: 'Accessibility by season',
    season: [
      {
        label: 'December – March (summer)',
        value:
          'High season, fixed hours and the busiest period. Arrive before 11:00 to avoid congestion on the gravel road.',
      },
      {
        label: 'April – May (autumn)',
        value: 'Fewer visitors and the forest is still green. Rain begins to increase and the trail turns slippery.',
      },
      {
        label: 'June – August (winter)',
        value:
          'The wettest month: the falls run at their most powerful, but there is mud, less daylight and occasional storm closures.',
      },
      {
        label: 'September – November (spring)',
        value:
          'The most comfortable trail, more daylight and good visibility, with the flow starting to drop. The most balanced season for walking.',
      },
    ],
    seasonNote: 'The visit is always on foot along a forest trail; it is not a drive-through or a car circuit.',
    ticketsTitle: 'Indicative ticket prices',
    tickets: [
      { label: 'Adults (12 and over)', value: '≈ CLP 3,000 per person' },
      { label: 'Seniors', value: '≈ CLP 2,000 per person' },
      { label: 'Children (5–11)', value: '≈ CLP 1,000 per person' },
      { label: 'Use of the restroom', value: '≈ CLP 500 extra' },
    ],
    ticketsNote:
      'Indicative prices reported by recent visitors: they may change and are best confirmed on arrival. Carry cash in small notes, as the signal needed for card payments is intermittent in this rural area.',
    contactTitle: 'Before you travel',
    contactText:
      'Because this is a private property whose access depends on the weather, the safest way to confirm opening, exact hours and current prices is to call or message the published number on WhatsApp.',
    confirmNote:
      'If you are coming from far away, confirm on the day itself: temporary closures for wind or heavy rain are common.',
    relatedTitle: 'Keep planning',
    related: [
      { label: 'How to get to the Tocoihue waterfalls from Dalcahue', href: '#directions' },
      { label: "Today's weather and the 7-day forecast", href: '#weather' },
      { label: 'History of Tocoihue and Dalcahue', href: '#history' },
    ],
  },
  zh: {
    eyebrow: '开放时间与可达性',
    title: 'Tocoihue 瀑布的开放时间、季节可达性与门票价格',
    subtitle:
      '园区是白天开放的私人自然保护区。固定开放时间只在旺季适用，并会因天气、河水水量或步道维护而变化：出发前请务必确认。',
    hoursTitle: '开放时间',
    hours: [
      { label: '旺季（12 月 – 3 月）', value: '约 10:00 – 20:00，每天开放' },
      { label: '其余月份', value: '仅白天开放，闭园时间更早' },
      { label: '最晚入园', value: '建议在闭园前至少 1 小时入园' },
    ],
    hoursNote: '由于园区开放受天气制约，遇到强降雨、大风或河水上涨时可能临时关闭，且不另行通知。',
    seasonTitle: '季节性可达性',
    season: [
      {
        label: '12 月 – 2 月（夏季）',
        value: '旺季，有固定开放时间，游客最多。建议 11:00 前抵达，避开碎石路段的会车拥堵。',
      },
      { label: '4 月 – 5 月（秋季）', value: '游客较少，森林仍然翠绿。降雨开始增多，步道变得湿滑。' },
      {
        label: '6 月 – 8 月（冬季）',
        value: '降雨最多的季节：瀑布水量最大最壮观，但地面泥泞、白昼短，遇大风天可能临时关闭。',
      },
      {
        label: '9 月 – 11 月（春季）',
        value: '步道最好走、日照变长、能见度好，水量开始回落。是步行体验最均衡的季节。',
      },
    ],
    seasonNote: '游览全程为林间步道步行，不是车行路线，也没有车道环路。',
    ticketsTitle: '门票参考价格',
    tickets: [
      { label: '成人（12 岁及以上）', value: '约 3,000 智利比索／人' },
      { label: '老年人', value: '约 2,000 智利比索／人' },
      { label: '儿童（5–11 岁）', value: '约 1,000 智利比索／人' },
      { label: '使用洗手间', value: '另加约 500 智利比索' },
    ],
    ticketsNote:
      '价格来自近期游客反馈，仅供参考并可能调整，抵达时最好再次确认。建议携带小面额现金，因为乡村地带刷卡所需信号时断时续。',
    contactTitle: '出发前请确认',
    contactText:
      '由于这是私人园区且通行受天气影响，确认是否开放、确切开放时间与现行票价最可靠的方式，是拨打园区的公开电话或通过 WhatsApp 联系。',
    confirmNote: '如果从远处前来，请当天再确认一次：遇到大风或强降雨临时关闭是常见情况。',
    relatedTitle: '继续规划行程',
    related: [
      { label: '从达尔卡韦怎么去 Tocoihue 瀑布', href: '#directions' },
      { label: '今日天气与未来 7 天预报', href: '#weather' },
      { label: 'Tocoihue 与达尔卡韦的历史', href: '#history' },
    ],
  },
  arn: {
    eyebrow: 'Aravo ha kon',
    title: "Cascadas de Tocoihue: aravo, temporada ha tarifa",
    subtitle:
      "Ko tenda reserva privada, antü mew nülay. Temporada alta mew aravo fijo, hána küyen, rupa ha sendero rupive oñemboí. Neresẽ mboyve eporandu.",
    hoursTitle: 'Aravo',
    hours: [
      { label: 'Temporada alta (diciembre – marzo)', value: '≈ 10:00 – 20:00, kom antü' },
      { label: 'Hána küyen', value: 'Antü mew añoite; puñ rakümngey' },
      { label: 'Rüpüchay kon', value: 'Peteĩ ora mboyve nülame' },
    ],
    hoursNote: 'Küyen rupive: füta oky, füta viento térã rupa tuicháva mew, tenda nülay.',
    seasonTitle: 'Temporada rupive',
    season: [
      {
        label: 'Diciembre – marzo (verano)',
        value: 'Temporada alta, aravo fijo, tapicha heta. 11:00 mboyve kon küme.',
      },
      { label: 'Abril – mayo (otoño)', value: 'Tapicha pichi, ka\'ỹ küme. Oky püjü, sendero poyví.' },
      {
        label: 'Junio – agosto (invierno)',
        value: "Füta oky: rupa tuicháva, hána ruka poyví ha antü pichi. Viento mew nülay.",
      },
      {
        label: 'Septiembre – noviembre (primavera)',
        value: 'Sendero iporã, antü puku. Perim rupave rupachi.',
      },
    ],
    seasonNote: 'Perim rüpü mew añoite, auto mew ndaha\'éi.',
    ticketsTitle: 'Tarifa',
    tickets: [
      { label: 'Füta che (12 wüla)', value: '≈ 3.000 CLP peteĩ tapicha' },
      { label: 'Füta kuéra', value: '≈ 2.000 CLP peteĩ tapicha' },
      { label: 'Pichi (5–11)', value: '≈ 1.000 CLP peteĩ tapicha' },
      { label: 'Baño küzaw', value: '≈ 500 CLP' },
    ],
    ticketsNote: 'Precio orientativo, visitante dungu guive. Viru pichi egueraha: tarjeta señal ndoikoi.',
    contactTitle: 'Neresẽ mboyve',
    contactText:
      "Ko tenda privada ha küyen rupive. Aravo ha tarifa eikuaa rupive, teléfono térã WhatsApp mew eporandu.",
    confirmNote: "Puku mapu guive eütrüñma: füta viento térã oky mew tenda nülay.",
    relatedTitle: 'Planificación mew',
    related: [
      { label: 'Chumül amulen cascadas de Tocoihue, Dalcahue guive', href: '#directions' },
      { label: 'Fachi antü küyen ha 7 ára pronóstico', href: '#weather' },
      { label: 'Tocoihue ha Dalcahue ngütram', href: '#history' },
    ],
  },
};

const directions = {
  es: {
    eyebrow: 'Cómo llegar',
    title: 'Cómo llegar a las Cascadas de Tocoihue desde Dalcahue',
    subtitle:
      'Las cascadas están a unos 18 km al interior de Dalcahue, por la ruta U-48, en el sector rural de Tocoihue. Los últimos kilómetros son de ripio y no hay señalización continua, así que conviene salir con el mapa ya descargado.',
    routeTitle: 'Ruta paso a paso desde Dalcahue',
    route: [
      {
        step: 'Parte desde el centro de Dalcahue',
        detail:
          'Desde el centro de Dalcahue, en el sector del mercado y la costanera, toma el camino hacia el interior de la comuna en dirección al sector de Tocoihue (ruta U-48).',
      },
      {
        step: 'Sigue siempre el camino principal',
        detail:
          'Mantente en el camino principal durante unos 18 km. Pasarás por sectores rurales con casas, cercos y praderas; en este tramo no hay comercio ni estaciones de servicio.',
      },
      {
        step: 'Deja el pavimento',
        detail:
          'En la última parte el camino cambia a ripio. Reduce la velocidad, sobre todo con lluvia: el terreno se vuelve resbaladizo y hay curvas estrechas.',
      },
      {
        step: 'Ubica el desvío señalizado',
        detail:
          'El acceso al recinto está anunciado con carteles de madera. Si llegas a una bifurcación sin señal, retrocede unos metros: el desvío es fácil de pasar de largo.',
      },
      {
        step: 'Entra al estacionamiento',
        detail:
          'El estacionamiento está junto al acceso, sobre superficie de tierra. Desde ahí la visita continúa únicamente a pie por el sendero de bosque.',
      },
    ],
    routeNote:
      'Tiempo estimado: 25 a 35 minutos desde el centro de Dalcahue en vehículo propio, más si el camino está mojado. No hay transporte público regular hasta la entrada.',
    gpsTitle: 'Coordenadas para el GPS',
    gps: [
      { label: 'Coordenadas decimales', value: '-42.1365, -73.6832' },
      { label: 'Plus Code', value: 'MHW6+5W' },
      { label: 'Punto exacto', value: 'Ver en Google Maps' },
    ],
    gpsNote:
      'Si tu aplicación de mapas falla o no carga, escribe el Plus Code MHW6+5W: funciona aunque la cobertura móvil sea intermitente.',
    mapTitle: 'Mapa del sector',
    mapNote:
      'El mapa muestra el entorno rural entre Dalcahue y el acceso al recinto. Descarga la zona sin conexión antes de salir: la señal es irregular en el camino de ripio.',
    roadsTitle: 'Advertencias del camino',
    roads: [
      'Los últimos kilómetros son de ripio: no son aptos para vehículos muy bajos, motos de ruta ni sillas de ruedas.',
      'Con lluvia hay barro y pozas; maneja lento y evita viajar de noche, porque el camino no tiene alumbrado.',
      'No hay bencina, cajeros ni tiendas en el sector: carga combustible y efectivo en Dalcahue.',
      'Si vas en bus, el recorrido llega al pueblo pero no a la entrada: hay que combinar con transfer o taxi local.',
    ],
    relatedTitle: 'Antes de salir',
    related: [
      { label: 'Horarios, temporada y tarifas de las cascadas de Tocoihue', href: '#schedule' },
      { label: 'El tiempo de hoy y el pronóstico de 7 días', href: '#weather' },
      { label: 'Comparar bus, auto, ferry y avión', href: '#transport' },
    ],
  },
  en: {
    eyebrow: 'Directions',
    title: 'How to get to the Tocoihue Waterfalls from Dalcahue',
    subtitle:
      'The falls are about 18 km inland from Dalcahue along route U-48, in the rural sector of Tocoihue. The final kilometres are gravel with no continuous signage, so set off with the map already downloaded.',
    routeTitle: 'Step-by-step route from Dalcahue',
    route: [
      {
        step: 'Start in central Dalcahue',
        detail:
          'From the centre of Dalcahue, around the market and the waterfront, take the road inland towards the Tocoihue sector (route U-48).',
      },
      {
        step: 'Stay on the main road',
        detail:
          'Keep to the main road for about 18 km. You will pass rural properties, fences and fields; there are no shops or fuel stations on this stretch.',
      },
      {
        step: 'Leave the asphalt behind',
        detail:
          'On the last section the road turns to gravel. Slow down, especially in the rain: the surface gets slippery and there are narrow bends.',
      },
      {
        step: 'Find the signposted turn',
        detail:
          'The entrance is announced with wooden signs. If you reach a fork with no signage, back up a few metres: the turn is easy to drive past.',
      },
      {
        step: 'Park at the entrance',
        detail:
          'Parking sits beside the access on an unpaved surface. From there the visit continues on foot along the forest trail only.',
      },
    ],
    routeNote:
      'Estimated time: 25 to 35 minutes from central Dalcahue by car, longer when the road is wet. There is no regular public transport to the entrance.',
    gpsTitle: 'GPS coordinates',
    gps: [
      { label: 'Decimal coordinates', value: '-42.1365, -73.6832' },
      { label: 'Plus Code', value: 'MHW6+5W' },
      { label: 'Exact point', value: 'Open in Google Maps' },
    ],
    gpsNote:
      'If your map app fails to load, type the Plus Code MHW6+5W: it works even when mobile coverage is intermittent.',
    mapTitle: 'Map of the area',
    mapNote:
      'The map shows the rural area between Dalcahue and the entrance. Download the area for offline use before leaving: signal is patchy on the gravel road.',
    roadsTitle: 'Road warnings',
    roads: [
      'The final kilometres are gravel: not suitable for very low cars, road bikes or wheelchairs.',
      'In rain there is mud and standing water; drive slowly and avoid travelling at night, as the road has no lighting.',
      'There is no fuel, cash machine or shop in the area: fill up and withdraw cash in Dalcahue.',
      'By bus you reach the town but not the entrance: you will need a transfer or a local taxi.',
    ],
    relatedTitle: 'Before you set off',
    related: [
      { label: 'Opening hours, season and ticket prices at the Tocoihue waterfalls', href: '#schedule' },
      { label: "Today's weather and the 7-day forecast", href: '#weather' },
      { label: 'Compare bus, car, ferry and plane', href: '#transport' },
    ],
  },
  zh: {
    eyebrow: '怎么去',
    title: '从达尔卡韦怎么去 Tocoihue 瀑布',
    subtitle:
      '瀑布位于达尔卡韦内陆约 18 公里处，经 U-48 公路进入 Tocoihue 乡村地带。最后几公里是碎石路且没有连续路标，建议出发前先下载好离线地图。',
    routeTitle: '从达尔卡韦出发的逐步路线',
    route: [
      {
        step: '从达尔卡韦镇中心出发',
        detail: '在达尔卡韦中心的市场与海滨一带，沿通往市镇内陆的公路向 Tocoihue 方向行驶（U-48 公路）。',
      },
      {
        step: '一路沿主路行驶',
        detail: '沿主路行驶约 18 公里。沿途会经过民居、围栏与草场；这一段没有任何商店和加油站。',
      },
      {
        step: '离开柏油路面',
        detail: '最后一段变为碎石路。请减速慢行，雨天尤其要注意：路面湿滑且弯道狭窄。',
      },
      {
        step: '找到有标牌的岔路口',
        detail: '园区入口设有木牌标示。如果到了没有标牌的岔路，请往回退几米：这个岔口很容易开过头。',
      },
      {
        step: '驶入停车场',
        detail: '停车场位于入口旁，为土质地面。从这里开始，游览全程只能沿林间步道步行。',
      },
    ],
    routeNote:
      '预计耗时：自驾从达尔卡韦镇中心约 25 至 35 分钟，路面潮湿时更久。没有常规公共交通直达入口。',
    gpsTitle: 'GPS 坐标',
    gps: [
      { label: '十进制坐标', value: '-42.1365, -73.6832' },
      { label: 'Plus Code', value: 'MHW6+5W' },
      { label: '精确点位', value: '在 Google 地图中打开' },
    ],
    gpsNote: '如果地图应用打不开，请直接输入 Plus Code MHW6+5W：即使移动信号时断时续也能定位。',
    mapTitle: '区域地图',
    mapNote:
      '地图显示达尔卡韦至园区入口之间的乡村范围。出发前请下载离线地图：碎石路段信号不稳定。',
    roadsTitle: '路况提醒',
    roads: [
      '最后几公里为碎石路：不适合底盘过低的车、公路自行车与轮椅。',
      '雨天有泥泞和积水；请慢速行驶，并避免夜间行车，因为道路没有照明。',
      '这一带没有加油站、ATM 和商店：请在达尔卡韦先加油并取好现金。',
      '乘巴士只能到镇上，无法抵达入口：需要换乘接驳车或当地出租车。',
    ],
    relatedTitle: '出发之前',
    related: [
      { label: 'Tocoihue 瀑布的开放时间、季节与票价', href: '#schedule' },
      { label: '今日天气与未来 7 天预报', href: '#weather' },
      { label: '巴士、自驾、渡轮与航班对比', href: '#transport' },
    ],
  },
  arn: {
    eyebrow: 'Chumül amulen',
    title: 'Chumül amulen cascadas de Tocoihue, Dalcahue guive',
    subtitle:
      "Co küyen 18 km Dalcahue rüpü U-48 rupi, Tocoihue mapu mew. Puñ kilometraje ripia, señal ndaha'éi. Mapa offline egueraha.",
    routeTitle: 'Rüpü Dalcahue guive',
    route: [
      { step: 'Dalcahue ruka mew', detail: 'Dalcahue mercado ha lage rupave, Tocoihue rüpü (U-48) mew amule.' },
      { step: 'Füta rüpü mew', detail: '18 km füta rüpü mew. Ruka, koral ha lelfün ohecha; tienda ndaha\'éi.' },
      { step: 'Ripia mew', detail: 'Puñ rüpü ripia. Ñamu ñamu amule, oky mew poyví ha rüpü pichi.' },
      { step: 'Kartel ehecha', detail: "Mamüll kartel oĩ. Rüpü epu mew anümki, kintun küme: perim pya'e rupay." },
      { step: 'Estacionamiento', detail: 'Estacionamiento kon mew, mapu mew. Upéi rüpü mew amoñepu.' },
    ],
    routeNote: "25 – 35 minuto Dalcahue guive. Bus tenda mew ndoami.",
    gpsTitle: 'Coordenadas GPS',
    gps: [
      { label: 'Coordenadas', value: '-42.1365, -73.6832' },
      { label: 'Plus Code', value: 'MHW6+5W' },
      { label: 'Tenda', value: 'Google Maps pe ohecha' },
    ],
    gpsNote: "Mapa ndoill ramo, Plus Code MHW6+5W ewirintuku: señal pichi mew küzaw.",
    mapTitle: 'Mapa',
    mapNote: "Mapa Dalcahue ha kon rupachi ohechauka. Mapa offline egueraha: ripia mew señal ndoikoi.",
    roadsTitle: 'Rüpü dungu',
    roads: [
      'Puñ kilometraje ripia: auto pichi, bicicleta ha silla de ruedas ndoami.',
      'Oky mew ruka poyví; ñamu amule, puñ anümki: luz ndaha\'éi.',
      "Nafta, cajero ha tienda ndaha'éi: Dalcahue mew eguaha.",
      'Bus táva mew ami, kon mew ndoami: transfer térã taxi egueraha.',
    ],
    relatedTitle: 'Neresẽ mboyve',
    related: [
      { label: 'Cascadas de Tocoihue aravo, temporada ha tarifa', href: '#schedule' },
      { label: 'Fachi antü küyen ha 7 ára pronóstico', href: '#weather' },
      { label: 'Bus, auto, ferry ha avión', href: '#transport' },
    ],
  },
};

const heritage = {
  es: {
    eyebrow: 'Nombre y cultura',
    title: 'Qué significa Tocoihue en mapudungun y la leyenda que se cuenta',
    subtitle:
      'El nombre del lugar viene del mapudungun que se habla en Chiloé y describe el entorno. La tradición oral del sector añade una capa de historias sobre el río y el bosque.',
    nameTitle: '«Lugar de coihues»',
    nameText:
      'El nombre viene del mapudungun que se habla en Chiloé. La raíz koiwe corresponde al coihue o roble (Nothofagus dombeyi), el árbol nativo de madera resistente que domina el bosque del río, y el sufijo -hue indica lugar; de ahí la traducción más repetida, «lugar de coihues». Algunos estudios de toponimia chilena proponen además leer la primera sílaba como thog, «espeso», lo que daría «robledal espeso». El mismo sufijo aparece en Dalcahue, «lugar de dalcas», las embarcaciones de madera que se usaban para navegar entre las islas del archipiélago.',
    nameNote:
      'Estos topónimos describen lo que había en el territorio antes de la ocupación: el bosque de coihues que rodea el río es el que dio nombre al sector. Tocoihue no es una sola caída: el río Tocoihue se desploma en tres saltos, con una caída principal de hasta unos 60 m que cae en una cubeta circular rodeada de bosque siempreverde. En el mismo sector se levanta una iglesia de madera, muestra del sistema constructivo que caracteriza a las iglesias chilotas.',
    legendTitle: 'La leyenda: el salto que «borraba» el bautismo',
    legendText:
      'Chiloé es una tierra de relatos, y el que más se repite sobre este salto tiene a los brujos del archipiélago como protagonistas: se decía que bajo la cortina de agua se «borraba» el bautismo católico, y que quien quería deshacerse de él debía permanecer largas horas bajo el chorro —doce horas, un día entero e incluso siete días, según la versión— hasta quedar limpio. Esa creencia se cruza con la cosmovisión huilliche, en la que el agua no es un recurso inerte sino un newen, una fuerza viva, y cada salto o vertiente tiene un ngen, un «dueño» que lo habita. Por eso los lugares de agua se tratan con respeto, se pide permiso antes de entrar y se guarda silencio: el río es territorio con dueño.',
    legendNote:
      'Recogemos estos relatos como tradición oral del sector y no como hecho documentado: existen distintas versiones y ninguna está fijada por escrito. Si quieres escuchar la versión completa, lo mejor es preguntar a los vecinos o en la recepción del recinto.',
    respectTitle: 'Cómo visitar con respeto',
    respectText:
      'La zona es territorio ancestral huilliche y muchas de estas historias siguen teniendo sentido para las comunidades actuales. Recoge tu basura, no rayes ni marques la roca, no dejes ofrendas que no correspondan a la tradición local y evita grabar o fotografiar sin pedir permiso cuando haya personas del sector en actividades ceremoniales.',
    relatedTitle: 'Sigue explorando',
    related: [
      { label: 'Historia de Tocoihue y Dalcahue', href: '#history' },
      { label: 'Flora y fauna del bosque de las cascadas de Tocoihue', href: '#nature' },
      { label: 'Galería de fotos de las cascadas de Tocoihue', href: '#gallery' },
    ],
  },
  en: {
    eyebrow: 'Name and culture',
    title: 'What Tocoihue means in Mapudungun and the legend told about the falls',
    subtitle:
      'The name of the place comes from the Mapudungun spoken in Chiloé and describes the surroundings. The oral tradition of the area adds a layer of stories about the river and the forest.',
    nameTitle: '“Place of coihues”',
    nameText:
      'The name comes from the Mapudungun spoken in Chiloé. The root koiwe is the coihue or roble (Nothofagus dombeyi), the native tree with hard-wearing timber that dominates the forest along the river, and the suffix -hue marks a place; hence the most common translation, “place of coihues”. Some studies of Chilean toponymy also read the first syllable as thog, “dense”, giving “dense roble grove”. The same suffix appears in Dalcahue, “place of dalcas”, the wooden boats once used to navigate between the islands of the archipelago.',
    nameNote:
      'Toponyms like this describe what was in the territory before occupation: the coihue forest around the river is what gave the sector its name. Tocoihue is not a single drop: the Tocoihue river plunges over three falls, with a main drop of up to about 60 m that lands in a circular basin surrounded by evergreen forest. The same sector is also home to a wooden church, an example of the building system that characterises the churches of Chiloé.',
    legendTitle: 'The legend: the waterfall that “erased” baptism',
    legendText:
      'Chiloé is a land of stories, and the one most often told about these falls stars the archipelago’s brujos, or sorcerers: it was said that the curtain of water “erased” Catholic baptism, and that anyone wanting to be rid of it had to stay under the torrent for a long time — twelve hours, a full day, even seven days, depending on the version — until they were clean. That belief overlaps with the Huilliche worldview, in which water is not an inert resource but a newen, a living force, and every waterfall or spring has a ngen, a “keeper” that inhabits it. Water places are therefore treated with respect, permission is asked before entering and silence is kept: the river is territory with an owner.',
    legendNote:
      'We present these stories as oral tradition from the area rather than as documented fact: versions differ and none is fixed in writing. To hear the full version, the best approach is to ask local residents or the staff at reception.',
    respectTitle: 'Visiting with respect',
    respectText:
      'This is ancestral Huilliche territory and many of these stories still matter to present-day communities. Take your litter out, do not scratch or mark the rock, do not leave offerings that do not belong to local tradition, and avoid filming or photographing without permission when local people are holding ceremonial activities.',
    relatedTitle: 'Keep exploring',
    related: [
      { label: 'History of Tocoihue and Dalcahue', href: '#history' },
      { label: 'Flora and fauna of the Tocoihue waterfalls forest', href: '#nature' },
      { label: 'Photo gallery of the Tocoihue waterfalls', href: '#gallery' },
    ],
  },
  zh: {
    eyebrow: '地名与文化',
    title: 'Tocoihue 在马普切语中是什么意思，以及当地的传说',
    subtitle:
      '这里的地名来自奇洛埃地区使用的马普切语，描述的是自然环境。当地口述传统又叠加了一层关于河流与森林的故事。',
    nameTitle: '“科伊韦树之地”',
    nameText:
      '地名来自奇洛埃地区使用的马普切语。词根 koiwe 指的是 coihue（科伊韦／智利假山毛榉，Nothofagus dombeyi）——一种木质坚硬耐久、在河畔森林中占优势的原生树木；后缀 -hue 表示“地方”，因此最常见的译法是“科伊韦树之地”。智利部分地名学研究还提出把前半部分读作 thog（“茂密”），解释为“茂密的假山毛榉林”。同一个后缀也出现在达尔卡韦（Dalcahue）中，意为“达尔卡船之地”，达尔卡是过去在群岛之间航行所用的木船。',
    nameNote:
      '这类地名记录的是被占据之前这片土地上原有的东西：环绕河流的科伊韦树林，正是此地得名的由来。Tocoihue 并非只有一道瀑布：托科伊韦河在此跌落形成三处跌水，主瀑落差可达约 60 米，落入一片被常绿林环抱的圆形深潭。同一片区还保存着一座木结构教堂，是奇洛埃木教堂建筑体系的典型实例。',
    legendTitle: '传说：能“洗去洗礼”的瀑布',
    legendText:
      '奇洛埃素来多传说，而关于这处瀑布流传最广的一则，主角是群岛上的“巫师”（brujos）：据说瀑布的水幕能“洗去”天主教洗礼，凡想摆脱洗礼的人，必须在水流下长时间冲刷——按版本不同，从十二小时、一整天甚至到七天——直到变“干净”。这一信念与维利切人的水观念交叠：水不是惰性资源，而是 newen（活的力量），每处跌水或泉眼都有栖居其中的 ngen（“主人”）。因此涉水之地需以敬畏之心对待：进入前要先“请求许可”，并保持安静——河流是有主人的领地。',
    legendNote:
      '我们把这段传说作为当地口述传统呈现，而非既成文献事实：说法各有版本，也没有固定的书面记录。若想听完整版本，最好向当地居民或园区接待处请教。',
    respectTitle: '如何有尊重地游览',
    respectText:
      '这里是维利切人的祖居地，许多故事对今天的社区仍有意义。请把垃圾带走，不要在岩面上刻画留名，不要留下不符合当地传统的祭品；若遇到当地人举行仪式活动，请不要未经允许拍摄录像。',
    relatedTitle: '继续探索',
    related: [
      { label: 'Tocoihue 与达尔卡韦的历史', href: '#history' },
      { label: 'Tocoihue 瀑布森林的动植物', href: '#nature' },
      { label: 'Tocoihue 瀑布照片图库', href: '#gallery' },
    ],
  },
  arn: {
    eyebrow: 'Üy ha kimün',
    title: "Chem Tocoihue mapudungun mew, ha ngütram",
    subtitle:
      "Üy mapudungun guive, Chiloé mew. Mapu ha aliwen dungu omombe'u. Ngütram rupa ha aliwen.",
    nameTitle: '«Coihue mapu»',
    nameText:
      'Üy mapudungun guive, Chiloé mew. Koiwe = coihue (Nothofagus dombeyi, kütra fuerte aliwen), rupa aliwen mew; -hue = «mapu». Upéwentu «coihue mapu». Kake toponimia kimün mew thog = «füta aliwen», «robledal espeso». Dalcahue mew kakewme sufijo: «dalca mapu», dalca füta wampo.',
    nameNote:
      "Üy mapu mboyve oĩchi dungu omombe'u: coihue aliwen rupa ykére, üy che. Tocoihue peteĩ rupa ndaha'éi: Tocoihue lewfü küla rupa oĩ, füta rupa 60 m rupi, ko füta mew. Kakewme ko mapu mew ruka kütral oĩ, Chiloé iglesia küzaw rupive.",
    legendTitle: 'Ngütram: rupa bautismo «borra» mew',
    legendText:
      'Chiloé ngütram mapu. Füta ngütram: Chiloé brujo kuéra rupa küzaway bautismo «borrar» mew — doce ora, kiñe antü, regle antü rupave. Huilliche kimün mew ko küme küzaw, newen: rupa ha manantial ngen oĩ. Upéwentu ko mapu poyümkangey: kon mboyve porandungey, ñuke dungu. Rupa ngen oĩ.',
    legendNote:
      "Ngütram omombe'u che kütral guive, kavisa mew ndaha'éi: kakewme dungu, wirin ndaha'éi. Kom eitun rupive, che térã recepción pe eporandu.",
    respectTitle: 'Poyüm rupive perim',
    respectText:
      "Huilliche mapu tüfey. Basura egueru, rupa kavisa anümki, ofrenda aliñ anümki, ha persona küzaw mew oĩ ramo, eñangümüm anümki.",
    relatedTitle: 'Hána amule',
    related: [
      { label: 'Tocoihue ha Dalcahue ngütram', href: '#history' },
      { label: 'Cascadas de Tocoihue aliwen mongen', href: '#nature' },
      { label: 'Cascadas de Tocoihue ta\'anga', href: '#gallery' },
    ],
  },
};

const accessFaq = {
  es: {
    id: 'access',
    title: 'Horarios y cómo llegar',
    items: [
      {
        q: '¿Cuál es el horario de las Cascadas de Tocoihue?',
        a: 'El recinto abre de día. En temporada alta (diciembre a marzo) el horario habitual es de aproximadamente 10:00 a 20:00, con el último ingreso recomendado al menos una hora antes del cierre. Fuera de esa temporada no hay un horario fijo publicado: el cierre depende de la luz y del clima. Al ser una reserva privada, el acceso puede cerrarse por lluvia intensa, temporal de viento o crecida del río, así que conviene confirmar el mismo día por teléfono o WhatsApp.',
      },
      {
        q: '¿Cómo llegar a las Cascadas de Tocoihue desde Dalcahue?',
        a: 'Desde el centro de Dalcahue toma el camino hacia el interior de la comuna por la ruta U-48, en dirección al sector de Tocoihue, y continúa unos 20 km. Los últimos kilómetros son de ripio y no hay señalización continua: busca los carteles de madera que anuncian el acceso, donde está el estacionamiento. En vehículo propio son unos 30 minutos, más si el camino está mojado. Para GPS usa las coordenadas -42.3045792, -73.4376721 o el Plus Code MHW6+5W.',
      },
      {
        q: '¿Cómo llego si no tengo auto?',
        a: 'Los buses interurbanos llegan a Dalcahue o Castro, pero no suben hasta la entrada del recinto. Desde el pueblo hay que combinar con transfer, taxi local o una excursión contratada. Ten en cuenta que no hay comercio, cajeros ni bencina en el sector rural, así que resuelve combustible, efectivo y agua antes de salir.',
      },
      {
        q: '¿Cuál es la mejor época para visitar y cuánto se demora el recorrido?',
        a: 'La primavera (septiembre a noviembre) ofrece el equilibrio más cómodo: más horas de luz, sendero en mejores condiciones y buena visibilidad, con el caudal todavía generoso. El verano tiene el horario más predecible pero más visitantes y más congestión en el camino de ripio. En invierno el salto es más potente, pero hay barro y menos luz. La visita es siempre a pie por un sendero de bosque, así que calcula calzado adecuado y tiempo según tu ritmo.',
      },
    ],
  },
  en: {
    id: 'access',
    title: 'Hours and directions',
    items: [
      {
        q: 'What are the opening hours of the Tocoihue Waterfalls?',
        a: 'The reserve opens during daylight. In high season (December to March) the usual hours are roughly 10:00 to 20:00, with last entry recommended at least an hour before closing. Outside that season there is no published fixed timetable: closing depends on daylight and the weather. As a private reserve, access can close in heavy rain, strong wind or when the river rises, so confirm on the day by phone or WhatsApp.',
      },
      {
        q: 'How do I get to the Tocoihue Waterfalls from Dalcahue?',
        a: 'From central Dalcahue take the road inland along route U-48 towards the Tocoihue sector and continue for about 20 km. The last kilometres are gravel with no continuous signage: look for the wooden signs marking the entrance, where the parking area is. By car it takes around 30 minutes, longer when the road is wet. For GPS use the coordinates -42.3045792, -73.4376721 or the Plus Code MHW6+5W.',
      },
      {
        q: 'How do I get there without a car?',
        a: 'Intercity buses reach Dalcahue or Castro but do not go up to the entrance. From the town you need to combine a transfer, a local taxi or a booked excursion. Bear in mind there are no shops, cash machines or fuel in the rural sector, so sort out fuel, cash and water before you set off.',
      },
      {
        q: 'What is the best season to visit and how long does the walk take?',
        a: 'Spring (September to November) offers the most comfortable balance: more daylight, a trail in better condition and good visibility, with the flow still generous. Summer has the most predictable hours but more visitors and more congestion on the gravel road. In winter the falls are at their most powerful, but there is mud and less daylight. The visit is always on foot along a forest trail, so allow for suitable footwear and time to match your pace.',
      },
    ],
  },
  zh: {
    id: 'access',
    title: '开放时间与怎么去',
    items: [
      {
        q: 'Tocoihue 瀑布的开放时间是怎样的？',
        a: '园区白天开放。旺季（12 月至次年 3 月）通常约为 10:00 至 20:00，建议最晚在闭园前一小时入园。旺季之外没有公布固定时间：闭园时间取决于日照和天气。由于是私人园区，遇强降雨、大风或河水上涨时可能关闭，建议当天通过电话或 WhatsApp 确认。',
      },
      {
        q: '从达尔卡韦怎么去 Tocoihue 瀑布？',
        a: '从达尔卡韦镇中心沿通往市镇内陆的 U-48 公路向 Tocoihue 方向行驶，继续约 20 公里。最后几公里是碎石路且没有连续路标：请留意标示入口的木牌，停车场就在入口旁。自驾约需 30 分钟，路面潮湿时更久。GPS 可用坐标 -42.3045792, -73.4376721 或 Plus Code MHW6+5W。',
      },
      {
        q: '没有车怎么过去？',
        a: '城际巴士可以到达达尔卡韦或卡斯特罗，但不会直达园区入口。从镇上需要换乘接驳车、当地出租车或参加预约的一日游。请注意乡村地带没有商店、ATM 和加油站，出发前请先解决燃油、现金和饮水。',
      },
      {
        q: '什么季节去最好？步行游览需要多久？',
        a: '春季（9 月至 11 月）体验最均衡：日照更长、步道状况更好、能见度佳，水量也还充沛。夏季开放时间最可预期，但游客最多，碎石路也更容易拥堵。冬季瀑布最壮观，但地面泥泞、日照更短。游览全程为林间步道步行，请准备合适的鞋子并按自己的节奏预留时间。',
      },
    ],
  },
  arn: {
    id: 'access',
    title: 'Aravo ha chumül amulen',
    items: [
      {
        q: '¿Chumül aravo Cascadas de Tocoihue?',
        a: "Antü mew nülay. Temporada alta (diciembre – marzo) mew 10:00 – 20:00, rüpüchay kon peteĩ ora mboyve. Hána küyen mew aravo fijo ndaha'éi: antü ha küyen rupive. Tenda privada rupive, füta oky térã viento mew nülay: fachi antü teléfono mew eporandu.",
      },
      {
        q: '¿Chumül amulen Dalcahue guive?',
        a: "Dalcahue ruka mew rüpü U-48 mew amule, Tocoihue küpa, 20 km. Puñ kilometraje ripia, kartel ndaha'éi: mamüll kartel ehecha, estimacionamiento mew. 30 minuto. GPS: -42.3045792, -73.4376721 térã MHW6+5W.",
      },
      {
        q: '¿Auto ndaha\'éi ramo, chumül amulen?',
        a: "Bus Dalcahue térã Castro mew ami, hána kon mew ndoami. Transfer, taxi térã excursión egueraha. Tienda, cajero ha nafta ndaha'éi: Dalcahue mew eguaha.",
      },
      {
        q: '¿Chumül temporada küme, ha chumül puku perim?',
        a: "Primavera (septiembre – noviembre) küme: antü puku, sendero iporã, perim ohecha. Verano aravo küme hána tapicha heta, ripia püjü. Invierno rupa tuicháva hána ruka poyví ha antü pichi. Perim rüpü mew: sapatu küme egueraha.",
      },
    ],
  },
};

const legendFaq = {
  es: {
    q: '¿Existe una leyenda sobre las cascadas de Tocoihue?',
    a: 'Existe una tradición oral, más que una historia fijada por escrito. La versión más repetida cuenta que los brujos de Chiloé usaban el salto para «borrar» el bautismo: quien quería deshacerse de él debía permanecer bajo la cortina de agua desde doce horas hasta siete días, según la versión. A esa creencia se suma la cosmovisión huilliche, en la que el agua es un newen —una fuerza viva— y cada salto o vertiente tiene un ngen o «dueño»; por eso los lugares de agua se tratan con respeto y se pide permiso antes de entrar. Las versiones varían y no hay una canónica. En el mismo sector se levanta además una iglesia de madera, muestra del sistema constructivo típico de las iglesias chilotas.',
  },
  en: {
    q: 'Is there a legend about the Tocoihue waterfalls?',
    a: 'There is an oral tradition rather than a story fixed in writing. The version most often told says the brujos of Chiloé used the falls to “erase” baptism: anyone wanting to be rid of it had to stay under the curtain of water for anywhere from twelve hours to seven days, depending on the version. That belief overlaps with the Huilliche worldview, in which water is a newen — a living force — and every waterfall or spring has a ngen, a “keeper”; that is why water places are treated with respect and permission is asked before entering. Versions vary and there is no canonical one. The same sector is also home to a wooden church, an example of the building system typical of the churches of Chiloé.',
  },
  zh: {
    q: 'Tocoihue 瀑布有传说吗？',
    a: '这里流传的是口述传统，而非有文字定本的传说。流传最广的版本说，奇洛埃的“巫师”会利用这处瀑布“洗去”洗礼：想摆脱洗礼的人必须在水幕下停留十二小时到七天不等，视版本而定。这一信念又与维利切人的观念交叠——水是 newen（活的力量），每处跌水或泉眼都有栖身的 ngen（“主人”），因此涉水之地需以敬畏之心对待、进入前要先“请求许可”。说法各有版本，并无标准本。同一片区还保留着一座木教堂，是奇洛埃木教堂典型建造体系的实例。',
  },
  arn: {
    q: '¿Ngütram oĩ Cascadas de Tocoihue mew?',
    a: "Ngütram oĩ, wirin mew ndaha'éi. Füta ngütram: Chiloé brujo kuéra rupa küzaway bautismo «borrar» mew — doce ora, kiñe antü, regle antü rupave. Huilliche kimün mew ko newen; rupa ha manantial ngen oĩ. Upéwentu ko mapu poyümkangey, kon mboyve porandungey. Che kakewme dungu omombe'u. Kakewme ko mapu mew ruka kütral oĩ, Chiloé iglesia küzaw rupive.",
  },
};

// Safety net: normalise legacy figures that are scattered across the
// pre-existing copy (hero, intro, transport, facilities, FAQ).
// Values verified against Wikipedia (Río Tocoihue) and the attraction config.
const SCRUB = [
  // Dalcahue → falls drive distance (~20 km)
  ['18 km', '20 km'],
  ['18 公里', '20 公里'],
  // Summer opening hours (10:00–20:00)
  ['~09:00–18:00', '~10:00–20:00'],
  ['~09:00 a 18:00', '~10:00 a 20:00'],
  ['09:00 a 18:00', '10:00 a 20:00'],
  ['09:00 to 18:00', '10:00 to 20:00'],
  ['09:00 至 18:00', '10:00 至 20:00'],
  ['09:00–18:00', '10:00–20:00'],
  ['09:00 – 18:00', '10:00 – 20:00'],
  // Ticket band (adult 3.000 / senior 2.000 / child 1.000 CLP)
  ['CLP 2.000 y 4.000', 'CLP 1.000 y 3.000'],
  ['CLP 2,000 - 4,000', 'CLP 1,000 - 3,000'],
  ['CLP 2.000 - 4.000', 'CLP 1.000 - 3.000'],
  ['2,000 - 4,000 智利比索', '1,000 - 3,000 智利比索'],
  ['2.000 – 4.000', '1.000 – 3.000'],
  ['2,000 – 4,000', '1,000 – 3,000'],
  // Drive time from Dalcahue (~30 min)
  ['25–35 min', '30 min'],
  ['25–35 分钟', '30 分钟'],
  ['25 a 35 minutos', 'unos 30 minutos'],
  ['25 to 35 minutes', 'about 30 minutes'],
  ['25 至 35 分钟', '约 30 分钟'],
  ['25 – 35 minuto', '30 minuto'],
  // GPS coordinates (must match src/config/attraction.ts)
  ['-42.1365, -73.6832', '-42.3045792, -73.4376721'],
];

function scrubValue(value) {
  if (typeof value === 'string') {
    let out = value;
    for (const [from, to] of SCRUB) out = out.split(from).join(to);
    return out;
  }
  if (Array.isArray(value)) return value.map(scrubValue);
  if (value && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value)) out[key] = scrubValue(value[key]);
    return out;
  }
  return value;
}

for (const lang of Object.keys(PATHS)) {
  const path = PATHS[lang];
  let json = JSON.parse(readFileSync(path, 'utf8'));

  json.meta = { ...json.meta, ...meta[lang] };
  json.header = { ...json.header, ...header[lang] };
  json.transportSection = { ...json.transportSection, title: transportTitles[lang] };

  json.schedule = schedule[lang];
  json.directions = directions[lang];
  json.heritage = heritage[lang];

  const categories = json.faq.categories;
  const accessIndex = categories.findIndex((c) => c.id === 'access');
  if (accessIndex === -1) categories.unshift(accessFaq[lang]);
  else categories[accessIndex] = accessFaq[lang];

  const geo = categories.find((c) => c.id === 'geo');
  if (geo) {
    const legendIndex = geo.items.findIndex((i) => i.q === legendFaq[lang].q);
    if (legendIndex === -1) geo.items.push(legendFaq[lang]);
    else geo.items[legendIndex] = legendFaq[lang];
  }

  json = scrubValue(json);

  writeFileSync(path, `${JSON.stringify(json, null, 2)}\n`, 'utf8');
  console.log('patched', path);
}
