import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ── Data types ── */
type IndustryData = {
  slug: string;
  index: number;
  name: string;
  headline: string;
  description: string;
  stats: { value: string; label: string }[];
  challenges: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  useCases: { title: string; description: string }[];
  imagePlaceholders: { wide: string; narrow: string };
};

/* ── All industry content ── */
const industries: IndustryData[] = [
  {
    slug: "government-defense",
    index: 1,
    name: "Government & Defense",
    headline: "Geospatial intelligence for the organisations that run the world.",
    description:
      "From national cadastres to defence situational awareness, governments operate on location data. Kaistrum delivers the GIS platforms and security posture that public-sector operations require.",
    stats: [
      { value: "180+", label: "government deployments" },
      { value: "100%", label: "data sovereignty options" },
      { value: "Air-gap", label: "capable deployment" },
    ],
    challenges: [
      {
        title: "Data sovereignty & security",
        description:
          "Sensitive national datasets cannot leave controlled infrastructure. Commercial cloud-first GIS vendors often cannot meet this requirement.",
      },
      {
        title: "Legacy system interoperability",
        description:
          "Decades of paper maps, CAD drawings, and siloed databases make it difficult to build a single authoritative spatial picture.",
      },
      {
        title: "Multi-agency coordination",
        description:
          "Defence, police, planning, and utility agencies each hold spatial data that the others need — but in incompatible systems and formats.",
      },
      {
        title: "Mobile field access",
        description:
          "Field personnel need GIS access in remote or denied environments where connectivity cannot be guaranteed.",
      },
    ],
    solutions: [
      {
        title: "Secure on-premise & air-gapped deployment",
        description:
          "We deploy fully on your infrastructure — data centre, air-gapped network, or private cloud — with no external data dependencies.",
      },
      {
        title: "Legacy migration & schema harmonisation",
        description:
          "We migrate paper maps, CAD, and legacy GIS to a single authoritative geodatabase with full quality assurance.",
      },
      {
        title: "Federated multi-agency geoportal",
        description:
          "A centralised GIS platform where multiple agencies can publish, discover, and consume spatial data under role-based access control.",
      },
      {
        title: "Offline-capable field GIS",
        description:
          "Mobile apps that cache map data, collect field records, and sync when connectivity is restored — no signal required.",
      },
    ],
    useCases: [
      {
        title: "National infrastructure asset register",
        description:
          "A unified spatial record of roads, bridges, government buildings, utilities, and critical infrastructure — the authoritative source for planning and emergency response.",
      },
      {
        title: "Emergency operations centre mapping",
        description:
          "Real-time incident command display integrating unit positions, sensor feeds, and incident records on a live operational map.",
      },
      {
        title: "Land administration & cadastre",
        description:
          "Authoritative land parcel records with spatial precision, integrated into permit and title workflows for transparent land governance.",
      },
      {
        title: "Border monitoring & surveillance",
        description:
          "GIS-integrated sensor, camera, and patrol data providing continuous situational awareness along border corridors.",
      },
      {
        title: "Urban planning & development control",
        description:
          "Spatial permit workflows — from application submission to compliance inspection — with zoning layer analysis at every stage.",
      },
    ],
    imagePlaceholders: {
      wide: "National GIS operations centre",
      narrow: "Field command mapping tablet",
    },
  },
  {
    slug: "utilities-infrastructure",
    index: 2,
    name: "Utilities & Infrastructure",
    headline: "The network that powers everything needs a map that keeps up.",
    description:
      "Power grids, water networks, and gas pipelines are invisible to the people who depend on them — until something fails. Kaistrum makes them visible, manageable, and resilient.",
    stats: [
      { value: "6,800km+", label: "networks managed" },
      { value: "60%", label: "avg fault response improvement" },
      { value: "100%", label: "digitisation achieved" },
    ],
    challenges: [
      {
        title: "Aging infrastructure visibility",
        description:
          "Paper maps and disconnected spreadsheets don't reflect 40 years of network changes — crews find surprises in the field that GIS should have predicted.",
      },
      {
        title: "Outage response speed",
        description:
          "Every minute of an outage costs money and damages trust. Without GIS, field crews waste time locating assets and planning routes.",
      },
      {
        title: "Regulatory compliance reporting",
        description:
          "Manual condition assessments and asset registers fail to meet regulator expectations for completeness, accuracy, and currency.",
      },
      {
        title: "Workforce coordination",
        description:
          "Multiple crews working on the same network without visibility of each other creates safety risks and duplicated effort.",
      },
    ],
    solutions: [
      {
        title: "Authoritative network GIS",
        description:
          "A single spatial record of your entire network — every asset, every attribute, every relationship — replacing paper and spreadsheet records.",
      },
      {
        title: "Real-time crew dispatch",
        description:
          "GIS-driven field dispatch that routes crews to faults with awareness of network topology, asset access, and traffic.",
      },
      {
        title: "Mobile inspection apps",
        description:
          "Field apps that capture condition scores, photos, and GPS locations — syncing to the authoritative GIS in real time.",
      },
      {
        title: "Automated compliance reporting",
        description:
          "Regulator-ready asset condition reports generated automatically from GIS attribute data — no manual collation.",
      },
    ],
    useCases: [
      {
        title: "Transmission & distribution network mapping",
        description:
          "Single authoritative spatial record of all network assets — poles, cables, transformers, valves, and meters — with maintenance history and condition ratings.",
      },
      {
        title: "Outage management & response routing",
        description:
          "GIS-driven fault location, affected customer analysis, and crew routing — reducing outage duration and customer impact.",
      },
      {
        title: "Asset condition surveys",
        description:
          "Structured mobile inspection workflows with condition scoring, defect photography, and automatic work order generation.",
      },
      {
        title: "Capital works prioritisation",
        description:
          "Multi-criteria spatial analysis scoring assets by age, condition, criticality, and failure risk to guide infrastructure renewal investment.",
      },
      {
        title: "Regulatory asset reporting",
        description:
          "Automated condition and inventory reports for regulatory submission — generated from GIS data with complete audit trails.",
      },
    ],
    imagePlaceholders: {
      wide: "Power grid network GIS dashboard",
      narrow: "Field inspection mobile app",
    },
  },
  {
    slug: "telecoms-broadband",
    index: 3,
    name: "Telecoms & Broadband",
    headline: "Every tower, cable, and coverage gap — mapped with precision.",
    description:
      "Telecoms networks are spatial problems at their core. Coverage depends on terrain. Sites depend on proximity. Rollout depends on logistics. GIS is the connective tissue.",
    stats: [
      { value: "1m", label: "RF analysis resolution" },
      { value: "40%", label: "faster site acquisition" },
      { value: "Full", label: "passive network inventory" },
    ],
    challenges: [
      {
        title: "Coverage gap identification",
        description:
          "RF propagation modelling requires accurate terrain, building height, and clutter data — and most operators don't have it in a usable form.",
      },
      {
        title: "Site acquisition bottlenecks",
        description:
          "Identifying, qualifying, and acquiring candidate tower sites is slow when teams work from separate planning tools and spreadsheets.",
      },
      {
        title: "Passive infrastructure inventory",
        description:
          "Thousands of ducts, cables, towers, and cabinets exist without spatial records — making network planning and fault tracing inefficient.",
      },
      {
        title: "Rollout coordination",
        description:
          "Construction crews and planners working from different data sources create version conflicts that delay rollout and inflate costs.",
      },
    ],
    solutions: [
      {
        title: "High-resolution RF propagation modelling",
        description:
          "Terrain-aware signal propagation models at 1m resolution, integrating building height data and real-world clutter classification.",
      },
      {
        title: "GIS-driven site suitability scoring",
        description:
          "Automated candidate site analysis scoring locations on coverage impact, access, planning consent likelihood, and landlord proximity.",
      },
      {
        title: "Passive infrastructure digitisation",
        description:
          "End-to-end digitisation of your duct, cable, tower, and cabinet network — from paper records to authoritative spatial database.",
      },
      {
        title: "Centralised rollout tracking",
        description:
          "Live spatial dashboard showing premises passed versus target, by region and timeframe — with drill-down to individual site status.",
      },
    ],
    useCases: [
      {
        title: "Coverage planning & RF modelling",
        description:
          "Terrain-aware propagation models for 4G and 5G network design — identifying coverage gaps, interference, and optimum site locations.",
      },
      {
        title: "Site acquisition & suitability analysis",
        description:
          "GIS-driven candidate site scoring and comparative analysis to accelerate the acquisition process from months to weeks.",
      },
      {
        title: "Passive network inventory",
        description:
          "Spatial record of every duct, cable, fibre route, tower, cabinet, and manhole — the foundation for planning, fault tracing, and asset sales.",
      },
      {
        title: "Broadband rollout tracking",
        description:
          "Real-time dashboard showing premises passed versus rollout target, broken down by area and team.",
      },
      {
        title: "Interference analysis",
        description:
          "Spatial modelling of inter-site interference patterns and shadow zones to optimise antenna configuration across the network.",
      },
    ],
    imagePlaceholders: {
      wide: "Telecoms coverage & network GIS map",
      narrow: "RF propagation model overlay",
    },
  },
  {
    slug: "transportation-logistics",
    index: 4,
    name: "Transportation & Logistics",
    headline: "Networks that move the world need spatial intelligence to run efficiently.",
    description:
      "Roads, rail, ports, and logistics corridors are fundamentally spatial assets. Kaistrum gives transport operators the GIS to plan, monitor, and maintain them at scale.",
    stats: [
      { value: "National", label: "network analysis" },
      { value: "30%", label: "avg cost reduction in routing" },
      { value: "Sub-cm", label: "pavement survey precision" },
    ],
    challenges: [
      {
        title: "Network condition visibility",
        description:
          "No single authoritative record of road or rail condition exists — maintenance is reactive and expensive because problems are found too late.",
      },
      {
        title: "Route optimisation at scale",
        description:
          "Thousands of daily vehicle movements without spatial optimisation result in empty backhauls, missed time windows, and fuel waste.",
      },
      {
        title: "Infrastructure inspection efficiency",
        description:
          "Manual survey processes with paper records produce data that is already out of date by the time it reaches the planning team.",
      },
      {
        title: "Intermodal data fragmentation",
        description:
          "Road, rail, and port data held in separate, incompatible systems makes multimodal corridor planning nearly impossible.",
      },
    ],
    solutions: [
      {
        title: "Authoritative transport network GIS",
        description:
          "A unified spatial record of road and rail assets — with condition attributes, maintenance history, and traffic data — updated continuously from field surveys.",
      },
      {
        title: "GIS network analysis & routing",
        description:
          "Spatial route optimisation integrating network restrictions, hazmat routes, vehicle dimensions, and real-time traffic.",
      },
      {
        title: "Mobile infrastructure inspection",
        description:
          "Structured field survey apps with condition scoring, defect photography, and GPS tagging — replacing paper with live data.",
      },
      {
        title: "Multimodal corridor integration",
        description:
          "A single GIS integrating road, rail, and port data to support corridor-level planning and investment prioritisation.",
      },
    ],
    useCases: [
      {
        title: "Road network management",
        description:
          "Authoritative spatial record with pavement condition indices, maintenance history, and renewal prioritisation for every road segment.",
      },
      {
        title: "Fleet route optimisation",
        description:
          "GIS network analysis for fleet routing across road and rail — reducing distance driven, fuel consumed, and time windows missed.",
      },
      {
        title: "Bridge & tunnel inspection",
        description:
          "Mobile structural inspection apps with condition scoring, photo documentation, and automatic defect classification.",
      },
      {
        title: "Freight corridor planning",
        description:
          "Multi-criteria spatial analysis evaluating terrain, connectivity, land use, and capacity for new freight route selection.",
      },
      {
        title: "Road safety & accident analysis",
        description:
          "Spatial clustering of collision records to identify high-risk locations, correlate with infrastructure factors, and prioritise interventions.",
      },
    ],
    imagePlaceholders: {
      wide: "National transport network GIS",
      narrow: "Route optimisation dashboard",
    },
  },
  {
    slug: "mining-natural-resources",
    index: 5,
    name: "Mining & Natural Resources",
    headline: "Precision mapping for industries that operate where maps run out.",
    description:
      "Mine sites, exploration licences, and resource corridors push GIS to its limits — remote terrain, strict compliance, and safety imperatives that leave no margin for spatial error.",
    stats: [
      { value: "Sub-metre", label: "geological survey precision" },
      { value: "Real-time", label: "safety zone enforcement" },
      { value: "100%", label: "compliance audit trail" },
    ],
    challenges: [
      {
        title: "Remote operations & connectivity",
        description:
          "Mine sites in remote terrain have limited connectivity — GIS tools that require internet access simply don't work where the work happens.",
      },
      {
        title: "Exploration accuracy",
        description:
          "Geological mapping in complex terrain requires precise spatial data that goes beyond what general-purpose GIS can handle out of the box.",
      },
      {
        title: "Environmental compliance",
        description:
          "Licence conditions require continuous spatial tracking of environmental impacts across large, complex land areas — manually impossible to manage.",
      },
      {
        title: "Safety zone enforcement",
        description:
          "Blast exclusion zones and hazardous area boundaries must be enforced in real time — a paper-based process cannot match this requirement.",
      },
    ],
    solutions: [
      {
        title: "Offline-first mine site GIS",
        description:
          "Fully functional GIS deployed on-site with no internet dependency — syncing to corporate systems during connectivity windows.",
      },
      {
        title: "High-precision geological mapping",
        description:
          "3D subsurface models integrated with surface GIS — incorporating drill-hole data, geophysical surveys, and topographic models.",
      },
      {
        title: "Environmental monitoring dashboards",
        description:
          "Satellite-derived change detection for vegetation, water bodies, and land disturbance — with compliance boundary overlays and automated alerting.",
      },
      {
        title: "Real-time safety zone management",
        description:
          "Dynamic exclusion zones that update with blast schedules and push proximity alerts to field personnel devices.",
      },
    ],
    useCases: [
      {
        title: "Geological mapping & prospect evaluation",
        description:
          "3D subsurface geological models integrating drill-hole logs, geophysical data, and outcrop mapping for prospect targeting.",
      },
      {
        title: "Environmental impact monitoring",
        description:
          "Satellite-derived vegetation, water quality, and land disturbance change detection with licence boundary compliance overlays.",
      },
      {
        title: "Mine site infrastructure management",
        description:
          "Spatial asset register for roads, equipment laydown areas, processing plants, tailings facilities, and accommodation — updated from field surveys.",
      },
      {
        title: "Blast exclusion zone enforcement",
        description:
          "Dynamic GIS-defined blast exclusion zones with real-time personnel and equipment proximity alerting via mobile devices.",
      },
      {
        title: "Rehabilitation & closure planning",
        description:
          "Progressive rehabilitation tracking against licence commitments — satellite-derived cover estimates validated against field surveys.",
      },
    ],
    imagePlaceholders: {
      wide: "Mine site GIS with geological overlays",
      narrow: "Environmental compliance monitoring",
    },
  },
  {
    slug: "agriculture",
    index: 6,
    name: "Agriculture",
    headline: "From satellite to smallholder — precision at every scale.",
    description:
      "Agriculture operates at scales that defy manual monitoring — millions of hectares, millions of farmers, seasons that wait for no one. Kaistrum brings GIS and remote sensing to bear on food security.",
    stats: [
      { value: "2.1M+", label: "hectares monitored" },
      { value: "5-day", label: "Sentinel-2 analysis cadence" },
      { value: "350k+", label: "farmers reached" },
    ],
    challenges: [
      {
        title: "Crop monitoring at scale",
        description:
          "Field-level crop health across millions of hectares is impossible to survey manually with any frequency — problems are found too late to intervene.",
      },
      {
        title: "Irrigation inefficiency",
        description:
          "Uniform water application across variable soils and crop conditions wastes 20–40% of irrigation water while under-serving stressed zones.",
      },
      {
        title: "Yield prediction uncertainty",
        description:
          "Planning without reliable spatial yield forecasts creates market uncertainty, logistics failures, and input waste.",
      },
      {
        title: "Rural connectivity barriers",
        description:
          "Farmers and extension workers in remote areas can't access complex GIS tools — the last-mile data problem undermines every other investment.",
      },
    ],
    solutions: [
      {
        title: "Satellite crop health monitoring",
        description:
          "Multi-temporal NDVI and EVI analysis from Sentinel-2 and Landsat — delivered as field-level alerts every five days.",
      },
      {
        title: "Variable rate irrigation prescription",
        description:
          "GIS-generated irrigation prescription maps combining soil type, crop health index, and weather data to drive variable-rate application.",
      },
      {
        title: "Spatial yield prediction models",
        description:
          "Statistical models integrating historical yield, soil, weather, and remote sensing data to produce field-level yield forecasts.",
      },
      {
        title: "Low-bandwidth farmer interfaces",
        description:
          "SMS-based early warning systems and simplified mobile apps that work on feature phones and 2G connections.",
      },
    ],
    useCases: [
      {
        title: "Crop health monitoring",
        description:
          "NDVI and EVI analysis from Sentinel-2 imagery — identifying stress zones, water deficits, and pest pressure at field level every five days.",
      },
      {
        title: "Irrigation planning",
        description:
          "Variable rate irrigation prescription maps generated from soil type, topography, crop health, and weather forecast integration.",
      },
      {
        title: "Yield prediction",
        description:
          "Spatial regression models combining historical yield data, soil profiles, crop health indices, and seasonal weather to forecast yield at field level.",
      },
      {
        title: "Land use change analysis",
        description:
          "Multi-temporal mapping to detect cropping pattern shifts, deforestation for agriculture, and informal settlement encroachment on arable land.",
      },
      {
        title: "Smallholder early warning",
        description:
          "SMS-based drought and flood risk alerts derived from GIS analysis — delivered to smallholder farmers with no smartphone or internet access.",
      },
    ],
    imagePlaceholders: {
      wide: "Crop health monitoring — NDVI satellite imagery",
      narrow: "Field-level irrigation prescription map",
    },
  },
  {
    slug: "ngos-nonprofits",
    index: 7,
    name: "NGOs & Non-profits",
    headline: "When the stakes are humanitarian, there is no tolerance for a map that lies.",
    description:
      "NGOs operate in the most demanding GIS environments on earth — low connectivity, multi-language teams, tight resources, and decisions that affect lives. Kaistrum builds tools that work where it counts.",
    stats: [
      { value: "72hr", label: "rapid deployment capability" },
      { value: "Offline", label: "first field tools" },
      { value: "6", label: "UN languages supported" },
    ],
    challenges: [
      {
        title: "Resource constraints",
        description:
          "NGOs rarely have dedicated GIS staff — tools must be simple enough for field workers with minimal training to collect reliable spatial data.",
      },
      {
        title: "Crisis deployment speed",
        description:
          "Needs assessment must begin within 72 hours of a crisis event. Weeks-long GIS setup cycles are not compatible with humanitarian timelines.",
      },
      {
        title: "Low connectivity environments",
        description:
          "Field teams operate in environments where internet connectivity is unreliable or entirely absent — GIS tools must work offline.",
      },
      {
        title: "Multi-language operations",
        description:
          "Teams and affected communities span many languages — data collection interfaces and outputs must be localised without long translation cycles.",
      },
    ],
    solutions: [
      {
        title: "Simple, deployable field collection",
        description:
          "Field data collection tools configurable without GIS expertise — survey forms, GPS capture, and photo documentation in a single app.",
      },
      {
        title: "Rapid deployment frameworks",
        description:
          "Pre-configured assessment templates and basemap packages that can be deployed within hours of a crisis event.",
      },
      {
        title: "Offline-first mobile apps",
        description:
          "Fully functional in zero-connectivity environments — data is stored locally and synchronised when connectivity is restored.",
      },
      {
        title: "AI-assisted translation",
        description:
          "Multilingual data collection interfaces with AI-assisted translation of free-text descriptions for standardised analysis.",
      },
    ],
    useCases: [
      {
        title: "Community needs assessment",
        description:
          "Structured field surveys capturing household-level needs with GPS location, photo evidence, and structured classification — syncing to a central dashboard.",
      },
      {
        title: "Crisis damage mapping",
        description:
          "Rapid building damage classification using community-submitted photos and GPS locations, validated against satellite imagery.",
      },
      {
        title: "Aid distribution planning",
        description:
          "GIS-optimised distribution routes and point-of-distribution siting based on population concentration and accessibility analysis.",
      },
      {
        title: "Population movement tracking",
        description:
          "Spatial analysis of displacement patterns from field registration data — showing origin, destination, and movement corridors.",
      },
      {
        title: "Programme impact mapping",
        description:
          "Before-and-after spatial analysis quantifying the geographic reach and coverage of programme interventions.",
      },
    ],
    imagePlaceholders: {
      wide: "Humanitarian field data collection — community mapping",
      narrow: "Crisis damage assessment dashboard",
    },
  },
  {
    slug: "smart-cities",
    index: 8,
    name: "Smart Cities",
    headline: "A city is a system. GIS is how you see the whole of it at once.",
    description:
      "Cities generate more spatial data than any other environment — and most of it is siloed, stale, or inaccessible to the people who need it. Kaistrum connects the dots.",
    stats: [
      { value: "3D", label: "digital twin capable" },
      { value: "Real-time", label: "IoT sensor integration" },
      { value: "Multi-dept", label: "data federation" },
    ],
    challenges: [
      {
        title: "Departmental data silos",
        description:
          "Transport, utilities, planning, and public safety each maintain separate GIS systems — making cross-department analysis impossible without manual data extraction.",
      },
      {
        title: "Rapid urbanisation outpacing records",
        description:
          "Informal settlements and new developments appear faster than cadastral records can be updated — the official map is always behind reality.",
      },
      {
        title: "Citizen service accessibility",
        description:
          "Residents can't access spatial services — permit applications, service requests, and city data — without navigating technical GIS tools.",
      },
      {
        title: "Stale operational intelligence",
        description:
          "City management decisions are made on data that is hours or days old — real-time city intelligence requires live sensor integration.",
      },
    ],
    solutions: [
      {
        title: "Federated city GIS platform",
        description:
          "A single GIS platform connecting all departments — transport, utilities, planning, public safety — with role-based access and shared authoritative datasets.",
      },
      {
        title: "Continuous change detection",
        description:
          "Regular satellite imagery analysis to detect new construction, informal settlements, and land use change — keeping the base map current.",
      },
      {
        title: "Citizen-facing geoportal",
        description:
          "A public-facing web portal where residents submit permit applications, report issues, and access spatial city data — without GIS expertise.",
      },
      {
        title: "Real-time IoT integration",
        description:
          "Live sensor feeds — traffic loops, air quality monitors, flood sensors, CCTV — integrated into a single operational GIS dashboard.",
      },
    ],
    useCases: [
      {
        title: "City digital twin",
        description:
          "A live 3D model of city infrastructure — buildings, roads, utilities, and public space — fed with real-time IoT data for operational monitoring.",
      },
      {
        title: "Development permitting workflow",
        description:
          "Spatial workflow for permit applications — from submission to zoning check, neighbour notification, inspection, and compliance sign-off.",
      },
      {
        title: "Traffic & mobility analysis",
        description:
          "Origin-destination modelling and congestion analysis from anonymised mobile and transit data — informing signal optimisation and route planning.",
      },
      {
        title: "Underground utility conflict checking",
        description:
          "GIS-driven analysis of underground utility corridors for construction projects — preventing costly and dangerous subsurface conflicts.",
      },
      {
        title: "Environmental monitoring",
        description:
          "Spatial integration of air quality, noise, and flood risk data for evidence-based urban planning and public health reporting.",
      },
    ],
    imagePlaceholders: {
      wide: "Smart city 3D digital twin dashboard",
      narrow: "Urban IoT sensor monitoring map",
    },
  },
  {
    slug: "environmental",
    index: 9,
    name: "Environmental",
    headline: "Ecosystems don't follow boundaries. Your GIS shouldn't either.",
    description:
      "Environmental monitoring, biodiversity mapping, and climate vulnerability assessment all require spatial analysis at scales and cadences that only satellite remote sensing and GIS can deliver.",
    stats: [
      { value: "24hr", label: "deforestation alert cadence" },
      { value: "10m", label: "biodiversity mapping resolution" },
      { value: "Carbon", label: "stock modelling" },
    ],
    challenges: [
      {
        title: "Deforestation detection speed",
        description:
          "Manual interpretation of satellite imagery misses early-stage clearing and cannot match the cadence needed for effective enforcement.",
      },
      {
        title: "Biodiversity data fragmentation",
        description:
          "Species records held by universities, NGOs, and government agencies sit in incompatible formats — preventing the integrated analysis that conservation planning requires.",
      },
      {
        title: "Climate vulnerability quantification",
        description:
          "Quantifying climate risk to communities and ecosystems requires integrating climate models, topographic data, and population layers — rarely done in a single GIS.",
      },
      {
        title: "Remote habitat data collection",
        description:
          "Ecologists working in remote habitats need field tools that function without connectivity or power — and that produce spatially precise records.",
      },
    ],
    solutions: [
      {
        title: "Automated satellite change detection",
        description:
          "Sentinel-2 and Planet imagery analysed automatically on a 24-hour cycle — with alerts triggered when change exceeds a defined threshold.",
      },
      {
        title: "Biodiversity data aggregation",
        description:
          "A unified platform harmonising species occurrence records from GBIF, iNaturalist, government databases, and field surveys.",
      },
      {
        title: "Multi-criteria vulnerability analysis",
        description:
          "Spatial overlay of climate projections, topography, population, and infrastructure to produce quantified vulnerability indices at any scale.",
      },
      {
        title: "Offline field data collection",
        description:
          "GPS-precise field collection tools with offline basemap cache — for ecologists working without connectivity or power.",
      },
    ],
    useCases: [
      {
        title: "Deforestation monitoring & alerting",
        description:
          "Automated change detection on Sentinel-2 imagery with 24-hour alert cadence — delivering forest loss notifications to rangers and enforcement teams.",
      },
      {
        title: "Biodiversity & habitat mapping",
        description:
          "Species distribution modelling from occurrence records and remote sensing — identifying critical habitat and connectivity corridors for conservation planning.",
      },
      {
        title: "Carbon stock assessment",
        description:
          "Above-ground biomass estimation from LiDAR point clouds and optical imagery — calibrated against field plots for REDD+ compliant carbon accounting.",
      },
      {
        title: "Protected area management",
        description:
          "Patrol tracking, encroachment detection, boundary monitoring, and ranger performance dashboards for protected area management teams.",
      },
      {
        title: "Climate vulnerability mapping",
        description:
          "Spatial analysis of population and ecosystem exposure to flood, drought, heat, and sea-level rise under IPCC scenario projections.",
      },
    ],
    imagePlaceholders: {
      wide: "Forest cover change detection — satellite time series",
      narrow: "Species distribution modelling map",
    },
  },
  {
    slug: "disaster-response",
    index: 10,
    name: "Disaster Response",
    headline: "When everything fails, the map is the last thing that should.",
    description:
      "Crisis response operates under the most demanding conditions GIS will ever face. Kaistrum builds the tools and deploys the platforms that work when infrastructure doesn't.",
    stats: [
      { value: "72hr", label: "post-event damage assessment" },
      { value: "Satellite", label: "imagery analysis pre-field" },
      { value: "Multi-hazard", label: "GIS capability" },
    ],
    challenges: [
      {
        title: "Situational awareness under disruption",
        description:
          "Communications and infrastructure fail precisely when they are most needed — traditional connected GIS tools fail at exactly the wrong moment.",
      },
      {
        title: "Damage assessment speed",
        description:
          "Field surveys of affected areas take weeks — but response resource allocation decisions need to happen within days of an event.",
      },
      {
        title: "Multi-agency coordination",
        description:
          "UN, INGO, and government response teams work from incompatible spatial data — duplicating effort and missing coverage gaps.",
      },
      {
        title: "Crowdsourced data quality",
        description:
          "Community-generated damage reports are valuable but noisy — without validation and classification they cannot reliably inform resource decisions.",
      },
    ],
    solutions: [
      {
        title: "Satellite rapid damage assessment",
        description:
          "Post-event satellite imagery analysis producing building damage classifications within 72 hours — informing field deployment before teams arrive.",
      },
      {
        title: "Offline crisis response apps",
        description:
          "Mobile apps with pre-cached basemaps and offline-first data collection — functional with no network, syncing when connectivity returns.",
      },
      {
        title: "Humanitarian data exchange integration",
        description:
          "Data outputs in COD, HXL, and HDX-compatible formats so Kaistrum data feeds directly into the humanitarian coordination ecosystem.",
      },
      {
        title: "AI-assisted crowdsource validation",
        description:
          "Machine learning classification of community-submitted damage photos — accelerating validation and reducing analyst burden.",
      },
    ],
    useCases: [
      {
        title: "Rapid damage assessment",
        description:
          "Satellite imagery analysis for building damage classification within 72 hours of a sudden-onset disaster — delivered as a GeoJSON layer for field team briefing.",
      },
      {
        title: "Evacuation route planning",
        description:
          "Network analysis accounting for road damage, bridge status, and chokepoint capacity — generating optimised evacuation routes for affected zones.",
      },
      {
        title: "IDP camp siting",
        description:
          "Multi-criteria GIS analysis evaluating flood risk, accessibility, proximity to services, and land availability for displaced population site selection.",
      },
      {
        title: "Aid distribution mapping",
        description:
          "GIS-optimised distribution routes and point-of-distribution siting based on affected population density and access road capacity.",
      },
      {
        title: "Recovery progress monitoring",
        description:
          "Satellite change detection tracking rebuilding activity and infrastructure restoration over weeks and months following a crisis event.",
      },
    ],
    imagePlaceholders: {
      wide: "Crisis damage assessment satellite imagery analysis",
      narrow: "Field evacuation route GIS",
    },
  },
];

/* ── Animation wrapper ── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ── Wide image placeholder ── */
function WidePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        aspectRatio: "21/6",
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.04 }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <defs>
          <pattern id="wide-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wide-grid)" style={{ color: "var(--accent)" }} />
      </svg>
      <p
        className="relative text-[11px] uppercase tracking-[0.22em] font-medium"
        style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
    </div>
  );
}

/* ── Narrow image placeholder ── */
function NarrowPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative w-full flex flex-col items-center justify-center gap-3 overflow-hidden"
      style={{
        aspectRatio: "4/3",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.04 }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <defs>
          <pattern id="narrow-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#narrow-grid)" style={{ color: "var(--accent)" }} />
      </svg>
      <p
        className="relative text-[10px] uppercase tracking-[0.2em] font-medium px-4 text-center"
        style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
    </div>
  );
}

/* ── Page ── */
const IndustryPage: NextPage<{ industry: IndustryData }> = ({ industry }) => {
  const padded = String(industry.index).padStart(2, "0");

  return (
    <>
      <SEO
        title={`${industry.name} GIS Solutions — Kaistrum`}
        description={industry.description}
        path={`/industries/${industry.slug}`}
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/#industries" },
          { name: industry.name, path: `/industries/${industry.slug}` }
        ])}
      />

      <Header />

      <main>
        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            minHeight: "82vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingTop: "8rem",
            paddingBottom: "0",
          }}>
          {/* Decorative large number */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none font-bold"
            style={{
              fontSize: "clamp(120px, 22vw, 320px)",
              color: "var(--accent)",
              opacity: 0.045,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              right: "-0.02em",
            }}
            aria-hidden="true">
            {padded}
          </div>

          <div className="max-w-6xl mx-auto px-4 md:px-6 w-full relative">
            {/* Back link */}
            <Reveal delay={0.05}>
              <Link
                href="/#industries"
                className="inline-flex items-center gap-2 text-xs font-medium mb-10 transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                }>
                <ArrowLeft size={12} />
                All industries
              </Link>
            </Reveal>

            {/* Eyebrow */}
            <Reveal delay={0.1}>
              <p
                className="text-[10px] uppercase tracking-[0.3em] mb-4 font-semibold"
                style={{ color: "var(--accent)" }}>
                Industry Focus
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.17}>
              <h1
                className="font-semibold leading-[0.95] mb-7 max-w-3xl"
                style={{
                  color: "var(--text)",
                  fontSize: "clamp(2rem, 5.5vw, 4.25rem)",
                }}>
                {industry.headline}
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.25}>
              <p
                className="text-base md:text-lg leading-relaxed max-w-xl mb-16"
                style={{ color: "var(--text-dim)" }}>
                {industry.description}
              </p>
            </Reveal>

            {/* Stats strip */}
            <Reveal delay={0.32}>
              <div
                className="grid grid-cols-3 border-t"
                style={{ borderColor: "var(--border)" }}>
                {industry.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="py-7 pr-6"
                    style={{
                      borderRight: i < 2 ? `1px solid var(--border)` : "none",
                      paddingLeft: i > 0 ? "1.5rem" : "0",
                    }}>
                    <p
                      className="text-2xl md:text-3xl font-semibold mb-1"
                      style={{ color: "var(--text)" }}>
                      {stat.value}
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: "var(--text-muted)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── The challenge ── */}
        <section
          className="py-20 md:py-28 px-4 md:px-6 border-b"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-12 lg:gap-20">
              {/* Left: section label */}
              <Reveal className="lg:sticky lg:top-28 self-start">
                <p
                  className="text-[10px] uppercase tracking-[0.24em] mb-4 font-semibold"
                  style={{ color: "var(--accent)" }}>
                  The challenge
                </p>
                <p
                  className="font-normal leading-[0.97]"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    color: "var(--text-dim)",
                    fontStyle: "italic",
                  }}>
                  What makes {industry.name.toLowerCase()} hard.
                </p>
              </Reveal>

              {/* Right: challenge list */}
              <div>
                {industry.challenges.map((ch, i) => (
                  <Reveal key={ch.title} delay={i * 0.09}>
                    <div
                      className="py-7"
                      style={{
                        borderBottom: i < industry.challenges.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                      }}>
                      <div className="flex items-start gap-5">
                        <span
                          className="text-[10px] font-semibold tracking-[0.18em] shrink-0 mt-1"
                          style={{ color: "var(--accent)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3
                            className="font-semibold text-base mb-2"
                            style={{ color: "var(--text)" }}>
                            {ch.title}
                          </h3>
                          <p
                            className="text-sm leading-[1.7]"
                            style={{ color: "var(--text-dim)" }}>
                            {ch.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Wide image placeholder ── */}
        <WidePlaceholder label={industry.imagePlaceholders.wide} />

        {/* ── How we help ── */}
        <section
          className="py-20 md:py-28 px-4 md:px-6 border-b"
          style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p
                className="text-[10px] uppercase tracking-[0.24em] mb-4 font-semibold"
                style={{ color: "var(--accent)" }}>
                Our approach
              </p>
              <h2
                className="font-semibold leading-[0.97] mb-14"
                style={{
                  color: "var(--text)",
                  fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                }}>
                What Kaistrum delivers.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-start">
              {/* Solutions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {industry.solutions.map((sol, i) => (
                  <Reveal key={sol.title} delay={i * 0.08}>
                    <div
                      className="p-6 border-b"
                      style={{
                        borderRight:
                          i % 2 === 0 ? "1px solid var(--border)" : "none",
                        borderColor: "var(--border)",
                      }}>
                      <div className="flex items-start gap-3 mb-3">
                        <Check
                          size={14}
                          className="shrink-0 mt-0.5"
                          style={{ color: "var(--accent)" }}
                        />
                        <h3
                          className="font-semibold text-sm"
                          style={{ color: "var(--text)" }}>
                          {sol.title}
                        </h3>
                      </div>
                      <p
                        className="text-xs leading-[1.7] pl-[22px]"
                        style={{ color: "var(--text-muted)" }}>
                        {sol.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Narrow image placeholder */}
              <Reveal delay={0.1} className="lg:sticky lg:top-28">
                <NarrowPlaceholder label={industry.imagePlaceholders.narrow} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Use cases ── */}
        <section
          className="py-20 md:py-28 px-4 md:px-6 border-b"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p
                className="text-[10px] uppercase tracking-[0.24em] mb-4 font-semibold"
                style={{ color: "var(--accent)" }}>
                Applications
              </p>
              <h2
                className="font-semibold leading-[0.97] mb-14"
                style={{
                  color: "var(--text)",
                  fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                }}>
                In practice.
              </h2>
            </Reveal>

            <div>
              {industry.useCases.map((uc, i) => (
                <Reveal key={uc.title} delay={i * 0.07}>
                  <div
                    className="grid grid-cols-[56px_1fr] gap-6 md:gap-10 py-8 border-t items-start"
                    style={{ borderColor: "var(--border)" }}>
                    {/* Large number */}
                    <div
                      className="font-bold leading-none select-none"
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                        color: "var(--accent)",
                        opacity: 0.18,
                        letterSpacing: "-0.03em",
                      }}
                      aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div>
                      <h3
                        className="font-semibold text-base md:text-lg mb-2"
                        style={{ color: "var(--text)" }}>
                        {uc.title}
                      </h3>
                      <p
                        className="text-sm leading-[1.7]"
                        style={{ color: "var(--text-dim)" }}>
                        {uc.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-20 md:py-28 px-4 md:px-6"
          style={{ background: "var(--bg)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
              <Reveal>
                <p
                  className="text-[10px] uppercase tracking-[0.24em] mb-4 font-semibold"
                  style={{ color: "var(--accent)" }}>
                  Get started
                </p>
                <h2
                  className="font-semibold leading-[0.95] max-w-2xl"
                  style={{
                    color: "var(--text)",
                    fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                  }}>
                  Ready to deploy GIS for{" "}
                  <em
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontWeight: 300,
                      color: "var(--accent-dim)",
                    }}>
                    {industry.name.toLowerCase()}
                  </em>
                  ?
                </h2>
                <p
                  className="text-sm md:text-base leading-relaxed mt-6 max-w-xl"
                  style={{ color: "var(--text-muted)" }}>
                  Tell us about your organisation and requirements. We will respond within one business day.
                </p>
              </Reveal>

              <Reveal delay={0.15} className="flex flex-col gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold whitespace-nowrap transition-opacity duration-200 hover:opacity-85"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}>
                  Book a consultation
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/#industries"
                  className="text-xs text-center transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                  }>
                  View all industries
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: industries.map((ind) => ({ params: { slug: ind.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const industry = industries.find((ind) => ind.slug === params?.slug) ?? null;
  if (!industry) return { notFound: true };
  return { props: { industry } };
};

export default IndustryPage;
