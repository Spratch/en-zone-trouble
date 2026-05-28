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

export const showsListQuery = defineQuery(`*[_type == "show"]{
  title,
  "slug": slug.current,
  date,
  "cover": cover{
    "src": coalesce(asset->url, ""),
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
    "src": coalesce(asset->url, ""),
    crop,
    hotspot,
  },
  synopsis,
  "excerpt": excerpt{
    type,
    "image": image{
      "src": coalesce(asset->url, ""),
      crop,
      hotspot,
      alt
    },
    text
  },
  infos,
  supports,
  production,
  "credits": credits[]{
    "title": title->title,
    "value": value[]{
      _type == "reference" => @->{
        _type,
        "name": name,
        "slug": slug.current,
        "link": link,
      },
      _type != "reference" => @{
        _type,
        "text": value,
      },
    },
  },
  "gallery": gallery[]{
    "src": coalesce(asset->url, ""),
    crop,
    hotspot,
    alt
  },
  links,
  press
}`);
