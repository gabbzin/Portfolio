"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";
import { CodeCard } from "@/components/CodeCard";
import { DotGridBackground } from "@/components/DotGridBackground";
import { TechBackdrop } from "@/components/TechBackdrop";
import { TypingText } from "@/components/TypingText";
import { Button } from "@/components/ui/button";
import { easing, fadeUp, stagger } from "@/lib/motion";

const typingWords = [
  "React",
  "Next.js",
  "NestJS",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "Tailwind CSS",
];

const socials = [
  { name: "GitHub", icon: Github, href: "https://github.com/gabbzin" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/gabriel-pimentel-zxn111/",
  },
];

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-16 pb-32"
    >
      <DotGridBackground />
      <TechBackdrop />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-120 rounded-full bg-blue-600/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 size-120 rounded-full bg-blue-500/20 blur-3xl"
      />

      <div className="container relative z-10 grid items-center gap-12 md:grid-cols-2">
        <motion.div
          className="space-y-6"
          variants={stagger}
          initial={reduceMotion ? "visible" : "hidden"}
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            className="font-extrabold text-5xl text-gradient tracking-tight md:text-6xl lg:text-7xl"
          >
            Gabriel Pimentel
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-bold text-2xl md:text-3xl"
          >
            Desenvolvedor <span className="text-highlight">Full-Stack</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-lg text-lg text-muted-foreground"
          >
            Construo aplicações web completas com React, Next.js e NestJS, do
            banco de dados à interface.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#projetos">Ver projetos</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/cv/curriculo.pdf" download="curriculo.pdf">
                <Download /> Baixar CV
              </a>
            </Button>
            {socials.map(social => (
              <Button
                key={social.name}
                asChild
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="size-5" />
                </a>
              </Button>
            ))}
          </motion.div>
        </motion.div>

        {/* Espaço reservado para um visual 2D/3D numa fase futura */}
        <motion.div
          className="hidden justify-end md:flex"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easing, delay: 0.3 }}
        >
          <CodeCard />
        </motion.div>
      </div>

      <div className="container absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <TypingText prefix="Construindo com " words={typingWords} />
      </div>
    </section>
  );
}
