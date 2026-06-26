import {
  CaseIcon,
  ComposeIcon,
  DocumentsIcon,
  EyeOpenIcon,
  MicrophoneIcon,
  UsersIcon
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import { sli, type StructureListItemType } from "./lib/structure-builder";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const dataStructure: StructureResolver = (S) => {
  const li = (...a: StructureListItemType) => sli(S, a[0], a[1], a[2], a[3]);

  return S.list()
    .title("Données")
    .items([
      li("show", "Tous les spectacles", EyeOpenIcon, "list"),
      li("podcast", "Tous les podcasts", MicrophoneIcon, "list"),
      li("research", "Toutes les recherches", ComposeIcon, "list"),

      S.divider(),

      li("member", "Personnes", UsersIcon, "list"),
      li("job", "Métiers", CaseIcon, "list"),

      S.divider(),

      li("legal", "Pages légales", DocumentsIcon, "list")

      // S.divider().title("Médias")

      // li("sanity.imageAsset", "Images", ImagesIcon, "list"),
      // li("sanity.fileAsset", "Fichiers PDF", DocumentPdfIcon, "list")
    ]);
};
