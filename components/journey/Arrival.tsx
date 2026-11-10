"use client";

import { Mail, Phone } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { email, github, instagram, linkedin, phone } from "@/consts/socials";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useJourneyStore } from "@/lib/journey-store";
import { ChapterHeading } from "./ChapterHeading";
import { ContactForm } from "./ContactForm";
import { useJourney } from "./Journey";

const contactLinkClass =
  "inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground";

/** Chegada: a rota fecha a volta em Brasília e o contato entra em cena. */
export function Arrival() {
  const { mode } = useJourney();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (mode !== "3d") return;

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom bottom",
        onUpdate: self => useJourneyStore.setState({ arrival: self.progress }),
      });
      return () => useJourneyStore.setState({ arrival: 0 });
    },
    { scope: root, dependencies: [mode] },
  );

  return (
    <section
      id="contato"
      ref={root}
      aria-labelledby="contato-titulo"
      // No modo 3D a seção é mais alta que o conteúdo, que fica na base: a
      // tela vazia do começo é o tempo de a câmera voltar a Brasília.
      className="relative in-data-[mode=3d]:flex in-data-[mode=3d]:min-h-[175svh] in-data-[mode=3d]:items-end py-20 md:py-28"
    >
      <div className="container">
        <ChapterHeading id="contato" />

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <p className="text-muted-foreground">
              Tem um projeto em mente ou quer colaborar? Envie uma mensagem.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-code p-3">
                  <Mail aria-hidden="true" className="size-5 text-highlight" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a
                    href={`mailto:${email}`}
                    className={`${contactLinkClass} break-all`}
                  >
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-code p-3">
                  <Phone aria-hidden="true" className="size-5 text-highlight" />
                </div>
                <div>
                  <h3 className="font-medium">Telefone</h3>
                  <a href={phone.href} className={contactLinkClass}>
                    {phone.label}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Redes</h3>
              <div className="flex gap-2">
                {[github, linkedin, instagram].map(social => (
                  <Button
                    key={social.name}
                    asChild
                    size="icon"
                    variant="outline"
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
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-card/75 p-8 shadow-2xl ring-1 ring-border backdrop-blur-md">
            <h3 className="mb-6 font-semibold text-2xl">Envie uma mensagem</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
