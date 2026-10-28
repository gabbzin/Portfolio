import { GraduationCap, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const facts = [
  { icon: GraduationCap, text: "Estudante no UNICEPLAC" },
  { icon: MapPin, text: "Brasília, Brasil" },
];

export function AboutSection() {
  return (
    <section id="sobre" className="bg-background py-24">
      <div className="container">
        <SectionHeading label="// sobre" title="Sobre mim" />

        <div className="grid items-start gap-12 md:grid-cols-2">
          <Reveal className="space-y-4 text-muted-foreground">
            <p>
              Engenheiro de software full stack, focado em resolver problemas
              reais com software. Trabalho do front-end e do desenho de APIs à
              modelagem de banco, processamento assíncrono e infraestrutura.
            </p>
            <p>
              No estágio, desenvolvo soluções que automatizam rotinas contábeis,
              como download de notas fiscais, processamento de dados fiscais e
              geração de relatórios, hoje reunidas em uma plataforma interna com
              Next.js, NestJS, PostgreSQL, Redis, BullMQ e Docker.
            </p>
            <p>
              Fora do trabalho, construo produtos que vão de SaaS a sistemas de
              saúde. Me interesso por arquitetura de software, backend e
              sistemas fáceis de manter, com responsabilidades bem separadas.
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
