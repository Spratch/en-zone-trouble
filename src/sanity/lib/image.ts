import {
  createImageUrlBuilder,
  type SanityImageSource
} from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const imageBuilder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source);
}
