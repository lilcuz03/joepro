import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { Projects } from "@/components/home/Projects";
import { Contact } from "@/components/home/Contact";
import { Reviews } from "@/components/home/Reviews";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Services />
      <About />
      <Projects />
      <Reviews />
      <Faq />
      <Contact />
    </main>
  );
}
