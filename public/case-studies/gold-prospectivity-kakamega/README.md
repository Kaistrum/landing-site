# Assets: Gold Prospectivity Mapping, Kakamega County

Route: `/case-studies/gold-prospectivity-kakamega`

Every slot on the page currently renders a marked placeholder at the exact
footprint the final asset will occupy, so dropping a file in causes no layout
shift. Dropping a file in here is not enough on its own: the page still needs
its `ImgSlot` or `MapSlot` call swapped for `next/image` or the live view,
since both are placeholder-only by design.

Do not substitute stock photography or a redrawn map. If an asset is not
available, the placeholder stays.

## Map placeholder stills

One per map module. These are what a reader sees before the ArcGIS SDK loads,
and what they keep seeing if the SDK or a layer fails. They must therefore be
legible on their own, with a legend baked in.

All three must use the same five step class ramp as the live maps, defined
once in `src/data/kakamegaLayers.ts` as `prospectivityClasses`.

| Filename | Footprint | Min dimensions | What it shows |
| --- | --- | --- | --- |
| `map-a-rf.png` | 420px tall mobile, 520px desktop | 2000 x 1040 | Random Forest prospectivity, left pane of the swipe. |
| `map-a-svm.png` | 420px tall mobile, 520px desktop | 2000 x 1040 | Support Vector Machine prospectivity, right pane of the swipe. **Must be rendered at pixel-identical extent and size to `map-a-rf.png`**, or the swipe will not align. |
| `map-b-targets.png` | 420px tall mobile, 560px desktop | 2200 x 1120 | Random Forest prospectivity over Kakamega County with sub county outlines, prospecting licence areas and the 68 gold occurrences. Legend included. |
| `locator-kakamega.png` | 260px tall, max 448px wide | 900 x 520 | Kakamega County outlined against western Kenya so a reader unfamiliar with Kenya can place it. Map C is a static image by design and never loads the SDK. |

## Page images

| Filename | Aspect | Min dimensions | What it shows |
| --- | --- | --- | --- |
| `prospectivity-map-rf.png` | 16:9 | 1920 x 1080 | Random Forest prospectivity map, five classes Very Low to Very High, with legend, scale bar and north arrow. |
| `prospectivity-map-svm.png` | 4:3 | 1200 x 900 | Support Vector Machine prospectivity map, same extent and identical class breaks to the Random Forest map. |
| `hero-map-muted.png` | 16:9 | 2400 x 1350 | Desaturated, low-contrast still of the prospectivity map for the hero background. Must stay legible behind heading text at WCAG AA. Not a live map. |

## Mobile

Map A is now a swipe rather than two maps side by side, so it needs no mobile
variant: one full-width pane stays legible at phone width and the reader wipes
between models. Map B is still a full-county view and is unreadable below
roughly 480px, so it needs a crop to the Liranda Corridor rather than a shrunk
full extent:

| Filename | Aspect | Min dimensions | What it shows |
| --- | --- | --- | --- |
| `map-b-targets-mobile.png` | 4:3 | 1200 x 900 | Map B cropped to the Liranda Corridor for phone width. |

## Alt text

Alt text is written in the page, not here, and describes the pattern a sighted
reader would take from the map rather than naming the file. Each `MapSlot`
also carries a visually hidden text alternative that survives into the live
map. See the `MapSlot` and `ImgSlot` calls in
`src/pages/case-studies/gold-prospectivity-kakamega.tsx`.

## Note on this file

`public/` is served, so this README is reachable at
`/case-studies/gold-prospectivity-kakamega/README.md`. Move it out of `public/`
if that is not wanted.
