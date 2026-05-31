import { DocumentVideoIcon, MicrophoneIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const podcastSchema = defineType({
  name: "podcast",
  title: "Podcasts",
  type: "document",
  icon: MicrophoneIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre du podcast",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique du podcast, cliquer sur Générer après avoir renseigné le titre",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date de création",
      description: "Date de création du podcast",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Couverture",
      description: "Image de couverture du podcast",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "synopsis",
      title: "Synopsis",
      description: "Synopsis du podcast",
      type: "customBlock",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episodes",
      title: "Épisodes",
      description: "Liste des épisodes",
      type: "array",
      of: [
        {
          name: "episode",
          title: "Épisode",
          description: "Épisode du podcast",
          type: "object",
          icon: DocumentVideoIcon,
          fields: [
            defineField({
              name: "title",
              title: "Titre",
              description: "Titre de l'épisode",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "mp3",
              title: "Audio",
              icon: MicrophoneIcon,
              description: "Audio de l'épisode",
              type: "mux.video",
              options: {
                acceptedMimeTypes: ["audio/*"],
              },
            }),
          ],
        },
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
      description: "Images liées au podcast",
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
