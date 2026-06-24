import {
  ArrowTopRightIcon,
  SchemaIcon,
  StringIcon,
  TextIcon
} from "@sanity/icons";
import { Stack } from "@sanity/ui";
import {
  defineArrayMember,
  defineType,
  type ArrayOfObjectsInputProps,
  type BlockAnnotationProps,
  type BlockStyleProps
} from "sanity";

function CustomBlockInput(props: ArrayOfObjectsInputProps) {
  return (
    <Stack gap={3}>
      <style>
        {`
          [data-testid="pt-editor"][data-fullscreen="false"] {
            height: 10rem;
            &:has(:focus) {
              height: 19em;
            }
          }
          [data-testid="autocomplete-popover"] {
          max-height: 50svh !important;
          }
        `}
      </style>
      <div data-testid="pt-editor-container">
        {props.renderDefault({
          ...props,
          initialActive: true
        })}
      </div>
    </Stack>
  );
}

const ExternalLinkAnnotation = (props: BlockAnnotationProps) => (
  <span>
    {props.renderDefault(props)} <ArrowTopRightIcon style={{ scale: 0.75 }} />
  </span>
);

const UppercaseStyle = (props: BlockStyleProps) => (
  <span
    style={{
      fontFamily: "sans-serif",
      textTransform: "uppercase",
      fontSize: "0.85em"
    }}
  >
    {props.children}
  </span>
);

export default defineType({
  name: "customBlock",
  type: "array",
  components: {
    input: CustomBlockInput
  },
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal", icon: StringIcon },
        {
          title: "Capitales",
          value: "uppercase",
          icon: TextIcon,
          component: UppercaseStyle
        }
      ],
      marks: {
        decorators: [{ title: "Italique", value: "em" }],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Lien",
            fields: [
              {
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: false,
                    scheme: ["http", "https", "mailto", "tel"]
                  })
              }
            ],
            components: { annotation: ExternalLinkAnnotation }
          },
          {
            name: "internalLink",
            icon: SchemaIcon,
            title: "Référence",
            type: "reference",
            to: [
              { type: "show" },
              { type: "podcast" },
              { type: "research" },
              { type: "transmission" },
              { type: "member" }
            ],
            options: {
              creationTypeFilter: ({ document }, toTypes) => {
                return toTypes.filter(
                  (t) => t.type !== "research" && t.type !== "transmission"
                );
              }
            }
          }
        ]
      }
    })
  ]
});
