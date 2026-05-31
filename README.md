# En Zone Trouble

Site web pour la compagnie de théatre "En Zone Trouble".

## Stack
- Astro (site/front-end)
- Sanity (headless CMS, studio intégré via `@sanity/astro` et `@astrojs/react`)
- Mux (support audio/vidéo) via plugin Sanity

## Prérequis
- Node.js >= 22.12.0
- pnpm

## Installation et démarrage (local)
1. Installer les dépendances :
     ```
     pnpm install
     ```

2. Lancer le serveur de développement :
   ```
   pnpm dev
   ```

3. Ouvrez votre navigateur :
   - Site : http://localhost:4321 (port par défaut)
   - Administration : http://localhost:4321/admin

## Commandes utiles
- Développement : `pnpm dev`
- Générer le site (build) : `pnpm build`
- Tester le build localement : `pnpm preview`
- Extraction des schémas Sanity (watch) : `pnpm run schemas` (exécute `sanity schemas extract --watch`)
- Génération des types/query typegen (watch) : `pnpm run queries` (exécute `sanity typegen generate --watch`)

Les deux dernières commandes nécessitent la CLI Sanity (ou `npx sanity ...`).

## Structure rapide du projet
- `src/`
  - `layouts/` — styles et layout principal
  - `pages/` — pages publiques
  - `components/` — composants réutilisables
  - `assets/fonts/` — polices locales
  - `sanity/` — schémas, structure et utilitaires Sanity
- `astro.config.mjs`: 
  - configuration Astro
  - intégration Sanity
  - fontes locales
- `package.json` — scripts et dépendances
- `sanity.config.ts` & `sanity.cli.ts` — configuration Sanity (studio & CLI)

## Ressources
- [Documentation Astro](https://docs.astro.build/fr/getting-started/)
- [Documentation Sanity](https://www.sanity.io/docs)
