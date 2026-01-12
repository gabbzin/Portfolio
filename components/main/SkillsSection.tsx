/** biome-ignore-all lint/suspicious/noArrayIndexKey: <Silencio> */
/** biome-ignore-all lint/performance/noImgElement: <Image do Next não funciona> */
"use client";

import { useEffect, useState } from "react";
import { skills } from "@/consts/skiils";
import { cn } from "@/lib/utils";
import { SkillIcon } from "../SkillIcon";
import { Button } from "../ui/button";

const categories = ["all", "frontend", "backend", "tools"];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    skill => activeCategory === "all" || skill.category === activeCategory,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    });

    const skillElements = document.querySelectorAll(".card-hover");
    skillElements.forEach(element => {
      observer.observe(element);
    });

    observer.disconnect();
  });

  return (
    <section id="skills" className="relative bg-secondary/30 px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-center font-bold text-3xl md:text-4xl">
          Minhas <span className="text-primary"> Skills</span>
        </h2>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category, key) => (
            <Button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-5 py-2 capitalize transition-colors duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bd-secondary bg-secondary/70 text-forefround",
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="card-hover rounded-lg bg-card p-6 shadow-xs"
            >
              <div className="mb-4 flex items-center gap-2 text-left">
                <SkillIcon icon={skill.icon} />
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                <div
                  className="h-2 origin-left animate-[grow_1.5s_ease-out] rounded-full bg-primary"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="mt-1 text-right">
                <span className="text-muted-foreground text-sm">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
