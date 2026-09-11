/**
 * Server-side weather data layer for the Tocoihue forecast module.
 *
 * The module talks to the Open-Meteo forecast API from the server and keeps a
 * short-lived in-process cache, so a full site build only hits the network once
 * per TTL window instead of once per rendered page. The page is rendered with
 * that payload (no layout shift, works without JavaScript) and a small inline
 * script refreshes the same markup from the browser afterwards.
 */
import { attraction } from '../config/attraction';

export const WEATHER_TIMEZONE = 'America/Santiago';

const ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const CACHE_TTL_MS = 30 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 8000;

export type WeatherGroup =
  | 'clear'
  | 'mainlyClear'
  | 'partlyCloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'showers'
  | 'snow'
  | 'thunderstorm';

export interface WeatherCurrent {
  /** Observation timestamp in the local timezone of the attraction. */
  time: string;
  code: number;
  group: WeatherGroup;
  temperature: number;
  apparent: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  isDay: boolean;
}

export interface WeatherDay {
  date: string;
  code: number;
  group: WeatherGroup;
  max: number;
  min: number;
  precipitationSum: number;
  precipitationProbability: number;
  windMax: number;
  uvMax: number | null;
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  timezone: string;
  fetchedAt: string;
  current: WeatherCurrent;
  days: WeatherDay[];
}

/** Normalises a WMO weather code into one of the groups we translate in i18n. */
export function weatherGroup(code: number): WeatherGroup {
  if (code === 0) return 'clear';
  if (code === 1) return 'mainlyClear';
  if (code === 2) return 'partlyCloudy';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'thunderstorm';
  return 'overcast';
}

/** Builds the request URL (also mirrored by the browser-side refresh script). */
export function buildWeatherUrl(forecastDays = 7): string {
  const params = new URLSearchParams({
    latitude: String(attraction.latitude),
    longitude: String(attraction.longitude),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'uv_index_max',
      'sunrise',
      'sunset',
    ].join(','),
    timezone: WEATHER_TIMEZONE,
    forecast_days: String(forecastDays),
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
  });
  return `${ENDPOINT}?${params.toString()}`;
}

function asNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** Maps the raw API payload onto the shape used by the component. */
export function normalizeWeather(raw: any): WeatherData | null {
  if (!raw?.current || !raw?.daily?.time) return null;

  const code = asNumber(raw.current.weather_code);

  const current: WeatherCurrent = {
    time: String(raw.current.time ?? ''),
    code,
    group: weatherGroup(code),
    temperature: asNumber(raw.current.temperature_2m),
    apparent: asNumber(raw.current.apparent_temperature),
    humidity: asNumber(raw.current.relative_humidity_2m),
    precipitation: asNumber(raw.current.precipitation),
    windSpeed: asNumber(raw.current.wind_speed_10m),
    windDirection: asNumber(raw.current.wind_direction_10m),
    isDay: raw.current.is_day === 1 || raw.current.is_day === true,
  };

  const days: WeatherDay[] = (raw.daily.time as string[]).map((date, i) => {
    const dayCode = asNumber(raw.daily.weather_code?.[i]);
    const uv = raw.daily.uv_index_max?.[i];
    return {
      date,
      code: dayCode,
      group: weatherGroup(dayCode),
      max: asNumber(raw.daily.temperature_2m_max?.[i]),
      min: asNumber(raw.daily.temperature_2m_min?.[i]),
      precipitationSum: asNumber(raw.daily.precipitation_sum?.[i]),
      precipitationProbability: asNumber(raw.daily.precipitation_probability_max?.[i]),
      windMax: asNumber(raw.daily.wind_speed_10m_max?.[i]),
      uvMax: uv === null || uv === undefined ? null : asNumber(uv),
      sunrise: String(raw.daily.sunrise?.[i] ?? ''),
      sunset: String(raw.daily.sunset?.[i] ?? ''),
    };
  });

  return {
    timezone: raw.timezone ?? WEATHER_TIMEZONE,
    fetchedAt: new Date().toISOString(),
    current,
    days,
  };
}

/* ------------------------------------------------------------------ *
 * Advice engine
 *
 * Visitors do not want numbers, they want to know what to do. The rules
 * below turn the forecast into plain-language, actionable advice: what to
 * wear, how to plan the outing and what to pack. Rules are declared as
 * plain data so the very same table can be serialised into the page and
 * re-evaluated by the browser refresh script — one source of truth.
 * ------------------------------------------------------------------ */

export type WindScaleId = 'calm' | 'breeze' | 'moderate' | 'strong' | 'gale';

/** Plain-language wind band, so we never show a raw meteorological term. */
export function windScaleId(kmh: number): WindScaleId {
  if (kmh < 12) return 'calm';
  if (kmh < 29) return 'breeze';
  if (kmh < 39) return 'moderate';
  if (kmh < 62) return 'strong';
  return 'gale';
}

/** Everything the rules are allowed to look at, flattened for easy matching. */
export interface WeatherFacts {
  temp: number;
  max: number;
  min: number;
  range: number;
  pop: number;
  rain: number;
  uv: number;
  windMax: number;
  windNow: number;
  group: WeatherGroup;
}

export function buildFacts(data: WeatherData): WeatherFacts | null {
  const day = data.days?.[0];
  if (!day) return null;
  return {
    temp: data.current.temperature,
    max: day.max,
    min: day.min,
    range: Math.max(0, day.max - day.min),
    pop: day.precipitationProbability,
    rain: day.precipitationSum,
    uv: day.uvMax ?? 0,
    windMax: day.windMax,
    windNow: data.current.windSpeed,
    group: day.group,
  };
}

export type NumericField = 'temp' | 'max' | 'min' | 'range' | 'pop' | 'rain' | 'uv' | 'windMax' | 'windNow';
export type NumericOp = '>=' | '<=' | '>' | '<';

export interface NumericCondition {
  field: NumericField;
  op: NumericOp;
  value: number;
}

/**
 * Group conditions carry an array value, which is how the browser-side
 * evaluator tells them apart from numeric conditions.
 */
export interface GroupCondition {
  field: 'group';
  op: 'in';
  value: WeatherGroup[];
}

export type AdviceCondition = NumericCondition | GroupCondition;

/** `risk` is the red banner, `gear` only contributes packing chips. */
export type AdviceGroup = 'risk' | 'outfit' | 'plan' | 'gear';

export interface AdviceRule {
  id: string;
  group: AdviceGroup;
  /** Key inside `weather.tips`; risk/outfit/plan rules only. */
  tip?: string;
  /** Keys inside `weather.gear`; collected in rule order, de-duplicated. */
  gear?: string[];
  /** All conditions must match (AND). An empty list always matches. */
  when: AdviceCondition[];
}

/**
 * Adapted to this place: a rainforest waterfall on an island. Rain, mud,
 * slippery rock, rising river levels, fog on the channel and cold wind
 * matter far more than the coastal-resort scenarios generic apps show.
 */
export const ADVICE_RULES: AdviceRule[] = [
  // Warnings — highest priority, rendered first and in red.
  // No rain gear here on purpose: the outfit rules already add it, and adding
  // it twice would push the packing list over its limit.
  { id: 'risk-thunder', group: 'risk', tip: 'riskThunder', when: [{ field: 'group', op: 'in', value: ['thunderstorm'] }] },
  { id: 'risk-flood', group: 'risk', tip: 'riskFlood', when: [{ field: 'rain', op: '>=', value: 15 }] },
  { id: 'risk-ice', group: 'risk', tip: 'riskIce', gear: ['boots'], when: [{ field: 'min', op: '<=', value: 1 }] },
  { id: 'risk-snow', group: 'risk', tip: 'riskIce', gear: ['boots'], when: [{ field: 'group', op: 'in', value: ['snow'] }] },
  { id: 'risk-gale', group: 'risk', tip: 'riskGale', when: [{ field: 'windMax', op: '>=', value: 62 }] },
  { id: 'risk-fog', group: 'risk', tip: 'riskFog', gear: ['mask'], when: [{ field: 'group', op: 'in', value: ['fog'] }] },
  { id: 'risk-heat', group: 'risk', tip: 'riskHeat', gear: ['water'], when: [{ field: 'max', op: '>=', value: 32 }] },

  // What to wear.
  { id: 'outfit-rain-calm', group: 'outfit', tip: 'outfitRain', gear: ['umbrella', 'raincoat'], when: [{ field: 'pop', op: '>=', value: 60 }, { field: 'windMax', op: '<', value: 39 }] },
  { id: 'outfit-rain-wind', group: 'outfit', tip: 'outfitRain', gear: ['raincoatWind'], when: [{ field: 'pop', op: '>=', value: 60 }, { field: 'windMax', op: '>=', value: 39 }] },
  { id: 'outfit-cold', group: 'outfit', tip: 'outfitCold', gear: ['warmCoat', 'scarf'], when: [{ field: 'max', op: '<=', value: 10 }] },
  { id: 'outfit-wind', group: 'outfit', tip: 'outfitWind', when: [{ field: 'windMax', op: '>=', value: 39 }] },
  // Bands are exclusive: otherwise a cold day would suggest both a thick coat and a light jacket.
  { id: 'outfit-cool', group: 'outfit', tip: 'outfitCool', gear: ['jacket'], when: [{ field: 'max', op: '>', value: 10 }, { field: 'max', op: '<=', value: 16 }] },
  { id: 'outfit-hot', group: 'outfit', tip: 'outfitHot', when: [{ field: 'max', op: '>=', value: 32 }] },
  { id: 'outfit-warm', group: 'outfit', tip: 'outfitWarm', when: [{ field: 'max', op: '>=', value: 26 }, { field: 'max', op: '<', value: 32 }] },
  { id: 'outfit-range', group: 'outfit', tip: 'outfitRange', gear: ['jacket'], when: [{ field: 'range', op: '>', value: 8 }] },

  // How to plan the outing itself.
  { id: 'plan-thunder', group: 'plan', tip: 'planThunder', when: [{ field: 'group', op: 'in', value: ['thunderstorm'] }] },
  { id: 'plan-flood', group: 'plan', tip: 'planFlood', when: [{ field: 'rain', op: '>=', value: 15 }] },
  { id: 'plan-heavy-rain', group: 'plan', tip: 'planHeavyRain', when: [{ field: 'rain', op: '>=', value: 5 }] },
  { id: 'plan-heavy-pop', group: 'plan', tip: 'planHeavyRain', when: [{ field: 'pop', op: '>=', value: 85 }] },
  { id: 'plan-fog', group: 'plan', tip: 'planFog', when: [{ field: 'group', op: 'in', value: ['fog'] }] },
  { id: 'plan-gale', group: 'plan', tip: 'planGale', when: [{ field: 'windMax', op: '>=', value: 50 }] },
  // "Light rain" only when the day is not already flagged as heavy rain above.
  { id: 'plan-rain-pop', group: 'plan', tip: 'planLightRain', gear: ['boots'], when: [{ field: 'pop', op: '>=', value: 40 }, { field: 'pop', op: '<', value: 85 }, { field: 'rain', op: '<', value: 5 }] },
  { id: 'plan-rain-group', group: 'plan', tip: 'planLightRain', gear: ['boots'], when: [{ field: 'group', op: 'in', value: ['drizzle', 'rain', 'showers'] }, { field: 'pop', op: '<', value: 85 }, { field: 'rain', op: '<', value: 5 }] },
  { id: 'plan-hot', group: 'plan', tip: 'planHot', when: [{ field: 'max', op: '>=', value: 32 }] },
  { id: 'plan-cold', group: 'plan', tip: 'planCold', when: [{ field: 'max', op: '<=', value: 10 }] },
  { id: 'plan-clear', group: 'plan', tip: 'planClear', when: [{ field: 'group', op: 'in', value: ['clear', 'mainlyClear'] }] },
  { id: 'plan-overcast', group: 'plan', tip: 'planOvercast', when: [{ field: 'group', op: 'in', value: ['partlyCloudy', 'overcast'] }] },

  // Packing list — only the items that actually apply today.
  { id: 'gear-uv', group: 'gear', gear: ['sunscreen'], when: [{ field: 'uv', op: '>=', value: 3 }] },
  { id: 'gear-sun', group: 'gear', gear: ['sunglasses', 'hat'], when: [{ field: 'uv', op: '>=', value: 5 }] },
  { id: 'gear-water', group: 'gear', gear: ['water'], when: [{ field: 'max', op: '>=', value: 24 }] },
  { id: 'gear-insect', group: 'gear', gear: ['insectRepellent'], when: [{ field: 'max', op: '>=', value: 14 }, { field: 'pop', op: '>=', value: 30 }] },
];

export const ADVICE_LIMITS: Record<Exclude<AdviceGroup, 'gear'>, number> & { gear: number } = {
  risk: 3,
  outfit: 2,
  plan: 2,
  gear: 5,
};

/**
 * Never leave a group empty: when nothing specific matched, fall back to a
 * neutral line so the visitor still gets an answer instead of a blank block.
 */
export const ADVICE_FALLBACK = { outfit: 'outfitMild', plan: 'planDefault' } as const;

export interface WeatherAdvice {
  /** Tip ids for the red warning banner. */
  risks: string[];
  /** Tip ids for "what to wear". */
  outfit: string[];
  /** Tip ids for "how to plan the day". */
  plan: string[];
  /** Gear ids for the packing chips. */
  gear: string[];
}

export function ruleMatches(rule: AdviceRule, facts: WeatherFacts): boolean {
  return rule.when.every((condition) => {
    if (condition.field === 'group') return condition.value.includes(facts.group);
    const actual = facts[condition.field];
    if (typeof actual !== 'number' || !Number.isFinite(actual)) return false;
    switch (condition.op) {
      case '>=':
        return actual >= condition.value;
      case '<=':
        return actual <= condition.value;
      case '>':
        return actual > condition.value;
      default:
        return actual < condition.value;
    }
  });
}

/** Runs the rule table and returns a short, de-duplicated, prioritised list. */
export function evaluateAdvice(facts: WeatherFacts): WeatherAdvice {
  const risks: string[] = [];
  const outfit: string[] = [];
  const plan: string[] = [];
  const gear: string[] = [];

  for (const rule of ADVICE_RULES) {
    if (!ruleMatches(rule, facts)) continue;

    if (rule.tip) {
      const bucket = rule.group === 'risk' ? risks : rule.group === 'outfit' ? outfit : rule.group === 'plan' ? plan : null;
      if (bucket && !bucket.includes(rule.tip)) bucket.push(rule.tip);
    }

    if (rule.gear) {
      for (const item of rule.gear) if (!gear.includes(item)) gear.push(item);
    }
  }

  if (outfit.length === 0) outfit.push(ADVICE_FALLBACK.outfit);
  if (plan.length === 0) plan.push(ADVICE_FALLBACK.plan);

  return {
    risks: risks.slice(0, ADVICE_LIMITS.risk),
    outfit: outfit.slice(0, ADVICE_LIMITS.outfit),
    plan: plan.slice(0, ADVICE_LIMITS.plan),
    gear: gear.slice(0, ADVICE_LIMITS.gear),
  };
}

let cache: { at: number; data: WeatherData | null } = { at: 0, data: null };

/**
 * Returns the forecast, reusing the cached payload while it is still fresh.
 * Never throws: the page degrades gracefully when the upstream is unreachable.
 */
export async function getWeather(forecastDays = 7): Promise<WeatherData | null> {
  const now = Date.now();
  if (cache.data && now - cache.at < CACHE_TTL_MS) return cache.data;

  try {
    const response = await fetch(buildWeatherUrl(forecastDays), {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) return cache.data;

    const normalized = normalizeWeather(await response.json());
    if (!normalized) return cache.data;

    cache = { at: now, data: normalized };
    return normalized;
  } catch {
    return cache.data;
  }
}
