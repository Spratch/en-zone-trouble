import { defineField, defineType } from "sanity";

export const teamSchema = defineType({
  name: "team",
  title: "Équipe",
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
      name: "members",
      title: "Membres",
      description: "Liste des membres de l'équipe",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "member" }],
        },
      ],
      validation: (Rule) =>
        Rule.custom((items: { _ref: string }[] | undefined) => {
          if (!items) return true;
          const itemIds = items.map((item, index) => ({
            id: item._ref,
            index,
          }));
          const duplicates = itemIds.filter(
            (item, index) =>
              itemIds.findIndex(
                (i) => i.id === item.id && i.index !== index,
              ) !== -1,
          );
          if (duplicates.length > 0) {
            return (
              "Des membres ont été mit en double : " +
              duplicates.map((item) => item.index + 1).join(", ")
            );
          }

          return true;
        }),
    }),
  ],
});
