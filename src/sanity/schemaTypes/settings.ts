import { defineArrayMember, defineField, defineType } from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Paramètres",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre du site",
      description: "Titre du site affiché sur les pages et les métadonnées",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning("Le titre du site doit contenir moins de 60 caractères")
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Entrez la description du site",
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .warning(
            "La description du site doit contenir moins de 160 caractères"
          )
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "object",
      description: "Entrez les favicons à utiliser sur le site",
      options: {
        columns: 2
      },
      fields: [
        {
          name: "dark",
          title: "Foncé",
          type: "favicon",
          description:
            "Choisissez le favicon foncé utilisé sur les fonds clairs (PNG)"
        },
        {
          name: "light",
          title: "Clair",
          type: "favicon",
          description:
            "Choisissez le favicon clair utilisé sur les fonds sombres (PNG)"
        }
      ]
    }),
    defineField({
      name: "homeImage",
      title: "Image d'accueil",
      type: "imageAlt",
      description: "Image affichée sur la page d'accueil",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "navigation",
      title: "Menu de navigation",
      description:
        "Renseigner les éléments composant le menu de navigation présent dans le footer.\nLe dernier élément du menu sera affiché seul, à droite de l'écran, l'usage est d'y mettre la page d'information ('À propos').",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          title: "Page",
          description:
            "Sélectionner une page à afficher dans le menu de navigation.",
          to: [
            { type: "shows" },
            { type: "podcasts" },
            { type: "research" },
            { type: "transmission" },
            { type: "calendar" },
            { type: "about" }
          ],
          options: {
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
  ]
});
