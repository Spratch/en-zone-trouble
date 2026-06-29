export const slugFragment = `"slug": slug.current`;
export const imageSrcFragment = `"src": coalesce(asset->url, "")`;

export const imageAltFragment = `{
  ${imageSrcFragment},
  "alt": coalesce(alt, ^.title, ""),
  crop,
  hotspot,
}`;

export const creditsFragment = `"credits": credits[]{
  "title": title->title,
  "value": value[]{
    _type == "reference" => @->{
      _type,
      "name": name,
      ${slugFragment},
      "link": link,
    },
    _type != "reference" => @{
      _type,
      "text": value,
    },
  },
}`;

export const seasonsFragment = `
  "seasons": seasons[]{
    range,
    "events": events[]{
      title,
      description,
      date,
      place,
      link,
      "project": project->{
        title,
        ${slugFragment},
        _type,
      }
    }
  }
`;

export const customBlockFragment = `[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      ...,
      "slug": *[_id == ^._ref][0].slug.current,
      "refType": *[_id == ^._ref][0]._type
    }
  }
}`;

export const galleryFragment = `
  "gallery": gallery[]{
    "_type": select(
      _type == "imageAlt" => "galleryImage",
      _type == "mux.video" => "galleryVideo",
      _type
    ),
    (_type == "galleryImage" || _type == "imageAlt") => ${imageAltFragment},
    (_type == "galleryVideo" || _type == "mux.video") => {
      "playbackId": coalesce(video.asset->playbackId, ""),
    }
  },
  "captions": gallery[].caption
`;

export const itemMetaFragment = `
  title,
  ${slugFragment},
  subtitle,
  date,
  "seoImage": cover.asset->url
`;

export const itemDetailsFragment = `
  "infos": infos${customBlockFragment},
  "dates": dates[]{
    date,
    place,
    title,
    description,
    link
  },
  supports,
  production,
  ${creditsFragment},
  ${galleryFragment},
  links,
  press,
  reservationLink,
  "presentationFile": presentationFile.asset->{
    url,
    originalFilename
  }
`;

export const coverFragment = `
  "cover": cover{
    ${imageSrcFragment},
    "orientation": select(asset->metadata.dimensions.aspectRatio <= 1.1 => "portrait", "landscape"),
    crop,
    hotspot,
  }
`;
