"use client";

import { type ReactNode, useRef } from "react";
import { type ChapterId, getChapter } from "@/consts/chapters";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useJourneyStore } from "@/lib/journey-store";
import { cn } from "@/lib/utils";

interface ChapterSectionProps {
  id: ChapterId;
  className?: string;
  children: ReactNode;
}

export function ChapterSection({
  id,
  className,
  children,
}: ChapterSectionProps) {
  const section = useRef<HTMLElement>(null);
  const { index } = getChapter(id);

  useGSAP(
    () => {
      const { setActiveChapter, setChapterProgress } =
        useJourneyStore.getState();

      // O capítulo ativo é o que cruza o centro da tela; o progresso cobre
      // toda a passagem da seção pela viewport.
      ScrollTrigger.create({
        trigger: section.current,
        start: "top center",
        end: "bottom center",
        onToggle: self => self.isActive && setActiveChapter(index),
      });
      ScrollTrigger.create({
        trigger: section.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: self => setChapterProgress(index, self.progress),
      });
    },
    { scope: section, dependencies: [index] },
  );

  return (
    <section
      id={id}
      ref={section}
      aria-labelledby={`${id}-titulo`}
      className={cn("relative py-24 md:py-32", className)}
    >
      <div className="container">{children}</div>
    </section>
  );
}
