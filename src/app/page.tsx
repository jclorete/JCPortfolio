import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import LongFormVideos from "@/components/LongFormVideos";
import Work from "@/components/Work";
import Services from "@/components/Services";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <LongFormVideos />
        <Work />
        <Services />
        <ExperienceTimeline />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
