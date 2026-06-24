import {
  BlockContentIcon,
  EyeOpenIcon,
  ImagesIcon,
  InfoOutlineIcon,
  PresentationIcon,
  UsersIcon
} from "@sanity/icons";
import { ALL_FIELDS_GROUP, defineField, defineType } from "sanity";

export const showSchema = defineType({
  name: "show",
  title: "Spectacles",
  type: "document",
  icon: EyeOpenIcon,
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
      description: "Titre du spectacle",
      type: "string",
      group: "presentation",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique du spectacle, cliquer sur Générer après avoir renseigné le titre",
      type: "slug",
      options: {
        source: "title"
      },
      group: "presentation",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      description:
        "Seulement quelques mots (ex. 'Projet d'écriture', 'En création'",
      type: "string",
      group: "presentation",
      validation: (Rule) =>
        Rule.max(30).warning("Le sous-titre ne doit pas dépasser 30 caractères")
    }),
    defineField({
      name: "date",
      title: "Date de création",
      description: "Date de création du spectacle",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      group: "presentation",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "cover",
      title: "Couverture",
      description: "Image de présentation du spectacle",
      type: "cover",
      group: "presentation"
    }),
    defineField({
      name: "synopsis",
      title: "Synopsis",
      description: "Synopsis du spectacle",
      type: "customBlock",
      group: "content",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      type: "excerpt",
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
      description: "Entrer des informations supplémentaires sur le spectacle",
      type: "customBlock",
      group: "details"
    }),
    defineField({
      name: "dates",
      title: "Dates",
      description: "Dates de représentation du spectacle",
      type: "array",
      of: [{ type: "simpleEvent" }],
      group: "details"
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
      description: "Lien vers la billetterie du spectacle",
      type: "url",
      group: "details"
    }),
    defineField({
      name: "presentationFile",
      title: "Fichier de présentation",
      description: "Fichier PDF de présentation du spectacle",
      type: "file",
      options: {
        accept: ".pdf"
      },
      group: "details"
    }),
    defineField({
      name: "links",
      title: "Liens",
      description: "Liste des liens liés au spectacle",
      type: "linksArray",
      group: "details"
    }),
    defineField({
      name: "press",
      title: "Presse et récompenses",
      description: "Liste des liens de presse liés au spectacle",
      type: "linksArray",
      group: "details"
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      description: "Images liées au spectacle",
      type: "gallery",
      group: "gallery"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      date: "date",
      media: "cover"
    },
    prepare: ({ title, subtitle, date, media }) => ({
      title,
      subtitle: `${subtitle ? subtitle + ", " : ""}${date.split("-")[0]}`,
      media
    })
  }
});
