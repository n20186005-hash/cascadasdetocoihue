export const siteConfig = {
  name: 'Cascadas de Tocoihue',
  baseUrl: 'https://cascadasdetocoihue.com',
  locales: ['es', 'en', 'zh', 'arn'] as const,
};

export const ogLocale: Record<string, string> = {
  es: 'es_CL',
  en: 'en_US',
  zh: 'zh_CN',
  arn: 'es_CL',
};
