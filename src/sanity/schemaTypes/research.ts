import { ComposeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const researchSchema = defineType({
  name: "research",
  title: "Recherche",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre de la page",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "presentation",
      title: "Présentation",
      description: "Présentation de la recherche",
      type: "customBlock",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Notes",
      description: "Introduction et crédits",
      type: "customBlock",
    }),
    defineField({
      name: "excerptTitle",
      title: "Titre de l'extrait",
      description: "Titre de l'extrait",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      description:
        "Extrait de la recherche. Les paragraphes commençant par '–' alternent leurs indentations",
      type: "customBlock",
    }),
  ],
  preview: {
    select: {
      title: "title",
      notes: "notes",
    },
    prepare: ({ title, notes }) => {
      return {
        title,
        subtitle: notes[0].children
          .map((c: { text: string }) => c.text)
          .join(" "),
      };
    },
  },
});
