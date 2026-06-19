import type { NavbarProps } from "sanity";

export default function StudioNavBar(props: NavbarProps) {
  return (
    <>
      <style>
        {`span:has(> [data-testid="button-resources-menu"]) {
      display: none;
      }`}
      </style>
      {props.renderDefault(props)}
    </>
  );
}
