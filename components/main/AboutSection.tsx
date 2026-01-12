import { Briefcase, Code, File, PointerIcon, User } from "lucide-react";

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
            <div className="gradient-border card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    {" "}
                    Desenvolvimento Web
                  </h4>
                  <p className="text-muted-foreground">
                    Criando sites responsivos e aplicações web com frameworks
                    modernos.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Design de UI/UX</h4>
                  <p className="text-muted-foreground">
                    Design de interfaces de usuário intuitivas e experiências
                    incríveis.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Desenvolvimento Back end
                  </h4>
                  <p className="text-muted-foreground">
                    Construindo APIs robustas e integrando bancos de dados para
                    aplicações escaláveis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
