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
    slug: "nairobi-digital-twin",
    tag: "Government · Kenya",
    industry: "Government & Defense",
    client: "Nairobi City County",
    location: "Nairobi, Kenya",
    year: "2023",
    title: "City of Nairobi Digital Twin",
    summary:
      "Nairobi's planning department deployed Kaistrum Enterprise to build a live 3D digital twin of the city's infrastructure — enabling real-time monitoring of traffic, utilities, and land-use compliance across 694 km².",
    accent: "#2DD4BF",
    results: [
      "40% faster development approval",
      "3D asset inventory of 280,000 parcels",
      "Integrated with city IoT sensors",
    ],
    services: ["Infrastructure Deployment", "Custom Development", "System Integration"],
    challenge: {
      headline: "A city of 4.5 million running on paper maps.",
      body: "Nairobi's planning department was operating from fragmented spatial data — paper-based land records, disconnected CAD drawings from different decades, and seven separate departmental GIS systems that could not share data. Development applications required manual cross-referencing across all of these, creating a process that took four to six months and frequently produced conflicting decisions.",
      points: [
        "280,000 parcels held in paper and CAD — no single authoritative digital record",
        "Seven siloed GIS systems across planning, utilities, roads, and public safety",
        "Development permit process averaging 18 weeks with frequent inter-department conflicts",
        "No integration with city IoT sensors — traffic, air quality, and flood data sat in isolation",
      ],
    },
    solution: {
      headline: "A live 3D digital twin connecting the whole city.",
      body: "Kaistrum deployed a city-scale GIS platform integrating all 694 km² of urban data into a single authoritative 3D digital twin. All departmental systems were connected through a federated data architecture, and city IoT sensors were integrated to provide real-time monitoring.",
      components: [
        {
          title: "3D city model",
          description:
            "All 280,000 parcels georeferenced and modelled in 3D — integrating building footprints, height data, land registry records, and zoning layers.",
        },
        {
          title: "Federated GIS platform",
          description:
            "A single Kaistrum Enterprise deployment connecting planning, utilities, roads, and public safety on shared authoritative datasets with department-level access control.",
        },
        {
          title: "Permit workflow integration",
          description:
            "Digital permit workflow conducting automatic spatial checks — zoning compliance, setback requirements, utility conflict detection — at submission rather than review stage.",
        },
        {
          title: "IoT sensor integration",
          description:
            "Live feeds from 340 traffic sensors, 12 air quality monitors, and 8 flood gauges integrated into the city GIS operational dashboard.",
        },
      ],
    },
    outcomes: [
      {
        value: "40%",
        label: "Faster permit approval",
        description: "Average development application time reduced from 18 weeks to under 11 weeks.",
      },
      {
        value: "280k",
        label: "Parcels in 3D inventory",
        description: "Complete 3D spatial record of all city parcels, replacing fragmented paper and CAD records.",
      },
      {
        value: "340",
        label: "IoT sensors integrated",
        description: "Live traffic, air quality, and flood sensor data feeding the operational city GIS.",
      },
      {
        value: "7→1",
        label: "GIS systems consolidated",
        description: "Seven separate departmental GIS systems replaced with a single federated platform.",
      },
    ],
    testimonial: {
      quote:
        "For the first time, the planning, utilities, and roads departments are all looking at the same map. The number of permit conflicts we used to spend months resolving has dropped dramatically.",
      name: "Dr. Asha Wangari",
      title: "Director of Urban Planning, Nairobi County Government",
    },
    imagePlaceholders: {
      wide: "Nairobi 3D digital twin — city planning view",
      narrow: "Permit workflow GIS dashboard",
    },
  },
  {
    slug: "kengen-pipeline",
    tag: "Utilities · East Africa",
    industry: "Utilities & Infrastructure",
    client: "Kenya Electricity Generating Company",
    location: "Kenya",
    year: "2022",
    title: "KenGen Pipeline Network Management",
    summary:
      "Kenya Electricity Generating Company used Kaistrum Pro to digitise and manage 6,800 km of transmission pipeline — replacing paper maps with authoritative GIS that integrates with SAP asset management.",
    accent: "#818CF8",
    results: [
      "100% pipeline digitisation",
      "60% reduction in fault response time",
      "Live crew dispatch from GIS",
    ],
    services: ["Data Migration", "System Integration", "Custom Development"],
    challenge: {
      headline: "6,800 km of infrastructure managed from paper.",
      body: "KenGen managed its entire transmission infrastructure — 6,800 km of pipeline across varied terrain — from a combination of paper maps, hand-annotated engineering drawings, and spreadsheets. Fault response required crews to physically locate assets before beginning work, and the absence of any network topology model made planning maintenance windows nearly impossible without risking cascading outages.",
      points: [
        "No digital record of the network — paper maps were the only spatial reference",
        "Fault response averaging 8 hours due to manual asset location process",
        "No integration between GIS (such as it was) and SAP Plant Maintenance",
        "Maintenance planning done without network topology — outage scoping was guesswork",
      ],
    },
    solution: {
      headline: "Authoritative digital network with SAP at its core.",
      body: "Kaistrum digitised the entire 6,800 km network and built a bidirectional SAP Plant Maintenance integration — so fault notifications flow automatically from the field GIS into SAP, and SAP work orders appear as spatial jobs on the GIS dispatch map.",
      components: [
        {
          title: "Full network digitisation",
          description:
            "All 6,800 km of transmission infrastructure digitised from paper drawings, with attribute data attached — pipe diameter, material, installation year, pressure rating, and valve locations.",
        },
        {
          title: "Network topology model",
          description:
            "A full geometric network model enabling flow analysis, outage impact scoping, and isolation valve identification — built once, maintained in GIS.",
        },
        {
          title: "SAP PM integration",
          description:
            "Bidirectional integration with SAP Plant Maintenance — GIS field reports create PM notifications automatically, and PM work orders appear as spatially located jobs.",
        },
        {
          title: "GIS crew dispatch",
          description:
            "Live dispatch application routing field crews to faults using GIS network analysis, with access to the nearest isolation valves and asset history on their mobile device.",
        },
      ],
    },
    outcomes: [
      {
        value: "100%",
        label: "Network digitised",
        description: "All 6,800 km of transmission infrastructure now in a single authoritative GIS.",
      },
      {
        value: "60%",
        label: "Faster fault response",
        description: "Average fault response time reduced from 8 hours to under 3.5 hours.",
      },
      {
        value: "Real-time",
        label: "SAP–GIS integration",
        description: "Fault notifications and work orders flow automatically between GIS and SAP PM.",
      },
      {
        value: "Zero",
        label: "Unplanned cascades",
        description: "Outage scoping accuracy improved — no unplanned cascading outages since go-live.",
      },
    ],
    testimonial: {
      quote:
        "Kaistrum's field inspection app transformed how our crews work. Inspectors now capture fault reports with GPS coordinates and photos in the field — and they sync to our control room in real time.",
      name: "James Ochieng",
      title: "GIS Manager, Kenya Pipeline Company",
    },
    imagePlaceholders: {
      wide: "KenGen transmission network GIS — full extent",
      narrow: "SAP–GIS integration fault dispatch",
    },
  },
  {
    slug: "smallholder-crop-monitoring",
    tag: "Agriculture · Tanzania",
    industry: "Agriculture",
    client: "Tanzania Ministry of Agriculture",
    location: "Tanzania",
    year: "2023",
    title: "Smallholder Crop Monitoring Programme",
    summary:
      "The Tanzania Agriculture Ministry used Kaistrum Mobile and Remote Sensing to monitor crop health across 2.1 million hectares — delivering early drought alerts to 350,000 smallholder farmers via SMS.",
    accent: "#34D399",
    results: [
      "2.1M hectares monitored",
      "350,000 farmers reached",
      "Sentinel-2 change detection every 5 days",
    ],
    services: ["Custom Development", "Infrastructure Deployment"],
    challenge: {
      headline: "2.1 million hectares. No way to watch them.",
      body: "Tanzania's Ministry of Agriculture needed to monitor crop health across 2.1 million hectares of smallholder farmland to provide timely drought and flood alerts — but had neither the field personnel nor the budget for ground-based monitoring at that scale. Drought alerts were historically issued too late for farmers to take preventive action, and yield forecasts used for national food security planning were based on data that was months old.",
      points: [
        "2.1 million hectares of monitored farmland — impossible to survey manually at useful frequency",
        "Drought alerts issued 4–6 weeks after stress onset — too late for irrigation or replanting decisions",
        "Yield forecasts based on survey data that was 3–6 months old at point of use",
        "350,000 target smallholders mostly on feature phones with no smartphone or internet access",
      ],
    },
    solution: {
      headline: "Satellite monitoring at 5-day intervals, alerts by SMS.",
      body: "Kaistrum deployed a satellite remote sensing platform processing Sentinel-2 imagery at 5-day intervals across all 2.1 million hectares, with automated NDVI-based stress detection and an SMS alert system that worked on any phone.",
      components: [
        {
          title: "Sentinel-2 processing pipeline",
          description:
            "Automated processing of Sentinel-2 Level 2A imagery at 10m resolution — atmospherically corrected, cloud-masked, and composited every 5 days.",
        },
        {
          title: "NDVI stress detection",
          description:
            "Field-level NDVI and EVI analysis comparing current values against 3-year historical baselines — flagging anomalies that indicate drought stress, waterlogging, or pest pressure.",
        },
        {
          title: "SMS alert delivery",
          description:
            "Automated SMS alert system delivering crop stress warnings to 350,000 registered smallholders in Kiswahili, with a simple code for the type and severity of alert.",
        },
        {
          title: "Ministry analytics dashboard",
          description:
            "Web GIS dashboard for Ministry agronomists showing current crop condition by district, yield forecast trends, and alert dispatch logs.",
        },
      ],
    },
    outcomes: [
      {
        value: "2.1M",
        label: "Hectares monitored",
        description: "Full coverage of all smallholder farmland in the monitored districts — updated every 5 days.",
      },
      {
        value: "350k",
        label: "Farmers reached",
        description: "Registered smallholders receiving early warning SMS alerts via any mobile phone.",
      },
      {
        value: "5-day",
        label: "Alert cadence",
        description: "Sentinel-2 analysis and stress detection updated every 5 days — versus previously monthly.",
      },
      {
        value: "3–4 weeks",
        label: "Earlier alerts",
        description: "Drought stress detected 3–4 weeks earlier than previous ground-survey methodology.",
      },
    ],
    imagePlaceholders: {
      wide: "Sentinel-2 NDVI crop health map — Tanzania",
      narrow: "Ministry analytics dashboard",
    },
  },
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
      "Real-time GeoJSON & CSV export to UNDP",
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
        "Outputs needed to be in GeoJSON, CSV, and shapefile formats for UNDP geospatial systems",
      ],
    },
    solution: {
      headline: "End-to-end crowdsourced crisis assessment.",
      body: "Kaistrum built an open-source, end-to-end platform: a community-facing app accepting photo, GPS, and damage classification submissions via smartphone or WhatsApp; an AI-assisted translation and image classification pipeline; and a backend dashboard with live map and structured data export.",
      components: [
        {
          title: "Community submission app",
          description:
            "Web and WhatsApp-based submission flow accepting photos, GPS coordinates, damage classification, and infrastructure type — in all 6 UN languages with AI-assisted translation of free-text descriptions.",
        },
        {
          title: "Building footprint map overlay",
          description:
            "Interactive map with building footprints from OpenStreetMap and UNDP datasets — allowing submitters to geolocate damage to specific structures without needing precise GPS.",
        },
        {
          title: "AI image classification",
          description:
            "Computer vision pipeline classifying submitted photos as minimal, partial, or complete damage — reducing analyst review burden and enabling automated batch processing.",
        },
        {
          title: "Scalable backend",
          description:
            "PostgreSQL/PostGIS backend with horizontal scaling — load-tested to 500,000 concurrent report submissions. Structured for reuse across hundreds of crisis deployments per year.",
        },
        {
          title: "Analytics dashboard",
          description:
            "Live GIS dashboard displaying submissions with geolocation, damage level, and infrastructure type — with one-click export to GeoJSON, CSV, and shapefile.",
        },
      ],
    },
    outcomes: [
      {
        value: "500k+",
        label: "Report capacity per crisis",
        description: "Backend load-tested to 500,000 concurrent submissions — matching UNDP's large-scale crisis requirement.",
      },
      {
        value: "6",
        label: "UN languages",
        description: "All six official UN languages supported via AI-assisted translation — no manual localisation required.",
      },
      {
        value: "72hr",
        label: "Deployment readiness",
        description: "Platform can be activated for a new crisis in under 72 hours with no per-crisis configuration.",
      },
      {
        value: "100%",
        label: "Offline capable",
        description: "Submissions cached locally and synced when connectivity returns — functional with zero internet.",
      },
    ],
    imagePlaceholders: {
      wide: "RAPIDA crisis damage map — geolocated community submissions",
      narrow: "Damage assessment mobile submission flow",
    },
  },
];

export default cases;
