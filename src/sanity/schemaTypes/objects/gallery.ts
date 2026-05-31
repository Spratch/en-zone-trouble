import { VideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "Galerie",
  type: "array",
  of: [
    defineField({
      name: "imageAlt",
      title: "Image",
      type: "imageAlt",
    }),
    defineField({
      name: "mux.video",
      title: "Vidéo",
      type: "mux.video",
      icon: VideoIcon,
    }),
  ],
  options: {
    layout: "grid",
  },
});
