import type { NextPage } from "next";
import Header from "@/components/Header";
import SEO, { orgSchema, websiteSchema } from "@/components/SEO";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Industries from "@/components/Industries";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Home: NextPage = () => {
	return (
		<>
			<SEO
				title="Kaistrum — Geospatial Solutions and Services"
				description="Kaistrum delivers enterprise GIS deployments, spatial data migration, custom GIS development, and system integration for governments, utilities, and NGOs across Africa and beyond."
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
				<Testimonials />
				<Contact />
				<Footer />
			</main>
		</>
	);
};

export default Home;
