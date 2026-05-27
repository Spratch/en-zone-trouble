import { defineQuery } from "groq";

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
    "src": coalesce(asset->url, ""),
    alt,
    crop,
    hotspot
  }`);
