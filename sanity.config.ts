import { frFRLocale } from "@sanity/locale-fr-fr";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema, singltetonDocs } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [structureTool({ structure }), frFRLocale()],
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        const singletonDocuments = singltetonDocs.map((doc) => doc.name);
        return prev.filter(
          (item) => !(singletonDocuments as string[]).includes(item.templateId),
        );
      }
      return prev;
    },
  },
  schema,
});
