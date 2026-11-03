import type { NextPage } from "next";
import Header from "@/components/Header";
import SEO, { orgSchema, websiteSchema } from "@/components/SEO";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Industries from "@/components/Industries";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Home: NextPage = () => {
	return (
		<>
			<SEO
				title="Kairos Spatial Solutions — Geospatial Solutions and Services"
				description="Kairos Spatial Solutions delivers enterprise GIS deployments, spatial data migration, custom GIS development, and system integration for governments, utilities, and NGOs across Africa and beyond."
				path="/"
				jsonLd={[orgSchema(), websiteSchema()]}
			/>

			<main>
				<Header />
				<Hero />
				<About />
				<Features />
				<Industries />
				<CaseStudies />
				<Contact />
				<Footer />
			</main>
		</>
	);
};

export default Home;
