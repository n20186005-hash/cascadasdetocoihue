import type { APIRoute } from 'astro';
import { languagesList } from '../i18n/ui';
import { SITE_URL } from '../config/attraction';

const routes = ['', 'privacy-policy', 'terms-of-service', 'cookie-settings'];

const path = (lang: string, route: string) => `${SITE_URL}/${lang}${route ? '/' + route : ''}`;

export const GET: APIRoute = () => {
  const urls = routes.flatMap((route) =>
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

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
