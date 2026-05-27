import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const memberSchema = defineType({
  name: "member",
  title: "Membres",
  icon: UserIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      description: "Nom du membre de l'équipe",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique du membre de l'équipe, cliquer sur Générer après avoir renseigné son nom",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "role",
      title: "Rôle",
      description: "Rôle dans l'équipe",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Lien",
      description: "Lien vers son travail",
      type: "url",
    }),
    defineField({
      name: "presentation",
      title: "Présentation",
      type: "customBlock",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
    },
  },
});
