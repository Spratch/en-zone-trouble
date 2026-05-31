import { MicrophoneIcon } from "@sanity/icons";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { defineConfig } from "sanity";
import { muxInput } from "sanity-plugin-mux-input";
import { structureTool } from "sanity/structure";
import { schema, singltetonDocs } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  projectId: "a7gwf3qs",
  dataset: "production",
  plugins: [
    structureTool({ structure }),
    frFRLocale(),
    muxInput({
      disableUploadConfig: true,
      tool: {
        title: "Audios et vidéos",
        icon: MicrophoneIcon,
      },
    }),
  ],
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
