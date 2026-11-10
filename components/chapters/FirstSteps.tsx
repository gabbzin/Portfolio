import { Github } from "lucide-react";
import { ChapterHeading } from "@/components/journey/ChapterHeading";
import { ChapterSection } from "@/components/journey/ChapterSection";
import { Badge } from "@/components/ui/badge";
import { firstSteps } from "@/consts/first-steps";

export function FirstSteps() {
  return (
    <ChapterSection id="primeiros-passos">
      <ChapterHeading id="primeiros-passos" />

      <ul className="grid gap-6 md:grid-cols-3">
        {firstSteps.map(step => (
          <li key={step.name} className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold text-xl">{step.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {step.tags.map(tag => (
                <li key={tag}>
                  <Badge variant="tech">{tag}</Badge>
                </li>
              ))}
            </ul>
            {step.repo && (
              <a
                href={step.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                <Github size={16} /> GitHub
              </a>
            )}
          </li>
        ))}
      </ul>
    </ChapterSection>
  );
}
