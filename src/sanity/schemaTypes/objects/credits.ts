import { BlockContentIcon, UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "credits",
  title: "Crédits",
  description: "Liste des participant·es",
  type: "array",
  of: [
    {
      title: "Crédit",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre",
          description: "Sélectionner ou créer un titre de crédit",
          type: "reference",
          to: [{ type: "job" }],
        }),
        defineField({
          name: "value",
          title: "Valeur",
          description: "Sélectionner ou créer une personne",
          type: "array",
          of: [
            {
              title: "Membre de l'équipe",
              type: "reference",
              to: [{ type: "member" }],
            },
            {
              name: "personText",
              title: "Personne (texte)",
              icon: BlockContentIcon,
              type: "object",
              fields: [
                {
                  name: "value",
                  title: "Valeur",
                  type: "customBlock",
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: "value.0.children.0.text",
                },
              },
            },
          ],
        }),
      ],
      icon: UserIcon,
      preview: {
        select: {
          title: "title.title",
          person0: "value.0.name",
          person1: "value.1.name",
          text0: "value.0.value.0.children.0.text",
          text1: "value.1.value.0.children.0.text",
          more: "value.2",
        },
        prepare: ({ title, person0, person1, text0, text1, more }) => {
          const names = [person0 || text0, person1 || text1].filter(Boolean);
          return {
            title: title ?? "Crédit sans titre",
            subtitle: names.join(", ") + (more ? `, …` : ""),
          };
        },
      },
    },
  ],
});
