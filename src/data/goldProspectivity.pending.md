# Outstanding items: gold prospectivity case study

Nothing in this list is rendered on the page.

## Blocking publication

> The page carries no on-page marker for any of this. The attribution
> placeholder block that used to sit at the foot was removed on request, so
> this file is the only remaining record that the page is not cleared to ship.

- **Attribution wording and publication clearance.** The work was carried out
  under the Esri Eastern Africa programme, not as a Kairos engagement. The page
  currently credits no one. It must not go live until the final attribution
  wording is confirmed and added back. The word "intern" must not appear
  anywhere. Owner: Abigail.

## Figures withheld

- **PR-AUC.** Two pairs exist in the project record: 0.910 / 0.906 for Random
  Forest and 0.850 / 0.838 for SVM. Neither pair appears on the page until the
  final pair is confirmed. Owner: Abigail.
- **Open ground and licence holders.** The figure of over 2,600 km² of
  prospective ground with no active licence, and the active licence holder
  count. Both need the licence dataset and its date confirmed first, since
  licence status changes. Owner: Abigail.

## Needs a decision

- **Project year.** The listing card and the `articleSchema` `datePublished`
  currently carry 2026, which is a publication year rather than a project fact.
  No date for the work appears in the project record. Confirm the real one.
- **Warm accent in dark mode.** The page uses `#B45309`, which clears WCAG AA
  on the light palette. On the dark palette it clears AA for large text only,
  so the small accent labels fall short. A proper fix is a per-theme token
  pair, `#F59E0B` for dark and `#B45309` for light, which means extending the
  `accent` field on `CaseStudySummary` from a single hex to a pair.

## Settled

- **SDK loads via the AMD build, not @arcgis/core ESM.** The ESM build on the
  CDN does not ship Calcite's component assets: the SDK looks for them under
  `<assetsPath>/esri/widgets/support/components/assets`, which is 404 on
  js.arcgis.com. Calcite components then come up with an empty `messages`
  object and the first widget to format a localised string throws
  `Cannot read properties of undefined (reading 'replace')`. The ESM path is
  meant for npm installs that copy the assets folder locally. `init.js` sets
  its own baseUrl from its script src and resolves everything, so it is the
  right route for a CDN load. Do not switch back without hosting the assets.

- **Lithology stays unshared.** Item `1fddec32bc9e48f7b91d986d663831fc` returns
  403 anonymously and will not be shared. It is excluded from the layer
  registry entirely, not pending. Map B ships without it; the host rock story
  is carried by `Litho_Name` and `Rock_Type`, which are already present on the
  prospectivity layers. Do not add credentials, a proxy or an API key.
- **Map A is a swipe.** Built as `SwipeCompare`, a generic two-pane wipe with a
  draggable, keyboard-driven divider. Pane contents are arbitrary, so phase 4
  drops a live `MapView` into each side without touching the component. This
  supersedes both the side-by-side stills and the brief's "swipe is not part of
  this pass".
- **Map C is a static image.** It never loads the SDK.

## Resolved by inspection

- **`Pros_Class` exists** on Random Forest, SVM and NewZones, with exactly five
  values: Very Low, Low, Moderate, High, Very High. The `_LITHO` layers are the
  right ones, so the plain `Random Forest` and `SVM` fallback IDs stay
  commented out and unused.
- **The two services ship disagreeing renderers.** Random Forest uses
  uniqueValue over `gridcode` 1 to 5; SVM uses classBreaks over `gridcode` 0 to
  5, with one feature at 0 that maps to Very Low. A shared renderer keyed on
  `gridcode` would misalign the models, so the page keys on `Pros_Class` and
  defines one renderer in code.

## Needs a decision, found during inspection

- **The licence layer is not active licences.** All four features in
  `ActiveLicenses_kakamega` carry Status "Pending Renewal". None is active.
  The registry labels it "Prospecting licence areas" rather than repeating the
  service name. This also means the withheld "active licence holder count"
  cannot be sourced from this layer as it stands. Holders are Gold Rim
  Exploration Kenya Ltd (three) and Shanta Gold Kenya Limited (one). `Name` is
  empty on three of four, so popups use `Parties`. `AreaUnit` is mixed, three
  in Square Kilometre and one in Cadastral Blocks, so the areas are not
  summable.
- **Hamisi is not in Kakamega County.** It sits in Vihiga. The project record
  states targets cluster "in Lurambi and Hamisi sub counties", and that
  sentence is live on the page. Lurambi checks out; Hamisi straddles the stated
  study area. The sub county service covers eight counties and is filtered to
  Kakamega, which means Hamisi will not be drawn on Map B while the text names
  it. Resolve before publishing.
- **NewZones stays uncaptioned.** The layer is named `Overlap_New_1km`, carries
  both models' attribute sets side by side, and both are restricted to High and
  Very High. The registry label states exactly that much and no more. What
  "New_1km" refers to is not established, so no buffer claim appears anywhere.

## Removed from the page on request

The limits section, the field verification section and the attribution
placeholder were all removed on request. The limits wording is kept here so
it is not lost, since the brief marked it as not optional. Nothing on the
live page now states the scope of the output.

- The output ranks exploration priority at district scale. It is not a drill hole siting tool. High and Very High zones cover multi square kilometre areas, not individual pixels to be treated as targets.
- Background points were randomly sampled rather than drawn from confirmed barren ground.
- Mapped faults come from regional geological survey mapping at 1:250,000, which does not resolve the second and third order shear splays that host the mineralisation. DEM curvature derivatives partly compensate by capturing structural grain in the topography.
- Soil geochemical dispersion halos are hundreds of metres wide, so the geochemical signal is smeared relative to the structures that control the gold.
- The model narrows the search space. It does not replace the geologist.
