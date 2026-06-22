import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "simpleEvent",
  title: "Événement",
  icon: CalendarIcon,
  type: "object",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      description: "Date de l'événement",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "place",
      title: "Lieu",
      description: "Nom du lieu",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "title",
      title: "Titre",
      description:
        "Seulement si différent du projet lié, ne pas répéter d'information",
      type: "string"
    }),
    defineField({
      name: "description",
      title: "Description",
      description:
        "Seulement si différente du projet lié, ne pas répéter d'information",
      type: "text",
      rows: 2
    }),
    defineField({
      name: "link",
      title: "Lien",
      description: "Lien vers l'événement",
      type: "url"
    })
  ],
  preview: {
    select: {
      title: "place",
      subtitle: "date"
    }
  }
});
