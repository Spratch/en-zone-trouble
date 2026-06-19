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
import { sli, type StructureListItemType } from "./lib/structure-builder";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  const li = (...a: StructureListItemType) => sli(S, a[0], a[1], a[2], a[3]);

  return S.list()
    .title("Contenus")
    .items([
      S.divider().title("Pages"),

      li("shows", "Spectacles", EyeOpenIcon, "singleton"),
      li("podcasts", "Podcasts", MicrophoneIcon, "singleton"),

      S.divider(),

      li("transmission", "Transmission", AsteriskIcon, "singleton"),
      li("calendar", "Calendrier", CalendarIcon, "singleton"),

      S.divider(),

      li("research", "Recherche", ComposeIcon, "singleton"),
      li("about", "À propos", InfoOutlineIcon, "singleton"),

      S.divider().title("Réglages"),

      li("settings", "Paramètres", ControlsIcon, "singleton"),
      li("legal", "Pages légales", DocumentsIcon, "list")
    ]);
};
