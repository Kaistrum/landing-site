# Kairos Spatial Solutions, site overview

Marketing and case study site for Kairos Spatial Solutions, a GIS consultancy
working with governments, utilities and NGOs, mainly across Africa.

Written for an engineer picking the codebase up. It covers how the site is put
together, where content lives, the conventions to follow, and what is currently
unfinished.

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16.2.9, **Pages Router**, Turbopack |
| React | 19.2.4, TypeScript 5, `strict: true` |
| Styling | Tailwind v4 via `@tailwindcss/postcss`. No `tailwind.config` file: tokens live in CSS |
| Animation | `framer-motion` 12 |
| Icons | `lucide-react` |
| Maps | ArcGIS Maps SDK for JavaScript 4.34, loaded from Esri's CDN at runtime. **Not** an npm dependency |
| Hosting | Static export plus one server-rendered route (`/sitemap.xml`) |

Path alias `@/*` maps to `./src/*`.

There is no CMS, no MDX and no database. All content is typed TypeScript in
`src/data/` or inline in the page that uses it.

---

## Routes

Roughly two dozen pages, almost all prerendered at build.

```
/                                        home
/about
/careers
/case-studies                            listing, with an industry filter
/case-studies/[slug]                     shared template  -> faraja
/case-studies/gold-prospectivity-kakamega   hand-built route
/industries/[slug]                       10 pages
/services/[slug]                         6 pages
/sitemap.xml                             server rendered
/api/hello                               Next.js scaffold, unused
```

**Industries** (10): `government-defense`, `utilities-infrastructure`,
`telecoms-broadband`, `transportation-logistics`, `mining-natural-resources`,
`agriculture`, `ngos-nonprofits`, `smart-cities`, `environmental`,
`disaster-response`.

**Services** (6): `infrastructure-deployment`, `data-migration`,
`custom-development`, `system-integration`, `training`, `support`.

---

## Where content lives

### `src/data/cases.ts`

The case study registry, and the single most load-bearing file on the site.
One array feeds four surfaces:

- `components/CaseStudies.tsx`, the home page section
- `pages/case-studies/index.tsx`, the listing and its industry filter tabs
- `pages/case-studies/[slug].tsx`, the shared detail template
- `pages/sitemap.xml.tsx`, which maps over it for case URLs

It exports two types:

- **`CaseStudySummary`** is what every listing surface needs: slug, tag,
  industry, client, location, year, title, summary, accent, results, services,
  image placeholders, and an optional `customPage` flag.
- **`CaseStudyData`** extends it with the narrative the shared template
  renders: challenge, solution, outcomes, optional testimonial and media.

`customPage: true` means the study has its own hand-built route. The shared
template filters those out of `getStaticPaths`, so the two never collide on the
same URL. That is how the gold prospectivity study gets a bespoke page while
still appearing in the listing, the home section, the sitemap and the relevant
industry page.

### Industry and service pages

`pages/industries/[slug].tsx` (1,470 lines) and `pages/services/[slug].tsx`
(1,131 lines) each hold their full content as a typed array at the top of the
file, then render it through one template. They are large but flat: to change
copy, edit the array.

Industry pages also pull from `cases.ts`, matching on the shared industry name,
and render a "Work we have shipped" section when a study matches. This is why
the mining page links the gold study and the disaster response page links
Faraja, with no per-page wiring.

### The gold prospectivity case study

Three data files, deliberately separated by concern:

- `src/data/goldProspectivity.ts`, the facts and copy as structured data
- `src/data/kakamegaLayers.ts`, the ArcGIS layer registry
- `src/data/worldDots.ts`, generated world map geometry for the hero
- `src/data/goldProspectivity.pending.md`, the record of what is unresolved

---

## Design system

Tokens are defined in `src/styles/globals.css` on `:root`, with light mode
overrides under `:root.light`:

```
--bg  --bg-surface  --bg-card
--border  --border-subtle
--text  --text-dim  --text-muted
--accent  --accent-dim  --accent-faint
--nav-bg  --drop-bg
```

**Dark is the default.** `ThemeContext` initialises to `"dark"` and opts into
light from `localStorage`, with an inline script in `_document.tsx` applying
the class before paint to avoid a flash. The storage key is `kaistrum-theme`.

**Type.** SF Pro Display, self-hosted from `public/fonts/`, for everything.
`Instrument Serif` from Google Fonts, italic, used only as a secondary voice in
headlines. Do not add a third family.

**Section rhythm**, consistent across every page:

- a 10px uppercase eyebrow at `tracking-[0.22em]` above each section heading
- `py-20 md:py-24` vertical spacing, `px-4 md:px-8` gutters
- `max-w-6xl mx-auto` content column
- alternating `var(--bg)` and `var(--bg-surface)` backgrounds so the page reads
  as blocks rather than one scroll
- 1px borders, and **zero border radius anywhere**

Per-case accent colours live on the case object (`accent`), not in the tokens.

---

## SEO

`components/SEO.tsx` is the single entry point. It takes title, description,
path, optional OG image and JSON-LD, and emits the title, canonical, Open Graph
and Twitter tags.

The title rule: if the title already contains "Kairos" it is used as is,
otherwise ` — Kairos` is appended. The short form is deliberate, because titles
truncate near 60 characters in search results and the full name pushed several
pages past it. The full legal name is carried where length does not matter:
`og:site_name`, all JSON-LD `name` fields, the footer copyright and the
homepage title.

Schema helpers in the same file: `orgSchema`, `websiteSchema`,
`breadcrumbSchema`, `serviceSchema`, `articleSchema`.

`sitemap.xml.tsx` is server rendered and generates case URLs from `cases.ts`.

---

## The maps

Only the gold prospectivity case study uses maps. The architecture is built so
that nothing map related costs anything on any other page.

### Loading

`src/lib/arcgis.ts` is a single shared loader. One promise per page, so three
map modules cost one download. It injects Esri's stylesheet and the AMD loader
at `js.arcgis.com/4.34/init.js`, then resolves modules through `require`.

**It must stay on the AMD build.** The `@arcgis/core` ESM build on the same CDN
loads fine as browser ESM, but does not ship Calcite's component assets: the
SDK looks for them under `<assetsPath>/esri/widgets/support/components/assets`,
which 404s. Calcite components then initialise with an empty `messages` object
and the first widget to format a localised string throws
`Cannot read properties of undefined (reading 'replace')`. This affects popups
as well as the LayerList, so it is not avoidable by dropping widgets. The ESM
path is intended for npm installs that copy the assets folder locally. `init.js`
sets its own `baseUrl` from its script src and resolves everything. The reason
is written into the file; do not switch back without hosting the assets.

### Lazy loading

Nothing is fetched until a map module is near the viewport, via
`IntersectionObserver` with a 400px root margin. Until then each slot shows a
placeholder at the exact final footprint, so there is no layout shift. A reader
who never scrolls that far downloads no SDK at all.

### Rendering rules

`src/lib/prospectivityMap.ts` holds everything shared. The important one:
**both models are drawn with one renderer defined in code, keyed on
`Pros_Class`.** The two services ship renderers that disagree, and their
`gridcode` domains differ (Random Forest 1 to 5, SVM 0 to 5). Keying on
`gridcode` would silently misalign the comparison.

Also here: ctrl or cmd plus scroll to zoom with a visible hint, two fingers to
pan on touch, extent clamped to the county, and `syncViews` with a reentrancy
guard so the two swipe panes cannot drive each other in a loop.

### The modules

- **Map A**, a swipe comparison. `SwipeCompare` stacks two panes with a
  draggable divider; the handle is a real slider with arrow key support and
  `aria-valuetext`. Pane contents are arbitrary `ReactNode`, which is how live
  views sit inside it.
- **Map B**, the targets explorer. Six layers, Legend, LayerList and Home in
  collapsed `Expand` wrappers, popups built from fields confirmed to exist,
  and a model toggle that switches layer visibility rather than rebuilding, so
  the reader keeps their extent.
- **Hero**, a dot grid world map. Pure inline SVG, no SDK, no raster image.
  Generated from Natural Earth land polygons by scanline fill onto an
  equirectangular grid, stored as 2,339 hex characters and expanded at module
  load into 2,974 dots rendered as a single `<path>`. Markers come from a
  `sites` array and are placed by real longitude and latitude.

Legends are click to reveal everywhere, as plain HTML (`ClassLegend`) rather
than the SDK widget, so the class ramp is still explained if the SDK never
loads. Views destroy on unmount. Failures show a plain message, never an empty
grey box, and log the real exception under a `[maps]` prefix.

### The layer registry

`src/data/kakamegaLayers.ts` is **the only place in the codebase that holds an
ArcGIS item ID**. Nothing else may hardcode one. It also records what the live
services actually contain: field lists, per-class feature counts, geometry
types and the sub county filter. Those were read from the REST endpoints, not
assumed. If a service is republished, re-run the inspection before trusting the
popup configs.

---

## House rules

These apply to new work and are enforced by review, not tooling.

1. **No em dashes** in new copy. Much of the older copy still contains them;
   leave those alone unless you are rewriting the sentence anyway.
2. **No invented facts.** Every figure on a case study page must trace to the
   project record. If a number is not confirmed, it does not ship, and it goes
   in the pending file instead.
3. **Accessibility is not optional.** WCAG AA contrast, keyboard reachable
   controls, visible focus, alt text or a text alternative on every visual.
4. **`prefers-reduced-motion` is respected** on anything that moves. The maps
   and the gold study's `Reveal` already do this; most older components do not.
5. **Additive changes.** Do not restructure shared templates to fit one page.
   If a page needs a different shape, give it its own route and set
   `customPage: true`.

---

## Current state

Build is green. Typecheck is clean. Roughly two dozen routes prerender.

### Known issues

- **The contact form does not work.** `components/Contact.tsx` posts to
  `https://formspree.io/f/your-form-id`, a placeholder. Every submission fails.
  This is the most urgent item on the site.
- **The domain and email are still `kaistrum.com`.** `BASE_URL` in
  `components/SEO.tsx` and `pages/sitemap.xml.tsx`, the sitemap line in
  `public/robots.txt`, and six `hello@kaistrum.com` references including two
  live `mailto:` links. These were left deliberately rather than guessing a new
  domain, since getting them wrong breaks canonicals, OG and the sitemap.
- **`/logo.png` is presumably the old mark**, used in the header, footer,
  contact panel, favicon and all JSON-LD.
- **The theme storage key is `kaistrum-theme`**, in both `ThemeContext.tsx` and
  the inline script in `_document.tsx`. Renaming it silently discards every
  returning visitor's saved preference, for no user-visible gain. If you do
  change it, change both.
- **Industry and service slugs are duplicated** between the page templates and
  `sitemap.xml.tsx`. Add a page in one place and the sitemap silently goes
  stale. Worth collapsing into a shared module.
- **`pages/api/hello.ts`** is the Next.js scaffold default and can go.

### Outstanding on the gold prospectivity study

Tracked in full in `src/data/goldProspectivity.pending.md`. In short:

- **It is not cleared for publication.** The work was done under the Esri
  Eastern Africa programme, not as a Kairos engagement, and the final
  attribution wording is unconfirmed. The placeholder block that said so was
  removed on request, so that record file is now the only thing holding this.
- The limits section and the field verification section were also removed on
  request. The page now carries strong figures with no statement of scope.
- **Hamisi is in Vihiga County, not Kakamega.** The project record says targets
  cluster in "Lurambi and Hamisi sub counties", and that sentence is live on
  the page, but Map B's sub county layer is filtered to Kakamega so Hamisi will
  not be drawn. Unresolved.
- The licence layer is named `ActiveLicenses_kakamega` but all four features
  read `Status: Pending Renewal`. It is labelled "Prospecting licence areas"
  rather than repeating the service name.
- PR-AUC and the open ground figure are withheld pending confirmation.
- Lithology stays unshared by decision, and is excluded from the registry.
- Image assets are all placeholders. The expected filenames, dimensions and
  contents are listed in
  `public/case-studies/gold-prospectivity-kakamega/README.md`.
- The warm accent `#B45309` clears AA on the light palette but only AA-large on
  dark, so small accent labels fall short in the default theme. A proper fix
  means extending `accent` from a single hex to a per-theme pair.

---

## Running it

```bash
npm install
npm run dev     # localhost:3000
npm run build
npm start
```

There is no test suite and no linting step configured beyond TypeScript.
`npx tsc --noEmit` is the check worth running before a commit.
