import { defineQuery } from "groq";
import {
  creditsFragment,
  customBlockFragment,
  galleryFragment,
  imageAltFragment,
  imageSrcFragment,
  seasonsFragment,
  slugFragment
} from "./fragments";

export const layoutSettingsQuery = defineQuery(`*[_type == "settings"][0]{
    title,
    description,
    "favicons": favicon{
      "light": light.asset->url,
      "dark": dark.asset->url,
    }
  }`);

export const footerSettingsQuery = defineQuery(`*[_type == "settings"][0]{
    title,
    "navigation": navigation[]->{
      title,
      ${slugFragment}
    },
    "navigationLogo": favicon.dark.asset->url,
  }`);

export const homeImageQuery = defineQuery(`*[_type == "settings"
  && defined(homeImage.asset->url)][0].homeImage${imageAltFragment}`);

export const showsListQuery = defineQuery(`*[_type == "shows"][0]{
  title,
  ${slugFragment},
  "shows": showsList[]->{
    title,
    ${slugFragment},
    date,
    "cover": cover{
      ${imageSrcFragment},
      "orientation": coalesce(orientation, "landscape"),
      crop,
      hotspot,
    },
  }
}`);

export const showBySlugQuery =
  defineQuery(`*[_type == "show" && slug.current == $slug][0]{
    title,
    ${slugFragment},
    date,
    "synopsis": synopsis${customBlockFragment},
    excerpt,
    "infos": infos${customBlockFragment},
    supports,
    production,
    ${creditsFragment}
    "gallery": gallery[]${galleryFragment},
    links,
    press
  }
`);

export const podcastsListQuery = defineQuery(`*[_type == "podcasts"][0]{
  title,
  ${slugFragment},
  "podcasts": podcastsList[]->{
    title,
    ${slugFragment},
    date,
    "cover": cover{
      ${imageSrcFragment},
      "orientation": coalesce(orientation, "landscape"),
      crop,
      hotspot,
    },
  }
}`);

export const podcastBySlugQuery =
  defineQuery(`*[_type == "podcast" && slug.current == $slug][0]{
    title,
    ${slugFragment},
    date,
    "synopsis": synopsis${customBlockFragment},
    "episodes": episodes[]{
      title,
      "playbackId": mp3.asset->playbackId,
    },
    "infos": infos${customBlockFragment},
    supports,
    production,
    ${creditsFragment}
    "gallery": gallery[]${galleryFragment},
    links,
    press
  }
`);

export const researchQuery = defineQuery(`*[_type == "research"][0]{
  title,
  "presentation": presentation${customBlockFragment},
  "notes": notes${customBlockFragment},
  excerptTitle,
  "excerpt": excerpt${customBlockFragment}
}`);

export const calendarQuery = defineQuery(`*[_type == "calendar"][0]{
  title,
  "introduction": introduction${customBlockFragment},
  ${seasonsFragment}
}`);

export const transmissionQuery = defineQuery(`*[_type == "transmission"][0]{
  title,
  "introduction": introduction${customBlockFragment},
  ${seasonsFragment}
}`);

export const pagesListQuery = defineQuery(`*[_type == "legal"]{
  ${slugFragment}
}`);

export const pageBySlugQuery =
  defineQuery(`*[_type == "legal" && slug.current == $slug][0]{
  title,
  ${slugFragment},
  "content": content${customBlockFragment}
}`);

export const aboutQuery = defineQuery(`
  *[_type == "about"][0]{
  title,
  "presentation": presentation${customBlockFragment},
  ${seasonsFragment},
  "members": members[]->{
    name,
    slug,
    role,
    link,
    "presentation": presentation${customBlockFragment}
  },
  "contact": contact{
    "title": *[_type == "settings"][0].title,
    name,
    phone,
    email,
    address
  },
  supports,
  "pages": *[_type == "legal"]{
    ${slugFragment},
    title
  },
  "credits": [{
    "title": "Design",
    "value": [{
      "name": "Mathilde Mary",
      "link": "https://mathildemary.fr/"
    }]
  },{
    "title": "Développement web",
    "value": [{
      "name": "Joseph Clenet",
      "link": "https://josephclenet.fr/"
    },{
      "name": "Mathilde Mary",
      "link": "https://mathildemary.fr/"
    }]
  }]
}`);
