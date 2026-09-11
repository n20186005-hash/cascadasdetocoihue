/**
 * Single-attraction SEO entity configuration.
 *
 * Every value here is the "source of truth" for:
 *  - NAP consistency (Name / Address / Phone) across header, footer and schema
 *  - JSON-LD structured data (TouristAttraction, FAQPage, BreadcrumbList, WebSite)
 *  - Open Graph / Twitter cards (canonical URL, hero image, image alt)
 *
 * Keep these values identical to the Google Business Profile / Google Maps
 * listing so search engines can bind this URL to the physical entity.
 */

export const DOMAIN_NAME = 'cascadasdetocoihue.com';
export const SITE_URL = `https://${DOMAIN_NAME}`;

/** Google Maps embed `src` (from the official listing). */
export const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5244.548750021209!2d-73.4376721!3d-42.30457919999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9618a05c09916cdf%3A0x40a8a109637dc65b!2sCascadas%20de%20Tocoihue!5e1!3m2!1szh-CN!2sus!4v1789096900141!5m2!1szh-CN!2sus';

export const attraction = {
  /** {{ATTRACTION_FULL_NAME}} — official full name. */
  fullName: 'Cascadas de Tocoihue',
  /** {{ATTRACTION_SHORT_NAME}} — common short name / domain meaning. */
  shortName: 'Tocoihue',
  /** {{CITY_NAME}} */
  city: 'Dalcahue',
  /** Island / province level, used for NAP detail. */
  province: 'Chiloé',
  /** {{STATE_PROVINCE}} */
  stateProvince: 'Los Lagos',
  /** {{COUNTRY_NAME}} */
  country: 'Chile',
  /** {{COUNTRY_CODE_2LETTER}} */
  countryCode: 'CL',
  /** {{POSTAL_CODE}} (generic postal code of the Dalcahue commune). */
  postalCode: '5730000',
  /** Street level description used inside PostalAddress. */
  streetAddress: 'Sector rural Tocoihue, Ruta U-48',
  /** {{LATITUDE}} */
  latitude: -42.3045792,
  /** {{LONGITUDE}} */
  longitude: -73.4376721,
  /** Google Plus Code of the listing. */
  plusCode: 'MHW6+5W Calen, Dalcahue, Chile',
  /** Contact phone as published on the listing. */
  telephone: '+56988776643',
  telephoneDisplay: '+56 9 8877 6643',
  /** {{MAPS_SHARE_URL}} */
  mapsShareUrl: 'https://maps.app.goo.gl/Ag8uwDVGm1rjUaeQA',
  /** {{MAPS_EMBED_SRC}} */
  mapsEmbedSrc: MAPS_EMBED_SRC,
  /** {{GOVT_TOURISM_URL}} — official tourism authority. */
  govtTourismUrl: 'https://chile.travel/',
  /** Local government / municipality reference. */
  municipalityUrl: 'https://www.munidalcahue.cl',
  /** Social share image (1200×630, absolute URL) used for OG / Twitter cards. */
  heroImage: `${SITE_URL}/og/cascadas-de-tocoihue.jpg`,
  /** Referential ticket price band, kept in sync with the visible "tarifas" copy. */
  priceRange: 'CLP 1.000–3.000',
  /** Category label used by Google Maps. */
  category: 'Nature Reserve',
  /** Whether entry to the site is free of charge (Tocoihue charges a fee). */
  isAccessibleForFree: false,
  /** Rating snapshot shown on the page (kept in sync manually). */
  rating: 4.7,
  reviewCount: 6081,
} as const;

/** Canonical anchor id of the entity inside the Knowledge Graph. */
export const ATTRACTION_ID = `${SITE_URL}/#attraction`;
export const DESTINATION_ID = `${SITE_URL}/#destination`;

/**
 * Published access window.
 *
 * The property is a private conservation reserve open during daylight, and the
 * fixed timetable only applies in high season — the visible copy always tells
 * visitors to confirm by phone. This mirrors that, so the schema never claims
 * more precision than the page does.
 */
export const visitWindow = {
  opens: '10:00',
  closes: '20:00',
  highSeasonFrom: '2026-12-01',
  highSeasonThrough: '2027-03-31',
  timeZone: 'America/Santiago',
} as const;

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

/** Geo coordinates shared by every node that describes the same physical place. */
export const geoCoordinates = {
  '@type': 'GeoCoordinates',
  latitude: attraction.latitude,
  longitude: attraction.longitude,
} as const;

/** Postal address shared by the attraction and the destination node. */
export const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: attraction.streetAddress,
  addressLocality: attraction.city,
  addressRegion: attraction.stateProvince,
  postalCode: attraction.postalCode,
  addressCountry: attraction.countryCode,
} as const;

type JsonLd = Record<string, unknown>;

/** TouristAttraction (+ geo + address + image) structured data. */
export function buildAttractionJsonLd(lang = 'es', pageUrl = SITE_URL): JsonLd {
  const names: Record<string, { alt: string; desc: string }> = {
    es: {
      alt: 'Cascadas de Tocoihue',
      desc: `Guía completa de visitantes de ${attraction.fullName} en ${attraction.city}, ${attraction.stateProvince}, ${attraction.country}: historia, entorno de bosque nativo, cómo llegar y datos prácticos.`,
    },
    en: {
      alt: 'Tocoihue Waterfalls',
      desc: `Comprehensive visitor guide to ${attraction.fullName} in ${attraction.city}, ${attraction.stateProvince}, ${attraction.country}: history, native forest setting, how to get there and practical information.`,
    },
    zh: {
      alt: 'Tocoihue 瀑布',
      desc: `位于${attraction.country}${attraction.stateProvince}大区${attraction.city}的 ${attraction.fullName} 完整游客指南：历史、原生森林环境、交通方式与实用信息。`,
    },
    arn: {
      alt: 'Cascadas de Tocoihue',
      desc: `Guía completa de ${attraction.fullName} en ${attraction.city}, ${attraction.stateProvince}, ${attraction.country}.`,
    },
  };

  const localized = names[lang] ?? names.es;

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': ATTRACTION_ID,
    name: attraction.fullName,
    alternateName: [
      attraction.shortName,
      `${attraction.city} ${attraction.fullName}`,
      localized.alt,
    ].filter((v, i, a) => a.indexOf(v) === i),
    description: localized.desc,
    url: pageUrl,
    image: [attraction.heroImage],
    isAccessibleForFree: attraction.isAccessibleForFree,
    priceRange: attraction.priceRange,
    publicAccess: true,
    touristType: ['Nature lovers', 'Families', 'Hikers'],
    address: postalAddress,
    geo: geoCoordinates,
    hasMap: attraction.mapsShareUrl,
    telephone: attraction.telephone,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAYS_OF_WEEK,
        opens: visitWindow.opens,
        closes: visitWindow.closes,
        validFrom: visitWindow.highSeasonFrom,
        validThrough: visitWindow.highSeasonThrough,
      },
    ],
    isPartOf: { '@id': DESTINATION_ID },
    sameAs: [attraction.mapsShareUrl, attraction.govtTourismUrl, attraction.municipalityUrl],
    /** Internal deep links: the sections that answer the most common queries. */
    hasPart: [
      { '@type': 'WebPageElement', name: 'Horarios y tarifas', url: `${pageUrl}#schedule` },
      { '@type': 'WebPageElement', name: 'Cómo llegar', url: `${pageUrl}#directions` },
      { '@type': 'WebPageElement', name: 'Nombre, origen y leyenda', url: `${pageUrl}#heritage` },
      { '@type': 'WebPageElement', name: 'Galería de fotos', url: `${pageUrl}#gallery` },
    ],
  };
}

/**
 * TouristDestination node for the surrounding area.
 *
 * The attraction itself is best described as a TouristAttraction, but Google
 * also uses destination-level context ("tocoihue chiloe", "cascada chiloe") for
 * local discovery, so the city/region is modelled as its own entity and linked
 * back to the attraction through `includesAttraction`.
 */
export function buildTouristDestinationJsonLd(lang = 'es', pageUrl = SITE_URL): JsonLd {
  const descriptions: Record<string, string> = {
    es: `Dalcahue es la comuna de la Isla Grande de Chiloé donde se encuentran las ${attraction.fullName}, a unos 20 km del pueblo por la ruta U-48. La zona combina bosque nativo templado lluvioso, iglesias patrimoniales y el territorio ancestral huilliche.`,
    en: `Dalcahue is the commune on the Isla Grande de Chiloé where ${attraction.fullName} is located, about 20 km from the town along route U-48. The area combines temperate rainforest, heritage wooden churches and ancestral Huilliche territory.`,
    zh: `达尔卡韦是奇洛埃大岛上的一个市镇，${attraction.fullName} 就位于其乡村地带，距镇中心约 20 公里，经 U-48 公路可达。这一带兼具温带雨林、世界遗产木教堂与维利切原住民文化。`,
    arn: `Dalcahue mapu mew ${attraction.fullName} oĩ, Isla Grande de Chiloé mew, 20 km táva guive ruta U-48 rupi. Bosque nativo, iglesia patrimonio ha Huilliche mapu.`,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': DESTINATION_ID,
    name: `${attraction.city}, ${attraction.province}`,
    alternateName: [`${attraction.city}`, `${attraction.province}`, 'Isla Grande de Chiloé'],
    description: descriptions[lang] ?? descriptions.es,
    url: pageUrl,
    address: postalAddress,
    geo: geoCoordinates,
    touristType: ['Nature lovers', 'Culture travellers', 'Families'],
    includesAttraction: { '@id': ATTRACTION_ID },
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: `${attraction.stateProvince}, ${attraction.country}`,
    },
    hasMap: attraction.mapsShareUrl,
  };
}

/** BreadcrumbList following Attraction → City → Region → Country. */
export function buildBreadcrumbJsonLd(lang = 'es', homeLabel = 'Inicio'): JsonLd {
  const url = `${SITE_URL}/${lang}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: url },
      { '@type': 'ListItem', position: 2, name: attraction.fullName, item: url },
      { '@type': 'ListItem', position: 3, name: attraction.city, item: url },
      { '@type': 'ListItem', position: 4, name: attraction.stateProvince, item: url },
      { '@type': 'ListItem', position: 5, name: attraction.country, item: url },
    ],
  };
}

/** WebSite node that ties the domain to its publisher/entity. */
export function buildWebSiteJsonLd(lang = 'es'): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/${lang}`,
    name: attraction.fullName,
    inLanguage: lang === 'zh' ? 'zh-CN' : lang,
    about: { '@id': ATTRACTION_ID },
    publisher: { '@id': ATTRACTION_ID },
  };
}

/**
 * FAQPage built directly from the visible FAQ content, so the structured data
 * always matches what users see on the page.
 */
export function buildFaqJsonLd(items: Array<{ q: string; a: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
