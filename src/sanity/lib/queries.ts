import { defineQuery } from "groq";
import {
  creditsFragment,
  imageSrcFragment,
  seasonsFragment,
} from "./fragments";

export const footerSettingsQuery = defineQuery(`*[_type == "settings"][0]{
    title,
    "navigation": navigation[]{
      title,
      "slug": slug.current
    },
    "navigationLogo": favicon.dark.asset->url,
  }`);

export const homeImageQuery = defineQuery(`*[
    _type == "settings" &&
    defined(homeImage.asset->url)
  ][0].homeImage{
    ${imageSrcFragment}
    alt,
    crop,
    hotspot
  }`);

export const showsListQuery = defineQuery(`*[_type == "show"]{
  title,
  "slug": slug.current,
  date,
  "cover": cover{
    ${imageSrcFragment}
    crop,
    hotspot,
  }
} | order(date desc)`);

export const showBySlugQuery =
  defineQuery(`*[_type == "show" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  date,
  "cover": cover{
    ${imageSrcFragment}
    crop,
    hotspot,
  },
  synopsis,
  "excerpt": excerpt{
    type,
    "image": image{
      ${imageSrcFragment}
      crop,
      hotspot,
      alt
    },
    text
  },
  infos,
  supports,
  production,
  ${creditsFragment}
  "gallery": gallery[]{
    ${imageSrcFragment}
    crop,
    hotspot,
    alt
  },
  links,
  press
}`);

export const podcastsListQuery = defineQuery(`*[_type == "podcast"]{
  title,
  "slug": slug.current,
  date,
  "cover": cover{
    ${imageSrcFragment}
    crop,
    hotspot,
  }
} | order(date desc)`);

export const podcastBySlugQuery =
  defineQuery(`*[_type == "podcast" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  date,
  "cover": cover{
    ${imageSrcFragment}
    crop,
    hotspot,
  },
  synopsis,
  "episodes": episodes[]{
    title,
    "mp3": mp3.asset->url,
  },
  infos,
  supports,
  production,
  ${creditsFragment}
  "gallery": gallery[]{
    ${imageSrcFragment}
    crop,
    hotspot,
    alt
  },
  links,
  press
}`);

export const researchQuery = defineQuery(`*[_type == "research"][0]{
    title,
    presentation,
    notes,
    excerptTitle,
    excerpt
  }`);

export const teamQuery = defineQuery(`*[_type == "team"][0]{
  title,
  "members": members[]->{
    name,
    slug,
    role,
    link,
    presentation
  }
}`);

export const calendarQuery = defineQuery(`*[_type == "calendar"][0]{
  title,
  introduction,
  ${seasonsFragment}
}`);

export const transmissionQuery = defineQuery(`*[_type == "transmission"][0]{
  title,
  introduction,
  ${seasonsFragment}
}`);
