import { Mail, Phone } from "lucide-react";
import { ChapterHeading } from "@/components/journey/ChapterHeading";
import { ChapterSection } from "@/components/journey/ChapterSection";
import { Button } from "@/components/ui/button";
import { email, github, instagram, linkedin, phone } from "@/consts/socials";
import { ContactForm } from "./ContactForm";

const contactLinkClass =
  "inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground";

export function Arrival() {
  return (
    <ChapterSection id="contato">
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
                <Button key={social.name} asChild size="icon" variant="outline">
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

        <div className="rounded-xl border bg-card p-8">
          <h3 className="mb-6 font-semibold text-2xl">Envie uma mensagem</h3>
          <ContactForm />
        </div>
      </div>
    </ChapterSection>
  );
}
