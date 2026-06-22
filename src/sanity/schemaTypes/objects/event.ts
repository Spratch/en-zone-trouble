import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Événement",
  icon: CalendarIcon,
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre de l'événement",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Description de l'événement",
      type: "text",
      rows: 2
    }),
    defineField({
      name: "date",
      title: "Date",
      description: "Date de l'événement",
      type: "string"
    }),
    defineField({
      name: "place",
      title: "Lieu",
      description: "Nom du lieu",
      type: "string"
    }),
    defineField({
      name: "link",
      title: "Lien",
      description: "Lien vers l'événement",
      type: "url"
    }),
    defineField({
      name: "project",
      title: "Projet lié",
      description: "Associer à un projet de la compagnie",
      type: "reference",
      to: [
        { type: "show" },
        { type: "podcast" },
        { type: "research" },
        { type: "transmission" }
      ],
      options: {
        creationTypeFilter: ({ document }, toTypes) => {
          return toTypes.filter(
            (t) => t.type !== "research" && t.type !== "transmission"
          );
        }
      }
    })
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      date: "date",
      place: "place"
    },
    prepare: (selection) => {
      return {
        title: selection.title,
        subtitle: [selection.date, selection.place, selection.description]
          .filter(Boolean)
          .join(", ")
      };
    }
  }
});
