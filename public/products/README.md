# Assets: products page

Route: `/products`

**There are no image assets on this page, by design.**

Each product section renders an SVG illustration from
`src/components/products/ProductGraphic.tsx`, generated from fixed arithmetic
rather than randomness so server and client markup match. Four variants:

| Variant | Used by | What it shows |
| --- | --- | --- |
| `prospectivity` | Kaistrum Minerals | A contour field tightening onto a high point, with marked locations near the centre |
| `seismic` | Kaistrum Petroleum | Layered subsurface bands crossed by vertical acquisition lines, one horizon picked out |
| `water` | Kaistrum Water | A drainage basin with a branching stream network running to an outlet |
| `fleets` | Kaistrum Fleets | A road network with one route traced across it |

These are illustrations, not data. They carry no legend, no scale bar and no
place names, so none of them can be mistaken for a result.

**Real maps and real outputs belong on the case study pages**, where there is
a source to credit and something to caption. Do not move a case study map onto
this page, and do not substitute a stock photo of a mine or a rig.

The same graphics also stand in for a case study card's thumbnail on
`/case-studies` when the study has a `product` but no image yet.

## Alt text

Alt text lives in `src/data/products.ts` on each product's `graphicAlt` field,
not here.

## Pending

No seismic visual is to be produced yet. When the Kaistrum Petroleum work has
a real output worth showing, it goes on a case study page first.
