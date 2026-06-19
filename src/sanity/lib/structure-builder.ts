import type { StructureBuilder } from "sanity/structure";

export type StructureListItemType = [
  id: string,
  title: string,
  Icon: React.ComponentType,
  type: "singleton" | "list"
];

export const sli = (S: StructureBuilder, ...args: StructureListItemType) => {
  const [id, title, Icon, type] = args;
  return type === "list"
    ? S.documentTypeListItem(id).icon(Icon).title(title)
    : S.listItem()
        .title(title)
        .icon(Icon)
        .child(S.document().schemaType(id).documentId(id).title(title));
};
