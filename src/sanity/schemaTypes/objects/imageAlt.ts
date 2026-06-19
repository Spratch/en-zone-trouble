import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageAlt",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  fields: [
    defineField({
      title: "Texte alternatif",
      name: "alt",
      type: "string",
      description:
        "Entrer le texte alternatif pour l'image.\nUtiliser une phrase courte. Pas de « Image de » ou « Photo de ». Mettre la première lettre en majuscule et inclure un point final.",
      validation: (Rule) => Rule.required()
    })
  ],
  options: {
    hotspot: true
  }
});
