import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "Galerie",
  description: "Galerie d'images et de vidéos",
  type: "array",
  of: [
    defineField({
      name: "imageAlt",
      title: "Image",
      type: "galleryImage"
    }),
    defineField({
      name: "mux.video",
      title: "Vidéo",
      type: "galleryVideo"
    })
  ],
  options: {
    layout: "grid"
  }
});
