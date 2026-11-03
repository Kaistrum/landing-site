import Head from "next/head";

export const BASE_URL = "https://kaistrum.com";

type JsonLdObject = Record<string, unknown>;

type Props = {
	title: string;
	description: string;
	path?: string;
	ogImage?: string;
	type?: "website" | "article";
	jsonLd?: JsonLdObject | JsonLdObject[];
	noIndex?: boolean;
};

export default function SEO({
	title,
	description,
	path = "",
	ogImage = "/logo.png",
	type = "website",
	jsonLd,
	noIndex = false
}: Props) {
	const fullTitle = title.includes("Kairos") ? title : `${title} — Kairos`;
	const canonical = `${BASE_URL}${path}`;
	const ogImageAbsolute = `${BASE_URL}${ogImage}`;

	return (
		<Head>
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={canonical} />
			{noIndex && <meta name="robots" content="noindex, nofollow" />}

			{/* Open Graph */}
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content={type} />
			<meta property="og:url" content={canonical} />
			<meta property="og:image" content={ogImageAbsolute} />
			<meta property="og:site_name" content="Kairos Spatial Solutions" />
			<meta property="og:locale" content="en_GB" />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={ogImageAbsolute} />

			{/* JSON-LD */}
			{jsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(
							Array.isArray(jsonLd) ? jsonLd : [jsonLd]
						)
					}}
				/>
			)}
		</Head>
	);
}

/* ── Schema helpers ── */

export function orgSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Kairos Spatial Solutions",
		url: BASE_URL,
		logo: `${BASE_URL}/logo.png`,
		description:
			"Enterprise GIS deployments, spatial data migration, custom GIS development, and system integration for governments, utilities, and NGOs.",
		email: "hello@kaistrum.com",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Nairobi",
			addressCountry: "KE"
		}
	};
}

export function websiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Kairos Spatial Solutions",
		url: BASE_URL,
		potentialAction: {
			"@type": "SearchAction",
			target: `${BASE_URL}/case-studies?q={search_term_string}`,
			"query-input": "required name=search_term_string"
		}
	};
}

export function breadcrumbSchema(
	crumbs: { name: string; path: string }[]
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: crumbs.map((c, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: c.name,
			item: `${BASE_URL}${c.path}`
		}))
	};
}

export function serviceSchema(name: string, description: string) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name,
		description,
		provider: {
			"@type": "Organization",
			name: "Kairos Spatial Solutions",
			url: BASE_URL
		},
		areaServed: "Worldwide",
		serviceType: "GIS Professional Services"
	};
}

export function articleSchema(opts: {
	title: string;
	description: string;
	path: string;
	datePublished: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: opts.title,
		description: opts.description,
		url: `${BASE_URL}${opts.path}`,
		datePublished: opts.datePublished,
		publisher: {
			"@type": "Organization",
			name: "Kairos Spatial Solutions",
			logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` }
		}
	};
}
