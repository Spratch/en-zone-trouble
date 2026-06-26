import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "alt",
      title: "Texte alternatif",
      type: "string",
      description:
        "Entrer le texte alternatif pour l'image.\nUtiliser une phrase courte. Pas de « Image de » ou « Photo de ». Mettre la première lettre en majuscule et inclure un point final.",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "caption",
      title: "Légende",
      type: "string",
      description:
        "Si besoin d'accompagner l'image d'informations supplémentaires, entrer une légende courte. Les légendes seront affichées séparément de la galerie.",
      validation: (Rule) =>
        Rule.max(100).warning(
          "Une légende trop longue perdra en lisibilité et en harmonie visuelle."
        )
    })
  ],
  options: {
    hotspot: true
  },
  validation: (rule) => rule.required().assetRequired(),
  preview: {
    select: {
      title: "alt",
      subtitle: "caption",
      media: "asset"
    }
  }
});
