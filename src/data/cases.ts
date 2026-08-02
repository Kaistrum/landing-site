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
	videoEmbed?: string;
	narrowVideo?: string;
	thumbnail?: string;
};

const cases: CaseStudyData[] = [
	{
		slug: "faraja",
		tag: "Humanitarian · Crisis Response Tech",
		industry: "Disaster Response",
		client: "Independent build, inspired by UNDP's RAPIDA methodology",
		location: "Global",
		year: "2026",
		title: "Faraja: Crowdsourced Crisis Damage Assessment",
		summary:
			"UNDP's RAPIDA methodology delivers early recovery insight from satellite imagery, night-light data, and social media — but ground-level, structured field data still takes days to arrive. Kaistrum built Faraja to close that gap: an open-source, end-to-end platform that lets communities submit geolocated, AI-triaged damage reports over a mobile app or WhatsApp within 72 hours of a sudden-onset disaster, in all six official UN languages, fully offline-capable.",
		accent: "#F59E0B",
		results: [
			"90.2% AI damage-severity accuracy (MEDIC-trained)",
			"500,000+ report capacity per crisis",
			"All 6 UN languages, including RTL Arabic",
			"Mobile PWA + WhatsApp — zero app install"
		],
		services: ["Custom Development"],
		challenge: {
			headline: "Satellites see the damage. They can't see the ground.",
			body: "RAPIDA fuses satellite imagery, night-light data, and social signals into a 72-hour early recovery picture — but that picture is built from orbit, and structured, ground-level confirmation remains days away due to logistical constraints. Humanitarian teams needed a way to pull community-sourced, geolocated field reports into that same 72-hour window, at a scale and reliability no existing tool offered.",
			points: [
				"72-hour assessment window — but field survey tools took days to configure and deploy",
				"Communities span Arabic, Chinese, French, Russian, Spanish, and English — no single tool supported all six",
				"Most-affected areas are also the least connected — low and zero connectivity by default",
				"Existing tools broke well before 50,000 submissions — Faraja needed to hold 500,000+ per crisis, across hundreds of crises a year",
				"Photo evidence arrived faster than any team could manually review it"
			]
		},
		solution: {
			headline: "An open-source ground-truth layer for RAPIDA.",
			body: "Kaistrum built Faraja as a fully open-source, seven-service platform: a mobile-first PWA and an automated WhatsApp bot for zero-barrier community intake; a Redis-backed queue that triages every photo through a purpose-trained AI model; three-tier geospatial deduplication with building-level versioning; and a live coordinator dashboard with responder dispatch — producing structured, RAPIDA-ready data within seconds of submission.",
			components: [
				{
					title: "Reporters app + WhatsApp bot",
					description:
						"A guided, multi-step survey delivered as a mobile PWA carousel, mirrored step-for-step by a WhatsApp bot with native location and photo sharing — no app install required, fully localised into all 6 UN languages with RTL Arabic support."
				},
				{
					title: "AI damage triage",
					description:
						"A multi-task ResNet18 model, fine-tuned on 71,198 real disaster images from the MEDIC benchmark, classifies every submitted photo for disaster type, informativeness, humanitarian category, and damage severity — 90.2% accuracy, 20–30ms per image."
				},
				{
					title: "Three-tier deduplication & versioning",
					description:
						"Cascading dedup — exact client-ID match, photo+coordinate proximity within 60 seconds, and 50-metre spatial matching within a 48-hour window — paired with building-level versioning so coordinators always see the latest report without losing submission history."
				},
				{
					title: "Burst-resilient queue",
					description:
						"A BullMQ + Redis queue with append-only-file persistence absorbs submission bursts and processes reports across concurrent workers, retrying failed jobs automatically — no data lost, even through a service restart."
				},
				{
					title: "Coordinator dashboard & dispatch",
					description:
						"A live, clustered incident map with AI-weighted zone scoring, a conversational assistant for situation summaries, and Haversine-ranked responder dispatch with optimised multi-stop routing to the field."
				},
				{
					title: "RAPIDA-ready export",
					description:
						"PostGIS-backed spatial storage with GIST indexing, exportable on demand as GeoJSON, CSV, Shapefile, or via REST API — structured to feed directly into RAPIDA's geospatial workflows."
				}
			]
		},
		outcomes: [
			{
				value: "90.2%",
				label: "AI damage-severity accuracy",
				description:
					"Fine-tuned ResNet18 on the MEDIC benchmark (71,198 real disaster images), with 94% recall on severe damage."
			},
			{
				value: "500k+",
				label: "Report capacity per crisis",
				description:
					"Architecture scales from a single VPS to a 4+ replica, read-replica deployment for national-scale crises."
			},
			{
				value: "6",
				label: "UN languages",
				description:
					"All six official UN languages, including full RTL Arabic support, across both the web app and WhatsApp bot."
			},
			{
				value: "100%",
				label: "Offline capable",
				description:
					"Reports and photos queue on-device and sync automatically the moment connectivity returns."
			}
		],
		imagePlaceholders: {
			wide: "Faraja coordinator dashboard — live clustered damage map",
			narrow: "Faraja reporters app — mobile damage submission flow"
		},
		videoEmbed:
			'<iframe width="560" height="315" src="https://www.youtube.com/embed/wYn9VTzgZno?si=Uv2-ccMSBZcrUviW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
		narrowVideo: "/REC_REPORTERS.mp4",
		thumbnail: "/faraja-logo.png"
	}
];

export default cases;
