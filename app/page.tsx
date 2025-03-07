import Header from ".././components/global/Header";
import Footer from "@/components/global/Footer";
import { Hero } from "@/components/templates/Hero";
import Features from "@/components/templates/Features";
import UseCases from "@/components/templates/UseCases";
import Testimonials from "@/components/templates/Testimonials";
import FAQ from "@/components/templates/FAQ";
import React from "react";
import CTA from "@/components/templates/CTA";

export default function Home() {
  return (
    <React.Fragment>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"> */}
      <header>
        <Header />
      </header>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e4f5fe,transparent)]"></div>
      </div>

      <main>
        <Hero />
        <Features />
        <UseCases />
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
