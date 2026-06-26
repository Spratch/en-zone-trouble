import type { NavbarProps } from "sanity";

export default function StudioNavBar(props: NavbarProps) {
  return (
    <>
      <style>
        {`span:has(> [data-testid="button-resources-menu"]), span:has([data-sanity-icon="bolt"]) {
      display: none;
      }`}
      </style>
      {props.renderDefault(props)}
    </>
  );
}
