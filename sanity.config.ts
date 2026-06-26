import {
  DatabaseIcon,
  DocumentsIcon,
  MicrophoneIcon,
  SortIcon
} from "@sanity/icons";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { defineConfig } from "sanity";
import { muxInput } from "sanity-plugin-mux-input";
import { webhooksTrigger } from "sanity-plugin-webhooks-trigger";
import { structureTool } from "sanity/structure";
import { dataStructure } from "./src/sanity/dataStructure";
import CustomDocument from "./src/sanity/lib/customDocument";
import StudioNavBar from "./src/sanity/lib/studioNav";
import { listDocs, schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  projectId: "a7gwf3qs",
  dataset: "production",
  title: "En zone trouble",
  plugins: [
    structureTool({
      structure,
      name: "structure",
      title: "Site",
      icon: DocumentsIcon
    }),
    structureTool({
      structure: dataStructure,
      name: "content",
      title: "Contenus",
      icon: DatabaseIcon
    }),
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
    components: {
      unstable_layout: CustomDocument
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (
        creationContext.type === "global" ||
        creationContext.type === "document"
      ) {
        const listDocuments = listDocs.map((doc) => doc.name);
        return prev.filter((item) =>
          (listDocuments as string[]).includes(item.templateId)
        );
      }
      return prev;
    },
    inspectors: (prev) =>
      prev.map((inspector) =>
        inspector.name === "sanity/structure/incoming-references"
          ? {
              ...inspector,
              useMenuItem(props) {
                return {
                  ...props,
                  title: "Références entrantes",
                  icon: SortIcon,
                  showAsAction: true
                };
              }
            }
          : inspector
      ),
    comments: { enabled: false }
  },
  studio: {
    components: {
      navbar: StudioNavBar
    }
  },
  schema,
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  tasks: { enabled: false },
  scheduledPublishing: { enabled: false },
  announcements: { enabled: false }
});
