import { defineField, defineType } from "sanity";

export const companySchema = defineType({
  name: "company",
  title: "Compagnie",
  type: "document",
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
      description: "Présentation de la compagnie",
      type: "customBlock",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seasons",
      title: "Saisons",
      type: "seasons",
    }),
  ],
});
