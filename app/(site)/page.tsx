import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Work from "@/components/sections/Work";
import ClientWork from "@/components/sections/ClientWork";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Credentials from "@/components/sections/Credentials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Work />
      <ClientWork />
      <Experience />
      <Skills />
      <Credentials />
      <Contact />
    </>
  );
}
