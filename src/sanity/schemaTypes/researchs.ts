import { ComposeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const researchsSchema = defineType({
  name: "researchs",
  title: "Page recherches",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre de la page recherches",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique de la page recherches, cliquer sur Générer après avoir renseigné le titre",
      type: "slug",
      options: {
        source: "title"
      },
      validation: (Rule) => Rule.required(),
      hidden: true
    }),
    defineField({
      name: "researchsList",
      title: "Liste des pages",
      description: "Placer dans l'ordre à afficher sur la page recherches",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "research" }],
          options: {
            // Avoid displaying researchs who are already in this list
            filter: ({ parent }) => {
              const refs = (parent as { _ref?: string }[])
                .map((m) => m._ref)
                .filter(Boolean) as string[];
              if (refs.length === 0) {
                return { filter: "true" };
              }
              const refList = refs.map((id) => `"${id}"`).join(", ");

              return {
                filter: `!(_id in [${refList}])`
              };
            }
          }
        })
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("La liste doit contenir au moins un item")
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current"
    },
    prepare({ title, subtitle }) {
      const displaySubtitle = subtitle
        ? `${import.meta.env.SITE.replace("https://", "")} / ${subtitle}`
        : "";
      return {
        title: title,
        subtitle: displaySubtitle
      };
    }
  }
});
