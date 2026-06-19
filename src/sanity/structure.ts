import {
  AsteriskIcon,
  CalendarIcon,
  ComposeIcon,
  ControlsIcon,
  DocumentsIcon,
  EyeOpenIcon,
  InfoOutlineIcon,
  MicrophoneIcon
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) => {
  const li = (
    id: string,
    title: string,
    Icon: React.ComponentType,
    type: "singleton" | "list"
  ) => {
    return type === "list"
      ? S.documentTypeListItem(id).icon(Icon).title(title)
      : S.listItem()
          .title(title)
          .icon(Icon)
          .child(S.document().schemaType(id).documentId(id).title(title));
  };

  return S.list()
    .title("Contenus")
    .items([
      li("shows", "Spectacles", EyeOpenIcon, "singleton"),
      li("podcasts", "Podcasts", MicrophoneIcon, "singleton"),

      S.divider(),

      li("about", "À propos", InfoOutlineIcon, "singleton"),
      li("calendar", "Calendrier", CalendarIcon, "singleton"),
      // li("member", "Personnes", UsersIcon, "list"),
      // li("job", "Métiers", CaseIcon, "list"),

      S.divider(),

      li("research", "Recherche", ComposeIcon, "singleton"),
      li("transmission", "Transmission", AsteriskIcon, "singleton"),

      S.divider(),

      li("settings", "Paramètres", ControlsIcon, "singleton"),
      li("legal", "Pages légales", DocumentsIcon, "list")
    ]);
};
