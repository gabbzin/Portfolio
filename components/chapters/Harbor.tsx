import { ChapterHeading } from "@/components/journey/ChapterHeading";
import { ChapterSection } from "@/components/journey/ChapterSection";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/consts/experience";

export function Harbor() {
  return (
    <ChapterSection id="experiencia">
      <ChapterHeading id="experiencia" />

      <ol className="relative space-y-10 border-l pl-8">
        {experiences.map(experience => (
          <li key={experience.company} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[2.4rem] size-3 rounded-full border-2 border-highlight bg-background"
            />
            <div className="rounded-xl border bg-card p-6 md:p-8">
              <p className="font-mono text-highlight text-sm">
                {experience.period}
              </p>
              <h3 className="mt-2 font-semibold text-xl">
                {experience.role}
                <span className="text-muted-foreground">
                  {" "}
                  · {experience.company}
                </span>
              </h3>
              <p className="mt-3 text-muted-foreground">{experience.summary}</p>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground text-sm">
                {experience.highlights.map(highlight => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {experience.tags.map(tag => (
                  <li key={tag}>
                    <Badge variant="tech">{tag}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </ChapterSection>
  );
}
