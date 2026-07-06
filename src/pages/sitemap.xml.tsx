import type { GetServerSideProps } from "next";
import cases from "@/data/cases";

const BASE_URL = "https://kaistrum.com";

const staticPages = [
	{ path: "/", priority: "1.0", changefreq: "weekly" },
	{ path: "/about", priority: "0.8", changefreq: "monthly" },
	{ path: "/careers", priority: "0.6", changefreq: "monthly" },
	{ path: "/case-studies", priority: "0.9", changefreq: "weekly" }
];

const serviceslugs = [
	"infrastructure-deployment",
	"data-migration",
	"custom-development",
	"system-integration",
	"training",
	"support"
];

const industrySlugs = [
	"government-defense",
	"utilities-infrastructure",
	"telecoms-broadband",
	"transportation-logistics",
	"mining-natural-resources",
	"agriculture",
	"ngos-nonprofits",
	"smart-cities",
	"environmental",
	"disaster-response"
];

function generateSitemap(): string {
	const today = new Date().toISOString().split("T")[0];

	const urls = [
		...staticPages.map(
			(p) => `
  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
		),
		...serviceslugs.map(
			(slug) => `
  <url>
    <loc>${BASE_URL}/services/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
		),
		...industrySlugs.map(
			(slug) => `
  <url>
    <loc>${BASE_URL}/industries/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
		),
		...cases.map(
			(c) => `
  <url>
    <loc>${BASE_URL}/case-studies/${c.slug}</loc>
    <lastmod>${c.year}-01-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>`
		)
	];

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	res.setHeader("Content-Type", "text/xml");
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=86400, stale-while-revalidate"
	);
	res.write(generateSitemap());
	res.end();
	return { props: {} };
};

export default function Sitemap() {
	return null;
}
