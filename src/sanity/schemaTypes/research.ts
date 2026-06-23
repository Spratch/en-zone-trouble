import {
  BlockContentIcon,
  ComposeIcon,
  ImagesIcon,
  InfoOutlineIcon,
  PresentationIcon
} from "@sanity/icons";
import { ALL_FIELDS_GROUP, defineField, defineType } from "sanity";

export const researchSchema = defineType({
  name: "research",
  title: "Recherche",
  type: "document",
  icon: ComposeIcon,
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
      name: "gallery",
      title: "Galerie",
      icon: ImagesIcon
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre de la page",
      type: "string",
      group: "presentation",
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
      group: "presentation",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "cover",
      title: "Couverture",
      description: "Image de présentation de la page",
      type: "cover",
      group: "presentation"
    }),
    defineField({
      name: "presentation",
      title: "Introduction",
      description: "Présentation de la page",
      type: "customBlock",
      group: "content",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "notes",
      title: "Notes",
      description: "Complément de l'introduction, crédits, références, etc.",
      type: "customBlock",
      group: "content"
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      type: "excerpt",
      group: "content"
    }),
    defineField({
      name: "text",
      title: "Texte",
      description:
        "Texte supplémentaire pour aller plus loin que l'introduction",
      type: "customBlock",
      group: "content"
    }),
    defineField({
      name: "infos",
      title: "Infos",
      description: "Entrer des informations supplémentaires",
      type: "customBlock",
      group: "details"
    }),
    defineField({
      name: "dates",
      title: "Dates",
      description: "Liste de date liée à la page",
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
      name: "presentationFile",
      title: "Fichier de présentation",
      description: "Fichier PDF de présentation",
      type: "file",
      options: {
        accept: ".pdf"
      },
      group: "details"
    }),
    defineField({
      name: "links",
      title: "Liens",
      description: "Liste des liens liés à la page",
      type: "linksArray",
      group: "details"
    }),
    defineField({
      name: "press",
      title: "Presse et récompenses",
      description: "Liste des liens de presse liés à la page",
      type: "linksArray",
      group: "details"
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "gallery",
      group: "gallery"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "presentation",
      media: "cover"
    }
  }
});
