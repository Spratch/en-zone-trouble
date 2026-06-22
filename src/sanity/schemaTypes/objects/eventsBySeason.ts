import { BlockElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "seasons",
  title: "Saisons",
  description: "Liste des événements par saisons",
  type: "array",
  of: [
    {
      name: "season",
      title: "Saison",
      icon: BlockElementIcon,
      type: "object",
      fields: [
        defineField({
          name: "range",
          title: "Plage de dates",
          description: "Au format '25/26', sera précédé de 'Saison'",
          type: "string",
          validation: (Rule) =>
            Rule.required().custom((value) => {
              if (!value || !/^\d{2}\/\d{2}$/.test(value)) {
                return { message: "Le format doit être YY/YY" };
              }
              return true;
            })
        }),
        defineField({
          name: "events",
          title: "Événements",
          description: "Liste des événements",
          type: "array",
          of: [{ type: "event" }],
          validation: (Rule) => Rule.required()
        })
      ],
      preview: {
        select: {
          title: "range",
          events: "events"
        },
        prepare: (selection) => {
          return {
            title: `Saison ${selection.title}`,
            subtitle: selection.events.length
              ? `${selection.events.length} événement${selection.events.length !== 1 ? "s" : ""}`
              : undefined
          };
        }
      }
    }
  ]
});
