import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4"
    >
      <div className="container z-10 mx-auto max-w-4xl text-center">
        <div className="space-y-6">
          <h1 className="font-bold text-4xl tracking-tight md:text-6xl">
            <span className="animate-fade-in opacity-0"> Olá, eu sou </span>
            <span className="animate-fade-in-delay-1 text-primary opacity-0">
              Gabriel
            </span>
            <span className="ml-2 animate-fade-in-delay-2 text-gradient opacity-0">
              Pimentel
            </span>
          </h1>

          <p className="max-2-2xl mx-auto animate-fade-in-delay-3 text-lg text-muted-foreground opacity-0 md:text-xl">
            Crio experiências web estelares com tecnologias modernas.
            Especializando-me em desenvolvimento front-end, construo interfaces
            que são bonitas e funcionais.
          </p>

          <div className="animate-fade-in-delay-4 pt-4 opacity-0">
            <a href="#projects" className="cosmic-button">
              Ver meu trabalho
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform animate-bounce flex-col items-center">
        <span className="mb-2 text-muted-foreground text-sm"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
}
