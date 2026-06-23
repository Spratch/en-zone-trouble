import {
  BlockContentIcon,
  DocumentVideoIcon,
  ImagesIcon,
  InfoOutlineIcon,
  MicrophoneIcon,
  PresentationIcon,
  UsersIcon
} from "@sanity/icons";
import { ALL_FIELDS_GROUP, defineField, defineType } from "sanity";

export const podcastSchema = defineType({
  name: "podcast",
  title: "Podcasts",
  type: "document",
  icon: MicrophoneIcon,
  groups: [
    {
      ...ALL_FIELDS_GROUP,
      hidden: true
    },
    {
      name: "presentation",
      title: "Présentation",
      icon: PresentationIcon,
      default: true
    },
    {
      name: "content",
      title: "Contenu",
      icon: BlockContentIcon
    },
    {
      name: "details",
      title: "Détails",
      icon: InfoOutlineIcon
    },
    {
      name: "credits",
      title: "Crédits",
      icon: UsersIcon
    },
    {
      name: "gallery",
      title: "Galerie",
      icon: ImagesIcon
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre du podcast",
      type: "string",
      group: "presentation",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique du podcast, cliquer sur Générer après avoir renseigné le titre",
      type: "slug",
      options: {
        source: "title"
      },
      group: "presentation",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "date",
      title: "Date de création",
      description: "Date de création du podcast",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      group: "presentation",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "cover",
      title: "Couverture",
      description: "Image de couverture du podcast",
      type: "image",
      group: "presentation",
      validation: (rule) =>
        rule.required().custom((value) => {
          return value?.asset ? true : "Une image doit être sélectionnée";
        }),
      fields: [
        defineField({
          name: "orientation",
          title: "Orientation",
          description: "Sélectionner l'orientation de l'image",
          type: "string",
          initialValue: "landscape",
          validation: (Rule) => Rule.required(),
          options: {
            list: [
              { title: "Paysage", value: "landscape" },
              { title: "Portrait", value: "portrait" }
            ]
          }
        })
      ]
    }),
    defineField({
      name: "synopsis",
      title: "Synopsis",
      description: "Synopsis du podcast",
      type: "customBlock",
      group: "content",
      validation: (Rule) => Rule.required()
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
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "mp3",
              title: "Audio",
              icon: MicrophoneIcon,
              description: "Audio de l'épisode",
              type: "mux.video",
              options: {
                acceptedMimeTypes: ["audio/*"]
              }
            })
          ]
        }
      ],
      group: "content"
    }),
    defineField({
      name: "credits",
      title: "Crédits",
      type: "credits",
      group: "credits"
    }),
    defineField({
      name: "infos",
      title: "Infos",
      description: "Entrer les infos du spectacle (dates, lieu, etc.)",
      type: "customBlock",
      group: "details"
    }),
    defineField({
      name: "dates",
      title: "Dates",
      description: "Dates de représentation du podcast",
      type: "array",
      of: [{ type: "simpleEvent" }],
      group: "details",
      hidden: true
    }),
    defineField({
      name: "supports",
      title: "Soutiens",
      description: "Soutenu par…",
      type: "text",
      rows: 2,
      group: "details"
    }),
    defineField({
      name: "production",
      title: "Production",
      description: "Crédits de production",
      type: "text",
      rows: 2,
      group: "details"
    }),
    defineField({
      name: "reservationLink",
      title: "Lien de réservation",
      description: "Lien vers la billetterie du podcast",
      type: "url",
      group: "details",
      hidden: true
    }),
    defineField({
      name: "presentationFile",
      title: "Fichier de présentation",
      description: "Fichier PDF de présentation du podcast",
      type: "file",
      options: {
        accept: ".pdf"
      },
      group: "details"
    }),
    defineField({
      name: "links",
      title: "Liens",
      description: "Liste des liens liés au podcast",
      type: "linksArray",
      group: "details"
    }),
    defineField({
      name: "press",
      title: "Presse et récompenses",
      description: "Liste des liens de presse liés au podcast",
      type: "linksArray",
      group: "details"
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      description: "Images liées au podcast",
      type: "gallery",
      group: "gallery"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "cover"
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle.split("-")[0],
      media
    })
  }
});
