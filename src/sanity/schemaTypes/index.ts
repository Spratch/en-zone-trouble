import type { SchemaPluginOptions } from "sanity";
import { aboutSchema } from "./about";
import { calendarSchema } from "./calendar";
import { jobSchema } from "./job";
import { legalSchema } from "./legal";
import { memberSchema } from "./member";
import credits from "./objects/credits";
import customBlock from "./objects/customBlock";
import event from "./objects/event";
import eventsBySeason from "./objects/eventsBySeason";
import favicon from "./objects/favicon";
import gallery from "./objects/gallery";
import imageAlt from "./objects/imageAlt";
import linksArray from "./objects/linksArray";
import simpleEvent from "./objects/simpleEvent";
import { podcastSchema } from "./podcast";
import { podcastsSchema } from "./podcasts";
import { researchSchema } from "./research";
import { settingsSchema } from "./settings";
import { showSchema } from "./show";
import { showsSchema } from "./shows";
import { transmissionSchema } from "./transmission";

const singltetonDocs = [
  settingsSchema,
  researchSchema,
  calendarSchema,
  transmissionSchema,
  aboutSchema,
  showsSchema,
  podcastsSchema
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
  gallery,
  event,
  simpleEvent
];
export const schema: SchemaPluginOptions = {
  types: [...singltetonDocs, ...listDocs, ...objects]
};
