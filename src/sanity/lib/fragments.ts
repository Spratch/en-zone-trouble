export const imageSrcFragment = `"src": coalesce(asset->url, ""),`;

export const creditsFragment = `"credits": credits[]{
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
},`;

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
        "slug": slug.current,
        _type,
      }
    }
  }
`;
