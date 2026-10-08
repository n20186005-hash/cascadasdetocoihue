import type { APIRoute } from 'astro';
import { languagesList, subpageLangs } from '../i18n/ui';
import { SITE_URL } from '../config/attraction';

// Home pages exist in every language; the four guide subpages exist only in
// es/en/zh (Mapudungun arn is not covered), so their hreflang must not point
// at a non-existent /arn/<slug>/ version.
const homeRoutes = [''];
const subRoutes = ['como-llegar', 'horarios-precios', 'fotos', 'mejor-epoca'];

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

  const subUrls = subRoutes.flatMap((route) =>
    subpageLangs.map((lang) => {
      const loc = path(lang, route);
      const alternates = [
        ...subpageLangs.map(
          (alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${path(alt, route)}" />`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${path('es', route)}" />`,
      ].join('\n');

      return `  <url>
    <loc>${loc}</loc>
${alternates}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
  );

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
