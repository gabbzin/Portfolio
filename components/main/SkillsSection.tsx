import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TechTile } from "@/components/TechTile";
import { skillCategories } from "@/consts/skills";

export function SkillsSection() {
  return (
    <section id="stack" className="bg-surface py-24">
      <div className="container">
        <SectionHeading
          label="// stack"
          title="Tecnologias com que trabalho"
          description="O que uso no dia a dia, do banco de dados à interface."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Reveal
              key={category.title}
              delay={index * 0.08}
              className="rounded-xl border bg-card p-6 md:p-8"
            >
              <h3 className="font-mono text-highlight text-sm">
                {category.title}
              </h3>
              <p className="mt-1 mb-6 text-muted-foreground text-sm">
                {category.description}
              </p>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {category.skills.map(skill => (
                  <TechTile key={skill.name} name={skill.name}>
                    <skill.icon
                      aria-hidden="true"
                      className="size-10"
                      style={{ color: skill.color }}
                    />
                  </TechTile>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
