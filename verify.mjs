import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('dist/es/index.html', 'utf8');

const check = (label, url) => {
  const rel = url.replace(/^https:\/\/cascadasdetocoihue\.com/, '').split('?')[0];
  console.log(`  ${existsSync('dist' + rel) ? 'OK  ' : 'MISS'} ${label}: ${url}`);
};

console.log('--- hero (LCP) ---');
const heroBlock = html.slice(html.indexOf('<section class="relative min-h-'), html.indexOf('</picture>'));
for (const m of heroBlock.matchAll(/(?:src|srcset)="([^"]+)"/g)) {
  const first = m[1].split(',')[0].trim().split(' ')[0];
  check('hero', first);
}
console.log('  has <picture>:', /<picture/.test(heroBlock), '| avif source:', /type="image\/avif"/.test(heroBlock));

console.log('\n--- gallery ---');
const gallery = html.slice(html.indexOf('id="gallery"'));
const gallerySrcs = [...gallery.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
console.log('  img count:', gallerySrcs.length);
check('first', gallerySrcs[0]);
check('last', gallerySrcs[gallerySrcs.length - 1]);
const alts = [...gallery.matchAll(/<img[^>]+alt="([^"]*)"/g)].map((m) => m[1]);
console.log('  alts:', alts.length, '| empty alts:', alts.filter((a) => !a.trim()).length);
console.log('  alt[0]:', alts[0]);
console.log('  alt[21]:', alts[21]);

console.log('\n--- og / twitter ---');
const og = html.match(/property="og:image" content="([^"]+)"/);
console.log('  og:image:', og ? og[1] : '(none)');

console.log('\n--- JSON-LD ---');
const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
for (const b of blocks) console.log('  @type:', Array.isArray(b['@type']) ? b['@type'].join('+') : b['@type']);
const attraction = blocks.find((b) => b['@type'] === 'TouristAttraction');
console.log('  priceRange:', attraction.priceRange);
console.log('  telephone:', attraction.telephone);
console.log('  openingHours:', JSON.stringify(attraction.openingHoursSpecification));
console.log('  images:', attraction.image.length);
for (const url of attraction.image) check('schema image', url);
const destination = blocks.find((b) => b['@type'] === 'TouristDestination');
console.log('  destination:', destination.name, '| includesAttraction:', JSON.stringify(destination.includesAttraction));
