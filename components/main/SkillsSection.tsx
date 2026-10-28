import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/consts/skills";

export function SkillsSection() {
  return (
    <section id="stack" className="bg-background py-24">
      <div className="container">
        <SectionHeading
          label="// stack"
          title="Tecnologias com que trabalho"
          description="O que uso no dia a dia, agrupado por área."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.08}>
              <h3 className="mb-4 font-mono text-highlight text-sm">
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <li key={skill}>
                    <Badge variant="tech" className="text-sm">
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
