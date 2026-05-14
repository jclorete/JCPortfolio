import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import LongFormVideos from "@/components/LongFormVideos";
import ShortFormVideos from "@/components/ShortFormVideos";
import Work from "@/components/Work";
import Services from "@/components/Services";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { GlowCard } from "@/components/ui/spotlight-card";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section className="py-20">
          <div className="max-w-layout mx-auto px-8">
            <div className="mb-12 max-w-2xl space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-white/40">New interaction</p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Interactive spotlight cards</h2>
              <p className="text-white/70">This portfolio now includes a pointer-follow glow effect using the new SpotlightCard component.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <GlowCard customSize width="100%" height={320} className="bg-white/5">
                <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
                  <p className="text-lg font-semibold text-white">Portfolio glow</p>
                  <p className="text-sm text-white/60">Move your cursor to see the animated spotlight follow it.</p>
                </div>
              </GlowCard>
              <GlowCard glowColor="purple" customSize width="100%" height={320} className="bg-white/5">
                <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
                  <p className="text-lg font-semibold text-white">Spotlight effect</p>
                  <p className="text-sm text-white/60">A second glowing card with a purple hue variant.</p>
                </div>
              </GlowCard>
            </div>
          </div>
        </section>
        <Stats />
        <About />
        <LongFormVideos />
        <ShortFormVideos />
        <Work />
        <Services />
        <ExperienceTimeline />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
