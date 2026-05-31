import type { SchemaPluginOptions } from "sanity";
import { calendarSchema } from "./calendar";
import { companySchema } from "./company";
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
import { teamSchema } from "./team";
import { transmissionSchema } from "./transmission";

export const singltetonDocs = [
  settingsSchema,
  researchSchema,
  companySchema,
  calendarSchema,
  transmissionSchema,
  teamSchema,
];
const listDocs = [
  showSchema,
  podcastSchema,
  memberSchema,
  legalSchema,
  jobSchema,
];
const objects = [
  favicon,
  imageAlt,
  credits,
  linksArray,
  eventsBySeason,
  customBlock,
  gallery,
];
export const schema: SchemaPluginOptions = {
  types: [...singltetonDocs, ...listDocs, ...objects],
};
