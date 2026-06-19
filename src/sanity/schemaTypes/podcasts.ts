import { MicrophoneIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const podcastsSchema = defineType({
  name: "podcasts",
  title: "Page podcasts",
  type: "document",
  icon: MicrophoneIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre de la page podcasts",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Identifiant unique de la page podcasts, cliquer sur Générer après avoir renseigné le titre",
      type: "slug",
      options: {
        source: "title"
      },
      validation: (Rule) => Rule.required(),
      hidden: true
    }),
    defineField({
      name: "podcastsList",
      title: "Liste des podcasts",
      description: "Placer dans l'ordre à afficher sur la page podcasts",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "podcast" }],
          options: {
            // Avoid displaying podcasts who are already in this list
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
      validation: (Rule) => Rule.required()
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
