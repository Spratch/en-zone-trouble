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
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique de la page, cliquer sur Générer après avoir renseigné le titre",
      type: "slug",
      options: {
        source: "title"
      },
      validation: (Rule) => Rule.required(),
      hidden: true
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      description: "Introduction de la page",
      type: "customBlock"
    }),
    defineField({
      name: "seasons",
      title: "Saisons",
      type: "seasons"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current"
    },
    prepare({ title, subtitle }) {
      const displaySubtitle = subtitle
        ? `${import.meta.env.SITE.replace("https://", "")} / ${subtitle}`
        : "";
      return {
        title: title,
        subtitle: displaySubtitle
      };
    }
  }
});
