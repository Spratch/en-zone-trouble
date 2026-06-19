import {
  BlockContentIcon,
  CalendarIcon,
  EnvelopeIcon,
  InfoOutlineIcon,
  UsersIcon
} from "@sanity/icons";
import {
  ALL_FIELDS_GROUP,
  defineArrayMember,
  defineField,
  defineType
} from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "À propos",
  type: "document",
  icon: InfoOutlineIcon,
  groups: [
    {
      name: "content",
      title: "Contenu",
      default: true,
      icon: BlockContentIcon
    },
    {
      name: "team",
      title: "Équipe",
      icon: UsersIcon
    },
    {
      name: "contact",
      title: "Contact",
      icon: EnvelopeIcon
    },
    {
      name: "events",
      title: "Événements",
      icon: CalendarIcon
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      description: "Titre de la page",
      type: "string",
      group: "content",
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
      group: "content",
      validation: (Rule) => Rule.required(),
      hidden: true
    }),
    defineField({
      name: "presentation",
      title: "Présentation",
      description: "Présentation de la compagnie",
      type: "customBlock",
      group: "content",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "seasons",
      title: "Saisons",
      type: "seasons",
      group: "events"
    }),
    defineField({
      name: "members",
      title: "Membres",
      description: "Liste des membres de l'équipe",
      type: "array",
      group: "team",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "member" }],
          options: {
            // Avoid displaying members who are already in this list
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
      validation: (Rule) => Rule.unique()
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "name",
          title: "Nom",
          description: "Nom de la personne à contacter",
          type: "string",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "phone",
          title: "Téléphone",
          description:
            "Formats national ou international acceptés, pas de parenthèses, de tirets ou de points",
          type: "string",
          validation: (Rule) => Rule.regex(/^(?:\+33|0)[1-9](?: ?\d{2}){4}$/)
        }),
        defineField({
          name: "email",
          title: "Email",
          description: "Adresse email pour joindre la compagnie",
          type: "string",
          validation: (Rule) => Rule.email()
        }),
        defineField({
          name: "address",
          title: "Adresse",
          description: "Adresse postale de contact",
          type: "text",
          rows: 2
        })
      ]
    }),
    defineField({
      name: "supports",
      title: "Soutiens",
      description: "Phrase listant les soutiens de la compagnie",
      type: "text",
      rows: 2,
      group: "content"
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
