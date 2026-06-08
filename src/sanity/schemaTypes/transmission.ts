import { AsteriskIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const transmissionSchema = defineType({
  name: "transmission",
  title: "Transmission",
  type: "document",
  icon: AsteriskIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre de la page",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      description: "Introduction de la page",
      type: "customBlock",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seasons",
      title: "Saisons",
      type: "seasons",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "introduction",
    },
  },
});
