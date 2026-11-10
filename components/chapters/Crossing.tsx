import { GraduationCap, MapPin } from "lucide-react";
import { ChapterHeading } from "@/components/journey/ChapterHeading";
import { ChapterSection } from "@/components/journey/ChapterSection";

const facts = [
  {
    icon: GraduationCap,
    text: "Engenharia de Software, 6º semestre (UNICEPLAC)",
  },
  { icon: MapPin, text: "Brasília, Brasil" },
];

export function Crossing() {
  return (
    <ChapterSection id="sobre">
      <ChapterHeading id="sobre" />

      <div className="grid items-start gap-12 md:grid-cols-2">
        <div className="space-y-4 text-muted-foreground">
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
            saúde. Me interesso por arquitetura de software, backend e sistemas
            fáceis de manter, com responsabilidades bem separadas.
          </p>
        </div>

        <ul className="space-y-4 rounded-xl border bg-card p-6">
          {facts.map(fact => (
            <li key={fact.text} className="flex items-center gap-4">
              <span className="rounded-full bg-code p-3">
                <fact.icon
                  aria-hidden="true"
                  className="size-5 text-highlight"
                />
              </span>
              <span className="font-medium">{fact.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </ChapterSection>
  );
}
