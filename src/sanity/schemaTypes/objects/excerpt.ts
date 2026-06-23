import { defineType } from "sanity";

export default defineType({
  name: "excerpt",
  title: "Extrait",
  description:
    "Entrer le texte, il sera affiché avec une typographie scripte.\nPour une meilleure lisibilité, il est conseillé d'utiliser un extrait court.",
  type: "text",
  rows: 3,
  validation: (Rule) =>
    Rule.max(550).warning(
      "Un extrait trop long perdra en lisibilité et en harmonie visuelle."
    )
});
