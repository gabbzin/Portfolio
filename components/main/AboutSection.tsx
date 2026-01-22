import {
  BriefcaseIcon,
  CodeIcon,
  File,
  FileIcon,
  type LucideIcon,
  PointerIcon,
} from "lucide-react";

interface CardHoverProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

const CardHover = ({ title, description, icon: Icon }: CardHoverProps) => {
  return (
    <div className="gradient-border card-hover p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          {Icon && <Icon className="h-6 w-6 text-primary" />}
        </div>

        <div className="text-left">
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-24">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-center font-bold text-3xl md:text-4xl">
          Sobre <span className="text-primary"> Mim</span>
        </h2>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="font-semibold text-2xl">
              Estudante de Engenharia de Software & Desenvolvedor Full-Stack
            </h3>

            <p className="text-muted-foreground">
              Sou estudante de Engenharia de Software e desenvolvedor web, com
              foco na criação de aplicações modernas, responsivas e bem
              estruturadas, utilizando tecnologias atuais do ecossistema
              JavaScript. Tenho experiência prática com React, Next,
              desenvolvimento de APIs, integração com bancos de dados e
              versionamento com Git.
            </p>
            <p className="text-muted-foreground">
              Sou apaixonado por resolver problemas de forma elegante, escrever
              código limpo e entender a fundo como as aplicações funcionam.
              Estou em constante aprendizado, buscando evoluir como
              desenvolvedor full stack, acompanhar as boas práticas do mercado e
              construir soluções eficientes, escaláveis e bem pensadas.
            </p>

            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <a
                href="#contact"
                className="cosmic-button flex items-center gap-2 py-3"
              >
                {" "}
                <PointerIcon /> Vamos nos conectar
              </a>

              <a
                href="/cv/curriculo.pdf"
                download={"curriculo.pdf"}
                className="flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-primary transition-colors duration-300 hover:bg-primary/10"
              >
                <File />
                Baixar CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <CardHover
              title="Desenvolvimento Front-end"
              description="Construindo interfaces de usuário responsivas e interativas com tecnologias modernas."
              icon={CodeIcon}
            />
            <CardHover
              title="Desenvolvimento com Git/GitHub"
              description="Gerenciamento de código-fonte e colaboração eficiente em projetos de software."
              icon={FileIcon}
            />
            <CardHover
              title="Desenvolvimento Back-end"
              description="Construindo APIs robustas e integrando bancos de dados para aplicações escaláveis."
              icon={BriefcaseIcon}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
