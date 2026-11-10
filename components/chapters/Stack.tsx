import { ChapterHeading } from "@/components/journey/ChapterHeading";
import { ChapterSection } from "@/components/journey/ChapterSection";
import { TechTile } from "@/components/TechTile";
import { languages, stackLayers } from "@/consts/skills";

export function Stack() {
  return (
    <ChapterSection id="stack">
      <ChapterHeading id="stack" />

      <div className="mb-6 rounded-xl border bg-card p-6 md:p-8">
        <h3 className="font-mono text-highlight text-sm">Linguagens</h3>
        <p className="mt-1 mb-6 text-muted-foreground text-sm">
          A base de tudo que escrevo.
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {languages.map(skill => (
            <TechTile key={skill.name} name={skill.name}>
              <skill.icon
                aria-hidden="true"
                className="size-10"
                style={{ color: skill.color }}
              />
            </TechTile>
          ))}
        </ul>
      </div>

      <ol className="space-y-6">
        {stackLayers.map(layer => (
          <li
            key={layer.title}
            className="grid gap-6 rounded-xl border bg-card p-6 md:grid-cols-[14rem_1fr] md:p-8"
          >
            <div>
              <p className="font-mono text-sm text-subtle">{layer.world}</p>
              <h3 className="font-display font-semibold text-2xl">
                {layer.title}
              </h3>
              <p className="mt-1 text-muted-foreground text-sm">
                {layer.description}
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {layer.skills.map(skill => (
                <TechTile key={skill.name} name={skill.name}>
                  <skill.icon
                    aria-hidden="true"
                    className="size-10"
                    style={{ color: skill.color }}
                  />
                </TechTile>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </ChapterSection>
  );
}
