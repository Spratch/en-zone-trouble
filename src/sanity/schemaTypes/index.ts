import type { SchemaPluginOptions } from "sanity";
import { aboutSchema } from "./about";
import { calendarSchema } from "./calendar";
import { jobSchema } from "./job";
import { legalSchema } from "./legal";
import { memberSchema } from "./member";
import credits from "./objects/credits";
import customBlock from "./objects/customBlock";
import eventsBySeason from "./objects/eventsBySeason";
import favicon from "./objects/favicon";
import gallery from "./objects/gallery";
import imageAlt from "./objects/imageAlt";
import linksArray from "./objects/linksArray";
import { podcastSchema } from "./podcast";
import { researchSchema } from "./research";
import { settingsSchema } from "./settings";
import { showSchema } from "./show";
import { transmissionSchema } from "./transmission";

const singltetonDocs = [
  settingsSchema,
  researchSchema,
  calendarSchema,
  transmissionSchema,
  aboutSchema
];
export const listDocs = [
  showSchema,
  podcastSchema,
  memberSchema,
  legalSchema,
  jobSchema
];
const objects = [
  favicon,
  imageAlt,
  credits,
  linksArray,
  eventsBySeason,
  customBlock,
  gallery
];
export const schema: SchemaPluginOptions = {
  types: [...singltetonDocs, ...listDocs, ...objects]
};
