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
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "date",
      title: "Date de création",
      description: "Date de création du spectacle",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "cover",
      title: "Couverture",
      description: "Image de couverture du spectacle",
      type: "image",
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
      description: "Synopsis du spectacle",
      type: "customBlock",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      description:
        "Entrer le texte, il sera affiché avec une typographie scripte",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "infos",
      title: "Infos",
      description: "Entrer les infos du spectacle (dates, lieu, etc.)",
      type: "customBlock"
    }),
    defineField({
      name: "supports",
      title: "Soutiens",
      description: "Soutenu par…",
      type: "text",
      rows: 2
    }),
    defineField({
      name: "production",
      title: "Production",
      description: "Crédits de production",
      type: "text",
      rows: 2
    }),
    defineField({
      name: "credits",
      title: "Crédits",
      type: "credits"
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      description: "Images liées au spectacle",
      type: "gallery"
    }),
    defineField({
      name: "links",
      title: "Liens",
      description: "Liste des liens liés au spectacle",
      type: "linksArray"
    }),
    defineField({
      name: "press",
      title: "Presse et récompenses",
      description: "Liste des liens de presse liés au spectacle",
      type: "linksArray"
    }),
    defineField({
      name: "reservationLink",
      title: "Lien de réservation",
      description: "Lien vers la billetterie du spectacle",
      type: "url"
    }),
    defineField({
      name: "presentationFile",
      title: "Fichier de présentation",
      description: "Fichier PDF de présentation du spectacle",
      type: "file",
      options: {
        accept: ".pdf"
      }
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
