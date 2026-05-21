// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: "a7gwf3qs",
      dataset: "production",
      useCdn: false,
      apiVersion: "2026-05-26",
      studioBasePath: "/admin",
    }),
    react(),
  ],
});
