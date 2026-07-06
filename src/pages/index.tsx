import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/Header";
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
			<Head>
				<title>Kaistrum — Enterprise GIS & Spatial Intelligence Platform</title>
				<meta
					name="description"
					content="Enterprise GIS software for mapping, spatial analytics, data management, and field operations. Trusted by governments and organisations in 180+ countries."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#07090F" />
				<link rel="icon" href="/favicon.ico" />
				<meta
					property="og:title"
					content="Kaistrum — Enterprise GIS & Spatial Intelligence"
				/>
				<meta
					property="og:description"
					content="Enterprise GIS platform for mapping, analytics, and field operations — at any scale, anywhere."
				/>
				<meta property="og:type" content="website" />
			</Head>

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
