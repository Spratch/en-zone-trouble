import { defineType } from "sanity";

export default defineType({
  name: "cover",
  title: "Couverture",
  description: "Image de présentation de la page",
  type: "image",
  options: {
    hotspot: true
  },
  validation: (rule) => rule.required().assetRequired()
});
