/* Kaistrum product registry.

   Kairos Spatial Solutions is the company. Kaistrum is the platform. Each
   product is Kaistrum plus the domain it serves.

   Two rules govern everything in this file.

   1. No copy beyond what has been confirmed. Two of the four products have no
      copy yet. Their entries carry empty fields, and they render nothing.
      Plausible filler is not an acceptable substitute.

   2. Offers are not track record. These describe what the products do, in the
      present tense, not work already delivered. Nothing here may claim a
      capability has been built, validated, tested, deployed, proven or adopted,
      and no capability carries a metric, a count or a date, unless it is
      confirmed for that specific capability. Only prospectivity targeting has
      a case study behind it. Everything else is an offer with no borrowed
      credentials.

   No client, prospect or partner organisation is named anywhere. Audiences are
   described by type.

   `status` is the publishing gate. A draft product renders no section, no
   anchor and no nav entry. Filling in the copy and changing one word publishes
   it with no code change. */

import type { GraphicVariant } from "@/components/products/ProductGraphic";

export type Capability = {
	/* Plain descriptive name. Never a brand word. */
	name: string;
	summary: string;
	detail?: string[];
	/* Slug of the case study behind this capability, resolved through
	   cases.ts. Absent for every capability that does not have one. */
	caseStudy?: string;
};

export type Product = {
	/* Doubles as the in page anchor id */
	slug: string;
	name: string;
	/* Outcome led. Leads with the decision the customer makes, not the
	   technique and not the product name again. */
	headline: string;
	overview: string;
	capabilities: Capability[];
	audiences: string[];
	caseStudy?: string;
	/* An illustration, not data. Real maps and real outputs live on the case
	   study pages, where there is a source to credit and something to
	   caption. */
	graphic: GraphicVariant;
	graphicAlt: string;
	status: "live" | "draft";
};

const products: Product[] = [
	/* TODO(Abigail): headline, overview, capabilities, audiences, and a case
	   study if there is one. The section renders as a clearly marked
	   placeholder, so the page can be judged whole, but nothing is written
	   here about what the product does. */
	{
		slug: "water",
		name: "Kaistrum Water",
		headline: "",
		overview: "",
		capabilities: [],
		audiences: [],
		graphic: "water",
		graphicAlt:
			"An abstract drainage basin with a branching stream network running to an outlet.",
		status: "draft"
	},

	/* TODO(Abigail): same as above. Nothing written on assumption. */
	{
		slug: "fleets",
		name: "Kaistrum Fleets",
		headline: "",
		overview: "",
		capabilities: [],
		audiences: [],
		graphic: "fleets",
		graphicAlt:
			"An abstract road network with one route traced across it.",
		status: "draft"
	},

	{
		slug: "minerals",
		name: "Kaistrum Minerals",
		headline:
			"Find the ground worth drilling, then keep a live record of the ground you are working.",
		overview:
			"Spatial intelligence across the mining value chain, from ranking exploration targets to keeping an operating site's record current enough to decide from.",
		audiences: [
			"exploration companies",
			"mine operators",
			"ministries",
			"regulators"
		],
		caseStudy: "gold-prospectivity-kakamega",
		capabilities: [
			{
				name: "Prospectivity targeting",
				summary:
					"Ranks exploration targets from geochemistry, remote sensing, structure, terrain and lithology, with the limits of the ranking stated alongside it.",
				caseStudy: "gold-prospectivity-kakamega"
			},
			{
				name: "Operational site twin",
				summary:
					"A live, queryable 3D model of a mine site. Drone flights rebuild the surface, satellite radar tracks ground movement between them, and field crews feed observations in. Machine learning turns that stream into flagged changes, computed volumes and classified risks."
			}
		],
		graphic: "prospectivity",
		graphicAlt:
			"An abstract contour field tightening onto a high point, with a few marked locations near the centre.",
		status: "live"
	},

	{
		slug: "petroleum",
		name: "Kaistrum Petroleum",
		headline: "Put the subsurface evidence on the same map as everything else.",
		overview:
			"Seismic holdings are the primary evidence base for subsurface structure, and they sit in raw SEG-Y files that need specialist software to open. That keeps seismic insight away from the spatial picture that drives licensing and block management.",
		audiences: [
			"national oil companies",
			"regulators",
			"exploration and licensing teams"
		],
		capabilities: [
			{
				name: "Seismic to GIS conversion",
				summary:
					"Reads SEG-Y directly and produces GIS ready outputs that sit alongside block and licensing data, so teams work through maps and dashboards rather than specialist desktop software. This is a bridge, not a replacement for specialist seismic interpretation platforms."
			}
		],
		graphic: "seismic",
		graphicAlt:
			"Abstract layered subsurface bands crossed by vertical acquisition lines, with one horizon picked out.",
		status: "live"
	}
];

export const liveProducts = products.filter((p) => p.status === "live");

/* Every product gets a section. Drafts render a marked placeholder rather
   than copy, so the shape of the page is visible before the words exist. */
export const shownProducts = products;

export default products;
