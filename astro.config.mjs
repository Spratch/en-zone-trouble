// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://enzonetrouble.fr",
  integrations: [
    sanity({
      projectId: "a7gwf3qs",
      dataset: "production",
      useCdn: false,
      apiVersion: "2026-05-26",
      studioBasePath: "/admin"
    }),
    react()
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Garabosse",
      cssVariable: "--font-serif",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Garabosse-Parangonne.woff2"],
            weight: 300,
            style: "normal"
          },
          {
            src: ["./src/assets/fonts/Garabosse-Gaillarde.woff2"],
            weight: 400,
            style: "normal"
          }
        ]
      }
    },
    {
      provider: fontProviders.fontsource(),
      name: "Homemade Apple",
      cssVariable: "--font-script"
    },
    {
      provider: fontProviders.local(),
      name: "Ronzino",
      cssVariable: "--font-sans",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Ronzino-Regular.woff2"],
            weight: 400,
            style: "normal"
          },
          {
            src: ["./src/assets/fonts/Ronzino-Oblique.woff2"],
            weight: 400,
            style: "oblique"
          },
          {
            src: ["./src/assets/fonts/Ronzino-Medium.woff2"],
            weight: 500,
            style: "normal"
          },
          {
            src: ["./src/assets/fonts/Ronzino-MediumOblique.woff2"],
            weight: 500,
            style: "oblique"
          }
        ]
      }
    }
  ]
});
