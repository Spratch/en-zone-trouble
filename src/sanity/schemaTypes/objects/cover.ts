import { defineType } from "sanity";

export default defineType({
  name: "cover",
  title: "Couverture",
  description: "Image de présentation de la page",
  type: "image",
  options: {
    hotspot: true
  },
  validation: (rule) =>
    rule.required().custom((value) => {
      return value?.asset ? true : "Une image doit être sélectionnée";
    })
});
