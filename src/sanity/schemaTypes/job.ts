import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const jobSchema = defineType({
  name: "job",
  title: "Métiers",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Le nom de la discipline (Ex: Mise en scène)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique du métier, cliquer sur 'Générer' après avoir renseigné le titre",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
