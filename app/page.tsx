import Header from "@/components/Header";
import { AboutSection } from "@/components/main/AboutSection";
import { ContactSection } from "@/components/main/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/main/ProjectsSection";
import { SkillsSection } from "@/components/main/SkillsSection";
import { StarBackground } from "@/components/StarBackground";
import { Separator } from "@/components/ui/separator";

const mainComponents = [
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-inter text-foreground">
      <Header />
      <StarBackground />
      <main>
        {mainComponents.map((Component, index) => (
          <section
            key={`section-${Component.name}-${index + Component.length.valueOf()}`}
          >
            <Component />
            <Separator />
          </section>
        ))}
      </main>
    </div>
  );
}
