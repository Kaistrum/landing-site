import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import SEO, { breadcrumbSchema, serviceSchema } from "@/components/SEO";
import { motion } from "framer-motion";
import {
	ArrowRight,
	ArrowLeft,
	Check,
	Server,
	DatabaseZap,
	Code2,
	GitMerge,
	GraduationCap,
	Headphones,
	type LucideIcon
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ── Serialisable service data ── */
type ProcessStep = { step: number; title: string; description: string };

type ServiceData = {
	slug: string;
	tab: string;
	category: string;
	headline: string;
	description: string;
	overview: {
		title: string;
		body: string;
		points: string[];
		placeholder: string;
	};
	process: ProcessStep[];
	capabilities: { title: string; description: string }[];
	secondSection: {
		title: string;
		body: string;
		placeholder: string;
		points: string[];
	};
};

const services: ServiceData[] = [
	{
		slug: "infrastructure-deployment",
		tab: "Infrastructure Deployment",
		category: "DEPLOYMENT",
		headline: "Enterprise-grade GIS infrastructure, built to last.",
		description:
			"We deliver fully hardened GIS environments that scale with your organisation — on-premise, cloud, or hybrid. Every deployment is security-hardened, load-balanced, and benchmarked before handover.",
		overview: {
			title: "End-to-end deployment, zero compromises.",
			body: "From geodatabase schema design to multi-tier server architecture, our engineers handle every layer of your GIS environment. We do not hand over a system until it has passed our performance benchmark suite under your expected workload.",
			points: [
				"On-premise, cloud (AWS / Azure / GCP), or hybrid deployment",
				"Geodatabase design and optimisation (PostgreSQL/PostGIS, Oracle Spatial, SQL Server)",
				"Load-balanced, high-availability server topology",
				"SSL/TLS, firewall, and VPN hardening",
				"Disaster recovery and automated backup configuration",
				"Full administrator documentation and runbook"
			],
			placeholder: "GIS server architecture diagram"
		},
		process: [
			{
				step: 1,
				title: "Discovery",
				description:
					"We audit your current environment, data volumes, concurrent user expectations, and compliance requirements to establish a clear baseline."
			},
			{
				step: 2,
				title: "Architecture Design",
				description:
					"We propose server topology, storage strategy, network segmentation, and a capacity model with headroom for growth."
			},
			{
				step: 3,
				title: "Build & Configure",
				description:
					"Our engineers deploy and configure the full GIS stack — database, application server, web adaptor, and monitoring agents."
			},
			{
				step: 4,
				title: "Security & Performance",
				description:
					"We apply security baselines, run penetration tests, and execute load tests against your expected peak concurrency."
			},
			{
				step: 5,
				title: "Handover",
				description:
					"We deliver full documentation, administrator training, and a structured knowledge-transfer session before formally signing off."
			}
		],
		capabilities: [
			{
				title: "ArcGIS Enterprise deployment",
				description:
					"Full ArcGIS Enterprise stack — Portal, Server, Data Store, and Web Adaptor."
			},
			{
				title: "Open-source GIS stacks",
				description:
					"GeoServer, MapServer, PostGIS, QGIS Server — fully containerised with Docker or bare metal."
			},
			{
				title: "Cloud infrastructure",
				description:
					"AWS, Azure, and GCP deployment with auto-scaling groups and managed database services."
			},
			{
				title: "High availability clustering",
				description:
					"Active-active or active-passive cluster topologies with automatic failover."
			},
			{
				title: "Monitoring & alerting",
				description:
					"Prometheus, Grafana, or Datadog integration with custom GIS health dashboards."
			},
			{
				title: "Compliance hardening",
				description:
					"CIS benchmark application, audit logging, and compliance report generation."
			}
		],
		secondSection: {
			title: "Benchmarked before you sign off.",
			body: "Every Kairos deployment goes through a structured performance validation phase before handover. We simulate your expected peak concurrent users and data volumes, then provide a benchmark report showing response times, throughput, and resource utilisation — so you know exactly what you are signing off on.",
			placeholder: "Performance benchmark dashboard",
			points: [
				"Load testing against peak concurrent user scenarios",
				"Response time SLA validation (map tile serving, feature queries, analysis)",
				"Storage I/O throughput and database query plan analysis",
				"Written benchmark report included with every deployment"
			]
		}
	},
	{
		slug: "data-migration",
		tab: "Data Migration",
		category: "MIGRATION",
		headline: "Move legacy spatial data without losing a single record.",
		description:
			"We audit, map, and migrate your spatial datasets across platforms with full quality assurance, topology validation, and zero-downtime strategies for live production systems.",
		overview: {
			title: "Every dataset, every attribute, every edge case.",
			body: "Legacy spatial data carries decades of accumulated schema decisions, coordinate system choices, and topological quirks. Our migration engineers understand these at depth — we do not just convert files, we validate every geometry, every attribute, and every relationship before and after cutover.",
			points: [
				"Full inventory audit of source datasets, formats, and coordinate systems",
				"Schema mapping and attribute transformation documentation",
				"Geometry validation and topology repair",
				"Coordinate system reprojection with sub-metre accuracy checks",
				"Zero-downtime cutover strategy for live production systems",
				"Post-migration verification and sign-off report"
			],
			placeholder: "Data migration workflow diagram"
		},
		process: [
			{
				step: 1,
				title: "Audit",
				description:
					"We inventory every source dataset — format, coordinate system, geometry type, attribute schema, and record count — and document all known data quality issues."
			},
			{
				step: 2,
				title: "Schema Mapping",
				description:
					"We design the target schema and write transformation rules that preserve the full semantic meaning of your source data."
			},
			{
				step: 3,
				title: "Test Migration",
				description:
					"We execute a trial migration on a representative sample and validate geometry, attributes, topology, and coordinate accuracy."
			},
			{
				step: 4,
				title: "Quality Assurance",
				description:
					"Automated QA scripts compare source and target record-for-record, flagging any discrepancies for human review before production cutover."
			},
			{
				step: 5,
				title: "Live Cutover",
				description:
					"We execute the production migration using a zero-downtime strategy — whether incremental sync, parallel-run, or scheduled maintenance window — and issue a sign-off report."
			}
		],
		capabilities: [
			{
				title: "Format conversion",
				description:
					"Shapefile, Geodatabase, MapInfo TAB, AutoCAD DXF/DWG, KML, GeoJSON, and more."
			},
			{
				title: "CAD to GIS",
				description:
					"Convert CAD drawings to GIS features with attribute linkage and layer-to-feature-class mapping."
			},
			{
				title: "Raster migration",
				description:
					"ECW, MrSID, GeoTIFF, and aerial imagery optimisation for GIS serving."
			},
			{
				title: "Coordinate reprojection",
				description:
					"Global and local projections, datum shifts, and grid-based transformation (NTv2)."
			},
			{
				title: "Schema harmonisation",
				description:
					"Attribute domain standardisation, coded-value domain mapping, and field-level transformation scripts."
			},
			{
				title: "TB-scale streaming migration",
				description:
					"Parallel processing pipelines for very large datasets — tested at terabyte scale."
			}
		],
		secondSection: {
			title: "Zero data loss, guaranteed.",
			body: "Our QA framework validates every record at both geometry and attribute level before we sign off on any migration. We provide a complete migration report — source record count, target record count, geometry validity pass rate, and attribute accuracy rate — so you have full auditability of what was moved and how.",
			placeholder: "QA validation dashboard",
			points: [
				"Automated record-for-record comparison (source vs. target)",
				"Geometry validity check on 100% of migrated features",
				"Attribute accuracy sampling with statistical confidence reporting",
				"Migration report delivered in PDF and machine-readable format"
			]
		}
	},
	{
		slug: "custom-development",
		tab: "Custom Development",
		category: "DEVELOPMENT",
		headline: "GIS applications built exactly for the way you work.",
		description:
			"We design and build bespoke web and mobile GIS applications — from field survey tools to real-time operational dashboards — tightly integrated with your workflows.",
		overview: {
			title: "Applications that fit your workflow, not the other way around.",
			body: "Off-the-shelf GIS software is built for the median user. If your organisation has specific workflows, data structures, or operational constraints, you need software that reflects them. Our development team builds purpose-built GIS applications from the ground up — web, mobile, and everything in between.",
			points: [
				"Web mapping applications with custom cartography and UX",
				"Mobile field survey and inspection apps (iOS and Android)",
				"Real-time operational dashboards and control-room displays",
				"Offline-capable applications for low-connectivity environments",
				"REST and GraphQL API development",
				"Data pipeline and ETL automation"
			],
			placeholder: "Custom web mapping application"
		},
		process: [
			{
				step: 1,
				title: "Discovery",
				description:
					"We map your workflows, identify user personas, and define the functional and non-functional requirements in a structured specification document."
			},
			{
				step: 2,
				title: "UX Design",
				description:
					"We prototype the interface in Figma with realistic data and gather structured feedback from your users before writing a single line of code."
			},
			{
				step: 3,
				title: "Development",
				description:
					"We build iteratively in two-week sprints, with a working deployment available for your review at the end of every sprint."
			},
			{
				step: 4,
				title: "Testing",
				description:
					"QA is performed against your real data and edge cases, in an environment that mirrors production, before we release any code."
			},
			{
				step: 5,
				title: "Deployment & Handover",
				description:
					"We deploy to your infrastructure, hand over full source code with documentation, and provide a structured knowledge-transfer session."
			}
		],
		capabilities: [
			{
				title: "Web mapping (React / Vue)",
				description:
					"MapLibre GL, Leaflet, and OpenLayers — performant, accessible, and mobile-responsive."
			},
			{
				title: "ArcGIS JS SDK",
				description:
					"Custom widgets, scene views, and integrations with ArcGIS Online and Enterprise."
			},
			{
				title: "Mobile applications",
				description:
					"React Native and Capacitor apps with offline tile caching and background sync."
			},
			{
				title: "QGIS plugins",
				description:
					"Custom QGIS plugins (Python) for desktop GIS workflow automation."
			},
			{
				title: "Real-time dashboards",
				description:
					"WebSocket-fed operational displays with live vehicle tracking, sensor feeds, and alerts."
			},
			{
				title: "Data pipelines",
				description:
					"Scheduled and event-driven ETL pipelines using Python, FME, or Apache Airflow."
			}
		],
		secondSection: {
			title: "Built on open standards, owned by you.",
			body: "Every application we deliver comes with full source code, no vendor lock-in, and documentation that lets your internal team own and extend the system. We build on open-source GIS standards wherever possible — OGC WMS/WFS/WMTS, GeoJSON, and open data formats — so your data and your application remain portable.",
			placeholder: "Mobile field application UI",
			points: [
				"Full source code ownership — no licences, no lock-in",
				"OGC-compliant spatial services",
				"Structured handover with code walkthrough and documentation",
				"Optional retainer for ongoing development and support"
			]
		}
	},
	{
		slug: "system-integration",
		tab: "System Integration",
		category: "INTEGRATION",
		headline: "Connect your GIS to every system that matters.",
		description:
			"We bridge GIS with ERPs, BI platforms, SCADA systems, and document management — so your spatial data flows freely across your entire technology stack.",
		overview: {
			title: "Your GIS, embedded in your enterprise stack.",
			body: "Spatial data that lives in isolation delivers a fraction of its potential value. When your GIS is connected to your asset management system, your BI platform, and your field operations tool, location becomes a lens through which every system becomes more powerful. We design and build those connections.",
			points: [
				"ERP integration (SAP PM, Oracle EAM, Microsoft Dynamics)",
				"Business intelligence (Power BI, Tableau, Qlik)",
				"SCADA and IoT platform connectivity",
				"Document management (SharePoint, Alfresco, OpenText)",
				"CRM and customer portal integration",
				"Custom middleware and API gateway development"
			],
			placeholder: "System integration architecture diagram"
		},
		process: [
			{
				step: 1,
				title: "Architecture Review",
				description:
					"We map all source and target systems, document data flows, and identify the optimal integration patterns for your environment."
			},
			{
				step: 2,
				title: "Integration Design",
				description:
					"We define API contracts, data models, sync cadence, error handling strategy, and the monitoring approach before development begins."
			},
			{
				step: 3,
				title: "Development",
				description:
					"Integration components are built and unit-tested in isolation against mocked endpoints before any connection to production systems."
			},
			{
				step: 4,
				title: "End-to-End Testing",
				description:
					"We validate the full data flow — including error paths, retry logic, and edge cases — in a staging environment that mirrors production."
			},
			{
				step: 5,
				title: "Go-Live",
				description:
					"We deploy with a rollback plan in place, monitor the integration under live load for the first 48 hours, and hand over runbook documentation."
			}
		],
		capabilities: [
			{
				title: "REST and SOAP APIs",
				description:
					"Standards-compliant API connectors with full authentication and error-handling support."
			},
			{
				title: "SAP integration",
				description:
					"SAP Plant Maintenance, Asset Management, and PM notification round-trips with spatial context."
			},
			{
				title: "Power BI spatial",
				description:
					"Live GIS-fed datasets powering spatial visuals in Power BI reports and dashboards."
			},
			{
				title: "ETL pipelines",
				description:
					"FME, Apache Airflow, and custom Python pipelines for scheduled and event-driven data sync."
			},
			{
				title: "OAuth 2.0 / SSO",
				description:
					"SAML and OIDC identity federation so users authenticate once across all systems."
			},
			{
				title: "Event-driven architecture",
				description:
					"Webhook and message-queue patterns (Kafka, RabbitMQ) for real-time event propagation."
			}
		],
		secondSection: {
			title: "SAP + GIS: a proven combination.",
			body: "Our most requested integration is GIS with SAP Plant Maintenance. When a field crew creates a PM notification in SAP, the affected asset is instantly visible on the GIS map — and when a GIS inspection identifies a fault, a PM notification is created in SAP automatically. The result is a single source of truth for asset condition that both the office and the field trust.",
			placeholder: "SAP + GIS integration workflow",
			points: [
				"Bidirectional asset status sync between GIS and SAP PM",
				"Spatial fault notifications generated from field GIS submissions",
				"Crew dispatch routing driven by GIS proximity analysis",
				"Full audit trail of data exchange between systems"
			]
		}
	},
	{
		slug: "training",
		tab: "Training",
		category: "TRAINING",
		headline: "Hands-on GIS training using your own data.",
		description:
			"From GIS fundamentals to advanced spatial analysis, our expert-led workshops are tailored to your deployed platform and your team's roles.",
		overview: {
			title: "Training that transfers to the job immediately.",
			body: "Generic GIS courses teach software features. Our training teaches your team to do their actual job better — using your GIS platform, your datasets, and your workflows as the training material. Every exercise is designed around a scenario your team will recognise from their day-to-day work.",
			points: [
				"Role-based tracks: end users, power users, administrators, and developers",
				"On-site delivery or live virtual classroom",
				"Training delivered on your production or mirrored training environment",
				"Exercises built from your real datasets and workflows",
				"Post-training competency assessment",
				"Follow-up resources and Q&A window after course completion"
			],
			placeholder: "Training session in progress"
		},
		process: [
			{
				step: 1,
				title: "Needs Assessment",
				description:
					"We interview team leads and sample trainees to map skill gaps, identify learning objectives, and prioritise training topics."
			},
			{
				step: 2,
				title: "Curriculum Design",
				description:
					"We build a custom training plan — session structure, duration, and exercises — aligned to your platform and your team's roles."
			},
			{
				step: 3,
				title: "Material Preparation",
				description:
					"We develop all training exercises and sample datasets using your real data (anonymised where required) so every scenario feels familiar."
			},
			{
				step: 4,
				title: "Delivery",
				description:
					"Expert instructors facilitate hands-on workshops with maximum group sizes of 12 to ensure every delegate gets individual attention."
			},
			{
				step: 5,
				title: "Assessment & Follow-up",
				description:
					"We assess competency at the end of each module, provide individual feedback, and host a follow-up Q&A session 30 days after delivery."
			}
		],
		capabilities: [
			{
				title: "GIS fundamentals",
				description:
					"Coordinate systems, data types, cartographic principles, and basic spatial queries."
			},
			{
				title: "Spatial analysis",
				description:
					"Geoprocessing, network analysis, terrain analysis, and ModelBuilder / QGIS Graphical Modeler."
			},
			{
				title: "Field data collection",
				description:
					"Survey123, ArcGIS Field Maps, QField, and ODK — design, deployment, and submission management."
			},
			{
				title: "Remote sensing",
				description:
					"Imagery classification, change detection, NDVI analysis, and drone data processing."
			},
			{
				title: "GIS administration",
				description:
					"User management, service publishing, performance tuning, and backup procedures."
			},
			{
				title: "Developer bootcamps",
				description:
					"Python scripting (arcpy / PyQGIS), JavaScript SDK, and REST API integration."
			}
		],
		secondSection: {
			title: "Training on your platform, in your environment.",
			body: "We do not deliver generic slide-deck training. Every session is run inside your deployed GIS environment — either on your production system with read-only accounts, or on a mirrored training environment we can provision on request. Your team practises on the tools and data they use every day, which dramatically accelerates knowledge retention.",
			placeholder: "On-site GIS training workshop",
			points: [
				"Maximum 12 delegates per instructor for effective hands-on delivery",
				"Training environment provisioned and configured by Kairos",
				"All materials remain with you after the course",
				"Optional certification pathway for key personnel"
			]
		}
	},
	{
		slug: "support",
		tab: "Support",
		category: "SUPPORT",
		headline: "24/7 expert support, whenever you need it.",
		description:
			"Every Kairos client gets SLA-backed technical support with a dedicated account manager, remote diagnostics, and proactive platform monitoring.",
		overview: {
			title: "Support that prevents problems, not just resolves them.",
			body: "Most GIS vendors are reactive — they wait for you to raise a ticket. Our support model is built around proactive monitoring so we frequently know about an emerging issue before you do. Combine that with SLA-backed response times and a dedicated support engineer who knows your environment, and you get a fundamentally different support experience.",
			points: [
				"Priority 1 (critical outage): 1-hour response, 4-hour resolution target",
				"Priority 2 (degraded service): 4-hour response, next business day resolution",
				"Priority 3 (non-critical): next business day response",
				"Dedicated account manager and named support engineer",
				"Remote access support (TeamViewer, Anydesk, or your preferred tool)",
				"Quarterly platform review and health report"
			],
			placeholder: "Support monitoring dashboard"
		},
		process: [
			{
				step: 1,
				title: "Ticket Raised",
				description:
					"Submit via support portal, email, or phone. Tickets are triaged and prioritised within your SLA window, 24 hours a day."
			},
			{
				step: 2,
				title: "Expert Assignment",
				description:
					"The ticket is assigned to a support engineer with the relevant GIS platform expertise — not a generalist help-desk agent."
			},
			{
				step: 3,
				title: "Diagnosis",
				description:
					"Our engineer performs remote diagnostics — log analysis, configuration review, and live screen-share — to identify root cause."
			},
			{
				step: 4,
				title: "Resolution",
				description:
					"We apply the fix, document all actions taken, and verify the resolution with you before closing the ticket."
			},
			{
				step: 5,
				title: "Root Cause & Prevention",
				description:
					"For any Priority 1 or 2 incident, we issue a root cause analysis report with recommendations to prevent recurrence."
			}
		],
		capabilities: [
			{
				title: "24/7 incident response",
				description:
					"Round-the-clock coverage for critical incidents, including weekends and public holidays."
			},
			{
				title: "Proactive monitoring",
				description:
					"Automated health checks on services, databases, and disk usage — with alerting before thresholds are breached."
			},
			{
				title: "Remote diagnostics",
				description:
					"Secure remote access for rapid diagnosis without waiting for on-site travel."
			},
			{
				title: "Patch management",
				description:
					"Scheduled patch cycles with testing in staging before any production changes."
			},
			{
				title: "Platform health reports",
				description:
					"Monthly and quarterly reports covering uptime, incident summary, and capacity trends."
			},
			{
				title: "Knowledge base access",
				description:
					"Client-exclusive knowledge base with runbooks, workarounds, and configuration guides."
			}
		],
		secondSection: {
			title: "We know your environment before you call.",
			body: "When you open a support ticket, your dedicated engineer already has your platform configuration, deployment architecture, and historical incident log in front of them. We maintain living documentation of every environment we support — so there is no time wasted re-explaining your setup, and no risk of a junior engineer making a change that conflicts with your configuration.",
			placeholder: "Remote diagnostics session",
			points: [
				"Living environment documentation maintained by Kairos",
				"Named support engineer assigned to your account",
				"No call-centre scripts — direct access to expert engineers",
				"Post-incident reports for all Priority 1 and 2 tickets"
			]
		}
	}
];

/* ── Icon mapping (client-side only, not serialised) ── */
const iconMap: Record<string, LucideIcon> = {
	"infrastructure-deployment": Server,
	"data-migration": DatabaseZap,
	"custom-development": Code2,
	"system-integration": GitMerge,
	training: GraduationCap,
	support: Headphones
};

/* ── Image placeholder ── */
function ImagePlaceholder({ label }: { label: string }) {
	return (
		<div
			className="relative w-full flex flex-col items-center justify-center overflow-hidden"
			style={{
				aspectRatio: "4/3",
				background: "var(--bg-card)",
				border: "1px solid var(--border)"
			}}>
			<svg
				className="absolute inset-0 w-full h-full pointer-events-none"
				style={{ opacity: 0.045 }}
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true">
				<defs>
					<pattern
						id="svc-grid"
						width="40"
						height="40"
						patternUnits="userSpaceOnUse">
						<path
							d="M 40 0 L 0 0 0 40"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.6"
						/>
					</pattern>
				</defs>
				<rect
					width="100%"
					height="100%"
					fill="url(#svc-grid)"
					style={{ color: "var(--accent)" }}
				/>
			</svg>

			<div className="relative flex flex-col items-center gap-3 px-6 text-center">
				<div
					className="w-12 h-12 flex items-center justify-center border"
					style={{
						borderColor: "var(--border)",
						background: "var(--accent-faint)"
					}}>
					<svg
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						style={{ color: "var(--accent)" }}
						aria-hidden="true">
						<rect x="3" y="3" width="18" height="18" rx="0" />
						<path d="M3 9h18M9 21V9" />
					</svg>
				</div>
				<p
					className="text-[11px] uppercase tracking-[0.18em] font-medium"
					style={{ color: "var(--text-muted)" }}>
					{label}
				</p>
			</div>
		</div>
	);
}

/* ── Fade-up wrapper ── */
function FadeUp({
	children,
	delay = 0,
	className
}: {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 22 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
			{children}
		</motion.div>
	);
}

/* ── Page component ── */
const ServicePage: NextPage<{ service: ServiceData }> = ({ service }) => {
	const Icon = iconMap[service.slug] ?? Server;

	return (
		<>
			<SEO
				title={`${service.tab} — Kairos`}
				description={service.description}
				path={`/services/${service.slug}`}
				jsonLd={[
					serviceSchema(service.tab, service.description),
					breadcrumbSchema([
						{ name: "Home", path: "/" },
						{ name: "Services", path: "/#services" },
						{ name: service.tab, path: `/services/${service.slug}` }
					])
				]}
			/>

			<Header />

			<main style={{ background: "var(--bg)" }}>
				{/* ── Hero ── */}
				<section
					className="pt-32 pb-24 px-4 md:px-6 border-b relative overflow-hidden"
					style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
					{/* Subtle grid */}
					<svg
						className="absolute inset-0 w-full h-full pointer-events-none"
						style={{ opacity: 0.035 }}
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true">
						<defs>
							<pattern
								id="hero-grid"
								width="60"
								height="60"
								patternUnits="userSpaceOnUse">
								<path
									d="M 60 0 L 0 0 0 60"
									fill="none"
									stroke="currentColor"
									strokeWidth="0.5"
								/>
							</pattern>
						</defs>
						<rect
							width="100%"
							height="100%"
							fill="url(#hero-grid)"
							style={{ color: "var(--accent)" }}
						/>
					</svg>

					<div className="max-w-6xl mx-auto relative">
						<FadeUp delay={0.05}>
							<Link
								href="/#services"
								className="inline-flex items-center gap-2 text-xs font-medium mb-8 transition-colors duration-200"
								style={{ color: "var(--text-muted)" }}
								onMouseEnter={(e) =>
									((e.currentTarget as HTMLElement).style.color =
										"var(--accent)")
								}
								onMouseLeave={(e) =>
									((e.currentTarget as HTMLElement).style.color =
										"var(--text-muted)")
								}>
								<ArrowLeft size={13} />
								Back to Services
							</Link>
						</FadeUp>

						<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
							<div>
								<FadeUp delay={0.1}>
									<p
										className="text-[10px] uppercase tracking-[0.28em] mb-5 font-semibold"
										style={{ color: "var(--accent)" }}>
										{service.category}
									</p>
								</FadeUp>

								<FadeUp delay={0.18}>
									<h1
										className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.0] mb-6 max-w-2xl"
										style={{ color: "var(--text)" }}>
										{service.headline}
									</h1>
								</FadeUp>

								<FadeUp delay={0.26}>
									<p
										className="text-base md:text-lg leading-relaxed max-w-xl mb-10"
										style={{ color: "var(--text-dim)" }}>
										{service.description}
									</p>
								</FadeUp>

								<FadeUp delay={0.34}>
									<div className="flex flex-wrap items-center gap-4">
										<Link
											href="/#contact"
											className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-opacity duration-200 hover:opacity-85"
											style={{
												background: "var(--accent)",
												color: "var(--bg)"
											}}>
											Book a consultation
											<ArrowRight size={14} />
										</Link>
										<a
											href="mailto:hello@kaistrum.com"
											className="text-sm transition-colors duration-200"
											style={{ color: "var(--text-muted)" }}
											onMouseEnter={(e) =>
												((e.currentTarget as HTMLElement).style.color =
													"var(--accent)")
											}
											onMouseLeave={(e) =>
												((e.currentTarget as HTMLElement).style.color =
													"var(--text-muted)")
											}>
											hello@kaistrum.com
										</a>
									</div>
								</FadeUp>
							</div>

							{/* Icon badge */}
							<FadeUp delay={0.2} className="hidden lg:block">
								<div
									className="w-20 h-20 flex items-center justify-center border mt-2"
									style={{
										background: "var(--accent-faint)",
										borderColor: "var(--border)"
									}}>
									<Icon size={36} style={{ color: "var(--accent)" }} />
								</div>
							</FadeUp>
						</div>
					</div>
				</section>

				{/* ── Overview ── */}
				<section
					className="py-20 md:py-28 px-4 md:px-6"
					style={{ background: "var(--bg)" }}>
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-14 lg:gap-20 items-start">
							{/* Text */}
							<div>
								<FadeUp>
									<p
										className="text-[10px] uppercase tracking-[0.24em] mb-5 font-semibold"
										style={{ color: "var(--accent)" }}>
										Overview
									</p>
									<h2
										className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] mb-6"
										style={{ color: "var(--text)" }}>
										{service.overview.title}
									</h2>
									<p
										className="text-sm md:text-base leading-[1.75] mb-10"
										style={{ color: "var(--text-dim)" }}>
										{service.overview.body}
									</p>
								</FadeUp>

								<FadeUp delay={0.1}>
									<ul className="flex flex-col gap-3">
										{service.overview.points.map((pt) => (
											<li
												key={pt}
												className="flex items-start gap-3 text-sm"
												style={{ color: "var(--text-dim)" }}>
												<Check
													size={15}
													className="shrink-0 mt-0.5"
													style={{ color: "var(--accent)" }}
												/>
												{pt}
											</li>
										))}
									</ul>
								</FadeUp>
							</div>

							{/* Image placeholder */}
							<FadeUp delay={0.15} className="lg:sticky lg:top-24">
								<ImagePlaceholder label={service.overview.placeholder} />
							</FadeUp>
						</div>
					</div>
				</section>

				{/* ── Process ── */}
				<section
					className="py-20 md:py-28 px-4 md:px-6 border-y"
					style={{
						background: "var(--bg-surface)",
						borderColor: "var(--border)"
					}}>
					<div className="max-w-6xl mx-auto">
						<FadeUp>
							<p
								className="text-[10px] uppercase tracking-[0.24em] mb-5 font-semibold"
								style={{ color: "var(--accent)" }}>
								Our Process
							</p>
							<h2
								className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] mb-14 max-w-xl"
								style={{ color: "var(--text)" }}>
								How we deliver it.
							</h2>
						</FadeUp>

						<div className="grid grid-cols-1 md:grid-cols-5 gap-0">
							{service.process.map((step, i) => (
								<FadeUp key={step.step} delay={i * 0.08}>
									<div
										className="p-6 border-l border-b md:border-b-0 md:border-r md:border-l-0 first:border-l"
										style={{ borderColor: "var(--border)" }}>
										<p
											className="text-[10px] font-semibold tracking-[0.2em] mb-3"
											style={{ color: "var(--accent)" }}>
											{String(step.step).padStart(2, "0")}
										</p>
										<h3
											className="font-semibold text-sm mb-2"
											style={{ color: "var(--text)" }}>
											{step.title}
										</h3>
										<p
											className="text-xs leading-[1.65]"
											style={{ color: "var(--text-muted)" }}>
											{step.description}
										</p>
									</div>
								</FadeUp>
							))}
						</div>
					</div>
				</section>

				{/* ── Capabilities ── */}
				{/* <section className="py-20 md:py-28 px-4 md:px-6" style={{ background: "var(--bg)" }}>
          <div className="max-w-6xl mx-auto">
            <FadeUp>
              <p
                className="text-[10px] uppercase tracking-[0.24em] mb-5 font-semibold"
                style={{ color: "var(--accent)" }}>
                Capabilities
              </p>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] mb-14 max-w-xl"
                style={{ color: "var(--text)" }}>
                What we bring to the engagement.
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
              {service.capabilities.map((cap, i) => (
                <FadeUp key={cap.title} delay={i * 0.07}>
                  <div
                    className="p-6 border-b border-r"
                    style={{ borderColor: "var(--border)" }}>
                    <h3
                      className="font-semibold text-sm mb-2"
                      style={{ color: "var(--text)" }}>
                      {cap.title}
                    </h3>
                    <p
                      className="text-xs leading-[1.65]"
                      style={{ color: "var(--text-muted)" }}>
                      {cap.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section> */}

				{/* ── Second visual section ── */}
				<section className="py-20 md:py-28 px-4 md:px-6">
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-14 lg:gap-20 items-start">
							{/* Image placeholder */}
							<FadeUp className="lg:sticky lg:top-24">
								<ImagePlaceholder label={service.secondSection.placeholder} />
							</FadeUp>

							{/* Text */}
							<div>
								<FadeUp delay={0.1}>
									<h2
										className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.08] mb-6"
										style={{ color: "var(--text)" }}>
										{service.secondSection.title}
									</h2>
									<p
										className="text-sm md:text-base leading-[1.75] mb-10"
										style={{ color: "var(--text-dim)" }}>
										{service.secondSection.body}
									</p>
								</FadeUp>

								<FadeUp delay={0.18}>
									<ul className="flex flex-col gap-3">
										{service.secondSection.points.map((pt) => (
											<li
												key={pt}
												className="flex items-start gap-3 text-sm"
												style={{ color: "var(--text-dim)" }}>
												<Check
													size={15}
													className="shrink-0 mt-0.5"
													style={{ color: "var(--accent)" }}
												/>
												{pt}
											</li>
										))}
									</ul>
								</FadeUp>
							</div>
						</div>
					</div>
				</section>

				{/* ── CTA ── */}
				<section
					className="py-20 md:py-28 px-4 md:px-6"
					style={{ background: "var(--bg)" }}>
					<div className="max-w-3xl mx-auto text-center">
						<FadeUp>
							<p
								className="text-[10px] uppercase tracking-[0.24em] mb-5 font-semibold"
								style={{ color: "var(--accent)" }}>
								Get started
							</p>
							<h2
								className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[0.95] mb-5"
								style={{ color: "var(--text)" }}>
								Ready to talk{" "}
								<em
									style={{
										fontFamily: "'Instrument Serif', serif",
										fontWeight: 300,
										color: "var(--accent-dim)"
									}}>
									{service.tab.toLowerCase()}
								</em>
								?
							</h2>
							<p
								className="text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed"
								style={{ color: "var(--text-muted)" }}>
								Tell us about your organisation and requirements. We will
								respond within one business day.
							</p>

							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Link
									href="/#contact"
									className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-85"
									style={{ background: "var(--accent)", color: "var(--bg)" }}>
									Book a consultation
									<ArrowRight size={14} />
								</Link>
								<Link
									href="/#services"
									className="text-sm transition-colors duration-200"
									style={{ color: "var(--text-muted)" }}
									onMouseEnter={(e) =>
										((e.currentTarget as HTMLElement).style.color =
											"var(--text)")
									}
									onMouseLeave={(e) =>
										((e.currentTarget as HTMLElement).style.color =
											"var(--text-muted)")
									}>
									View all services
								</Link>
							</div>
						</FadeUp>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: services.map((s) => ({ params: { slug: s.slug } })),
	fallback: false
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const service = services.find((s) => s.slug === params?.slug) ?? null;
	if (!service) return { notFound: true };
	return { props: { service } };
};

export default ServicePage;
