import { MicrophoneIcon } from "@sanity/icons";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { defineConfig } from "sanity";
import { muxInput } from "sanity-plugin-mux-input";
import { webhooksTrigger } from "sanity-plugin-webhooks-trigger";
import { structureTool } from "sanity/structure";
import { listDocs, schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  projectId: "a7gwf3qs",
  dataset: "production",
  title: "En zone trouble",
  plugins: [
    structureTool({ structure, title: "Contenus" }),
    frFRLocale(),
    muxInput({
      disableUploadConfig: true,
      tool: {
        title: "Audios et vidéos",
        icon: MicrophoneIcon
      }
    }),
    webhooksTrigger({
      title: "Déployer",
      text: "Déployer les mises à jour vers le site public. Quand le contenu est prêt, cliquez sur 'trigger'",
      encryptionSalt: "043ec7ed84f10f1d83faf117d4818fa1",
      name: "deploy"
    })
  ],
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        const listDocuments = listDocs.map((doc) => doc.name);
        return prev.filter((item) =>
          (listDocuments as string[]).includes(item.templateId)
        );
      }
      return prev;
    }
  },
  schema,
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  scheduledPublishing: { enabled: false },
  tasks: { enabled: false }
});
