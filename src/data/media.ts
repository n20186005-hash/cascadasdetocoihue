/**
 * Static media registry.
 *
 * Astro can only run its build-time image pipeline (resize + WebP/AVIF + srcset)
 * on assets that are statically imported, so every photo used on the page is
 * registered here once and then referenced from components.
 */
import type { ImageMetadata } from 'astro';

import photo1 from '../assets/gallery/cascadas-de-tocoihue-1.jpg';
import photo2 from '../assets/gallery/cascadas-de-tocoihue-2.jpg';
import photo3 from '../assets/gallery/cascadas-de-tocoihue-3.jpg';
import photo4 from '../assets/gallery/cascadas-de-tocoihue-4.jpg';
import photo5 from '../assets/gallery/cascadas-de-tocoihue-5.jpg';
import photo6 from '../assets/gallery/cascadas-de-tocoihue-6.jpg';
import photo7 from '../assets/gallery/cascadas-de-tocoihue-7.jpg';
import photo8 from '../assets/gallery/cascadas-de-tocoihue-8.jpg';
import photo9 from '../assets/gallery/cascadas-de-tocoihue-9.jpg';
import photo10 from '../assets/gallery/cascadas-de-tocoihue-10.jpg';
import photo11 from '../assets/gallery/cascadas-de-tocoihue-11.jpg';
import photo12 from '../assets/gallery/cascadas-de-tocoihue-12.jpg';
import photo13 from '../assets/gallery/cascadas-de-tocoihue-13.jpg';
import photo14 from '../assets/gallery/cascadas-de-tocoihue-14.jpg';
import photo15 from '../assets/gallery/cascadas-de-tocoihue-15.jpg';
import photo16 from '../assets/gallery/cascadas-de-tocoihue-16.jpg';
import photo17 from '../assets/gallery/cascadas-de-tocoihue-17.jpg';
import photo18 from '../assets/gallery/cascadas-de-tocoihue-18.jpg';
import photo19 from '../assets/gallery/cascadas-de-tocoihue-19.jpg';
import photo20 from '../assets/gallery/cascadas-de-tocoihue-20.jpg';
import photo21 from '../assets/gallery/cascadas-de-tocoihue-21.jpg';
import photo22 from '../assets/gallery/cascadas-de-tocoihue-22.jpg';

import ulmo from '../assets/species/ulmo.jpg';
import coigue from '../assets/species/coigue.jpg';
import helechos from '../assets/species/helechos.jpg';
import tagua from '../assets/species/tagua.jpg';

/** Main visual of the landing page (also used for social sharing cards). */
export const heroImage: ImageMetadata = photo1;

/** Ordered gallery of the attraction. */
export const galleryImages: ImageMetadata[] = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
  photo10,
  photo11,
  photo12,
  photo13,
  photo14,
  photo15,
  photo16,
  photo17,
  photo18,
  photo19,
  photo20,
  photo21,
  photo22,
];

/** Species illustrations keyed by the id used in the i18n content files. */
export const speciesImages: Record<string, ImageMetadata> = {
  ulmo,
  coigue,
  helechos,
  tagua,
};
