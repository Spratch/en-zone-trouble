import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "linksArray",
  type: "array",
  of: [
    {
      type: "object",
      icon: LinkIcon,
      fields: [
        defineField({
          name: "title",
          title: "Titre",
          description: "Texte affiché pour le lien",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Sous-titre",
          description: "Sous-titre du lien",
          type: "string",
        }),
        defineField({
          name: "url",
          title: "URL",
          description: "URL de la page associée au lien",
          type: "url",
          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: {
          title: "title",
          subtitle: "subtitle",
        },
      },
    },
  ],
});
