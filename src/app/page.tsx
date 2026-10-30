import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CustomSoftware } from "@/components/sections/CustomSoftware";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Team } from "@/components/sections/Team";
import { VetNet } from "@/components/sections/VetNet";
import { WhatWeDo } from "@/components/sections/WhatWeDo";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <WhatWeDo />
      <VetNet />
      <About />
      <CustomSoftware />
      <Team />
      <Contact />
      <Faq />
    </SiteShell>
  );
}
