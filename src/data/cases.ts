/* Shared case study data used by the home section, listing page, and individual pages */

export type CaseStudyData = {
	slug: string;
	tag: string;
	industry: string;
	client: string;
	location: string;
	year: string;
	title: string;
	summary: string;
	accent: string;
	results: string[];
	services: string[];
	challenge: {
		headline: string;
		body: string;
		points: string[];
	};
	solution: {
		headline: string;
		body: string;
		components: { title: string; description: string }[];
	};
	outcomes: {
		value: string;
		label: string;
		description: string;
	}[];
	testimonial?: {
		quote: string;
		name: string;
		title: string;
	};
	imagePlaceholders: { wide: string; narrow: string };
};

const cases: CaseStudyData[] = [
	{
		slug: "rapida-undp",
		tag: "Humanitarian · UNDP",
		industry: "Disaster Response",
		client: "United Nations Development Programme",
		location: "Global",
		year: "2024",
		title: "RAPIDA: Community Crisis Damage Assessment",
		summary:
			"For UNDP's RAPIDA early recovery methodology, Kaistrum engineered an end-to-end crowdsourced crisis-response platform — enabling communities to submit geolocated damage reports within 72 hours of a sudden-onset disaster, with AI-assisted translation across all six official UN languages and offline-first mobile functionality for low-connectivity environments.",
		accent: "#F59E0B",
		results: [
			"500,000+ report capacity per crisis",
			"All 6 UN languages via AI translation",
			"Offline-first mobile with GPS tagging",
			"Real-time GeoJSON & CSV export to UNDP"
		],
		services: ["Custom Development"],
		challenge: {
			headline: "72 hours to understand a disaster. No tool existed.",
			body: "UNDP's RAPIDA methodology required community-sourced damage data within 72 hours of a crisis event to guide early recovery resource allocation. No single tool existed that was simultaneously multilingual, offline-capable, scalable to 500,000+ reports per crisis, and exportable in UNDP's standard interoperable formats — and deployable across hundreds of crises per year without per-crisis configuration.",
			points: [
				"72-hour assessment window — but field survey tools required days to configure and deploy",
				"Communities span Arabic, Chinese, French, Russian, Spanish, and English — no single tool supported all six",
				"Low and zero connectivity environments in the most affected areas",
				"Existing tools broke at 50,000 submissions — UNDP needed 500,000+ per crisis, 100s of crises per year",
				"Outputs needed to be in GeoJSON, CSV, and shapefile formats for UNDP geospatial systems"
			]
		},
		solution: {
			headline: "End-to-end crowdsourced crisis assessment.",
			body: "Kaistrum built an open-source, end-to-end platform: a community-facing app accepting photo, GPS, and damage classification submissions via smartphone or WhatsApp; an AI-assisted translation and image classification pipeline; and a backend dashboard with live map and structured data export.",
			components: [
				{
					title: "Community submission app",
					description:
						"Web and WhatsApp-based submission flow accepting photos, GPS coordinates, damage classification, and infrastructure type — in all 6 UN languages with AI-assisted translation of free-text descriptions."
				},
				{
					title: "Building footprint map overlay",
					description:
						"Interactive map with building footprints from OpenStreetMap and UNDP datasets — allowing submitters to geolocate damage to specific structures without needing precise GPS."
				},
				{
					title: "AI image classification",
					description:
						"Computer vision pipeline classifying submitted photos as minimal, partial, or complete damage — reducing analyst review burden and enabling automated batch processing."
				},
				{
					title: "Scalable backend",
					description:
						"PostgreSQL/PostGIS backend with horizontal scaling — load-tested to 500,000 concurrent report submissions. Structured for reuse across hundreds of crisis deployments per year."
				},
				{
					title: "Analytics dashboard",
					description:
						"Live GIS dashboard displaying submissions with geolocation, damage level, and infrastructure type — with one-click export to GeoJSON, CSV, and shapefile."
				}
			]
		},
		outcomes: [
			{
				value: "500k+",
				label: "Report capacity per crisis",
				description:
					"Backend load-tested to 500,000 concurrent submissions — matching UNDP's large-scale crisis requirement."
			},
			{
				value: "6",
				label: "UN languages",
				description:
					"All six official UN languages supported via AI-assisted translation — no manual localisation required."
			},
			{
				value: "72hr",
				label: "Deployment readiness",
				description:
					"Platform can be activated for a new crisis in under 72 hours with no per-crisis configuration."
			},
			{
				value: "100%",
				label: "Offline capable",
				description:
					"Submissions cached locally and synced when connectivity returns — functional with zero internet."
			}
		],
		imagePlaceholders: {
			wide: "RAPIDA crisis damage map — geolocated community submissions",
			narrow: "Damage assessment mobile submission flow"
		}
	}
];

export default cases;
