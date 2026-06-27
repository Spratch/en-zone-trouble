import {
  AsteriskIcon,
  CalendarIcon,
  ComposeIcon,
  ControlsIcon,
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
    .title("Site")
    .items([
      S.divider().title("Pages"),

      li("shows", "Spectacles", EyeOpenIcon, "singleton"),
      li("podcasts", "Podcasts", MicrophoneIcon, "singleton"),

      S.divider(),

      li("researchs", "Recherche", ComposeIcon, "singleton"),
      li("transmission", "Transmission", AsteriskIcon, "singleton"),

      S.divider(),

      li("calendar", "Calendrier", CalendarIcon, "singleton"),
      li("about", "À propos", InfoOutlineIcon, "singleton"),

      S.divider().title("Général"),

      li("settings", "Paramètres", ControlsIcon, "singleton")
    ]);
};
