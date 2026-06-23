import type { DocumentLayoutProps } from "sanity";

export default function CustomDocument(props: DocumentLayoutProps) {
  return (
    <>
      <style>
        {`/* Title */
        [data-ui="Stack"]:has(h2) {
          margin-bottom: 2.5rem;
        }

        /* Field groups tabs */
        [data-testid="pane-header"] + [data-ui="Box"] {
          overflow: visible;
          & [data-testid="field-groups"] {
            position: sticky;
            top: 0;
            background: var(--card-bg-color);
            z-index: 20;
            border-bottom: 1px solid var(--card-border-color);
            padding: 12px;
            padding-top: 0;
            margin-inline: -20px;

            @media (max-width: 615px) {
              top: 83.97px;
            }

            & [data-eq-max~="0"] {
              & [data-ui="TabList"] {
                display: block;
              }

              & [data-ui="Select"] {
                display: none;
              }
            }
          }

          /* Fields descriptions */
          & [id^="desc_"] span {
            white-space: pre-line;
          }`}
      </style>
      {props.renderDefault(props)}
    </>
  );
}
