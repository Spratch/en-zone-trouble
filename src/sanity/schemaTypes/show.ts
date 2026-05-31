import { EyeOpenIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const showSchema = defineType({
  name: "show",
  title: "Spectacles",
  type: "document",
  icon: EyeOpenIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre du spectacle",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique du spectacle, cliquer sur Générer après avoir renseigné le titre",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date de création",
      description: "Date de création du spectacle",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Couverture",
      description: "Image de couverture du spectacle",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "synopsis",
      title: "Synopsis",
      description: "Synopsis du spectacle",
      type: "customBlock",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      description: "Entrer un extrait du spectacle",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Type",
          description: "Sélectionner la façon d'entrer le contenu",
          type: "string",
          options: {
            list: [
              { title: "Texte", value: "text" },
              { title: "Image", value: "image" },
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "text",
          title: "Texte",
          description:
            "Entrer le texte, il sera affiché avec une typographie scripte",
          type: "text",
          rows: 3,
          hidden: ({ parent }) => parent?.type !== "text",
        }),
        defineField({
          name: "image",
          title: "Image",
          description:
            "L'image doit avoir un fond transparent pour pouvoir être placé sur la page",
          type: "imageAlt",
          hidden: ({ parent }) => parent?.type !== "image",
        }),
      ],
    }),
    defineField({
      name: "infos",
      title: "Infos",
      description: "Entrer les infos du spectacle (dates, lieu, etc.)",
      type: "customBlock",
    }),
    defineField({
      name: "supports",
      title: "Soutiens",
      description: "Soutenu par…",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "production",
      title: "Production",
      description: "Crédits de production",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "credits",
      title: "Crédits",
      type: "credits",
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      description: "Images liées au spectacle",
      type: "gallery",
    }),
    defineField({
      name: "links",
      title: "Liens",
      description: "Liste des liens liés au podcast",
      type: "linksArray",
    }),
    defineField({
      name: "press",
      title: "Presse et récompenses",
      description: "Liste des liens de presse liés au podcast",
      type: "linksArray",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "cover",
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle.split("-")[0],
      media,
    }),
  },
});
