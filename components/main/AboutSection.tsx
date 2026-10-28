import { GraduationCap, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const facts = [
  { icon: GraduationCap, text: "Estudante de Engenharia de Software" },
  { icon: MapPin, text: "Brasília, Brasil" },
];

export function AboutSection() {
  return (
    <section id="sobre" className="bg-surface py-24">
      <div className="container">
        <SectionHeading label="// sobre" title="Sobre mim" />

        <div className="grid items-start gap-12 md:grid-cols-2">
          <Reveal className="space-y-4 text-muted-foreground">
            <p>
              Construo aplicações web completas, do banco de dados à interface,
              com foco em código limpo e bem estruturado.
            </p>
            <p>
              Gosto de entender como cada camada funciona e de resolver
              problemas com soluções simples e escaláveis.
            </p>
            <p>
              Trabalho principalmente com TypeScript, React, Next.js e NestJS, e
              sigo aprendendo a cada projeto.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4 rounded-xl border bg-card p-6">
              {facts.map(fact => (
                <li key={fact.text} className="flex items-center gap-4">
                  <span className="rounded-full bg-code p-3">
                    <fact.icon className="size-5 text-highlight" />
                  </span>
                  <span className="font-medium">{fact.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
