import type { APIRoute } from 'astro';
import { languagesList } from '../i18n/ui';
import { SITE_URL } from '../config/attraction';

// Home pages exist in every language; the four Spanish-only guides below do
// not, so they are listed just for /es/ (and must not point hreflang at
// non-existent /en|/zh|/arn versions).
const homeRoutes = [''];
const esSubRoutes = ['como-llegar', 'horarios-precios', 'fotos', 'mejor-epoca'];

const path = (lang: string, route: string) => `${SITE_URL}/${lang}/${route ? route + '/' : ''}`;

export const GET: APIRoute = () => {
  const homeUrls = homeRoutes.flatMap((route) =>
    languagesList.map((lang) => {
      const alternates = [
        ...languagesList.map(
          (alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${path(alt, route)}" />`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${path('es', route)}" />`,
      ].join('\n');

      return `  <url>
    <loc>${path(lang, route)}</loc>
${alternates}
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.3'}</priority>
  </url>`;
    })
  );

  const subUrls = esSubRoutes.map((route) => {
    const alternates = [
      `    <xhtml:link rel="alternate" hreflang="es" href="${path('es', route)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${path('es', route)}" />`,
    ].join('\n');

    return `  <url>
    <loc>${path('es', route)}</loc>
${alternates}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  const urls = [...homeUrls, ...subUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
