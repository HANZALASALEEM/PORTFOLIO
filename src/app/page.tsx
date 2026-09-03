import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { ExperienceSection } from "@/sections/experience";
import { Products } from "@/sections/products";
import { Projects } from "@/sections/projects";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ExperienceSection />
      <Products />
      <Projects />
      <Contact />
    </>
  );
}
