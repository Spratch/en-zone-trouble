import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const calendarSchema = defineType({
  name: "calendar",
  title: "Calendrier",
  type: "document",
  icon: CalendarIcon,
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
    }),
    defineField({
      name: "seasons",
      title: "Saisons",
      type: "seasons",
    }),
  ],
});
