import { AboutSection } from "@/components/main/AboutSection";
import { ContactSection } from "@/components/main/ContactSection";
import { ExperienceSection } from "@/components/main/ExperienceSection";
import { HeroSection } from "@/components/main/HeroSection";
import { ProjectsSection } from "@/components/main/ProjectsSection";
import { SkillsSection } from "@/components/main/SkillsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
