import React from "react";
import Navbar from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
// import UseCases from "@/components/sections/UseCases";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import ContentSection from "@/components/sections/Content";

export default function Home() {
  return (
    <React.Fragment>
      <header>
        <Navbar />
      </header>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e4f5fe,transparent)]"></div>
      </div>
      <main>
        <Hero />
        <Features />
        <ContentSection />
        {/* <UseCases /> */}
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}
