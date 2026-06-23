import { defineField, defineType } from "sanity";

export default defineType({
  name: "cover",
  title: "Couverture",
  description: "Image de présentation de la page",
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
});
