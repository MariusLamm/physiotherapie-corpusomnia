import { Navbar } from "@/components/navigation/navbar";
import { MobileCTA } from "@/components/navigation/mobile-cta";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { OpeningHours } from "@/components/sections/opening-hours";
import { Expertise } from "@/components/sections/expertise";
import { Location } from "@/components/sections/location";
import { Contact } from "@/components/sections/contact";
import { Team } from "@/components/sections/team";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 md:pb-0">
        <Hero />
        <Benefits />
        <OpeningHours />
        <Expertise />
        <Location />
        <Contact />
        <Team />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
