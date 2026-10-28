"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Instagram, Linkedin, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { sendEmailAction } from "@/app/actions/send-email";
import InputAnimation from "../InputAnimation";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../ui/button";

const MediaSocials = [
  { name: "GitHub", icon: Github, href: "https://github.com/gabbzin" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/gabriel-pimentel-zxn111/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/gabb.pimentel/",
  },
];

const dataForm = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.email("Insira um email válido").nonempty("O email é obrigatório"),
  message: z.string().nonempty("A mensagem é obrigatória"),
});

type dataForm = z.infer<typeof dataForm>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, reset } = useForm<dataForm>({
    resolver: zodResolver(dataForm),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: dataForm) => {
    setIsSubmitting(true);

    const response = await sendEmailAction(data);

    if (response.success) {
      toast.success("Mensagem enviada!", {
        description: "Obrigado por entrar em contato. Responderemos em breve.",
      });

      console.log(response.data);
      reset();
    }
    if (!response.success) {
      toast.error("Erro ao enviar mensagem.");
      console.error(response.error);
    }

    setIsSubmitting(false);
  };
  return (
    <section id="contato" className="bg-background py-24">
      <div className="container">
        <SectionHeading
          label="// contato"
          title="Vamos conversar"
          description="Tem um projeto em mente ou quer colaborar? Envie uma mensagem."
        />

        <div className="grid gap-12 md:grid-cols-2">
          <Reveal className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-code p-3">
                  <Mail className="size-5 text-highlight" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a
                    href="mailto:dev.gabrielpimentell@gmail.com"
                    className="inline-flex min-h-11 items-center break-all text-muted-foreground transition-colors hover:text-foreground"
                  >
                    dev.gabrielpimentell@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-code p-3">
                  <Phone className="size-5 text-highlight" />
                </div>
                <div>
                  <h3 className="font-medium">Telefone</h3>
                  <a
                    href="tel:+5561991284291"
                    className="inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    +55 (61) 99128-4291
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Redes</h3>
              <div className="flex gap-2">
                {MediaSocials.map(media => (
                  <Button
                    key={media.name}
                    asChild
                    size="icon"
                    variant="outline"
                  >
                    <a
                      href={media.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={media.name}
                    >
                      <media.icon className="size-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-xl border bg-card p-8">
            <h3 className="mb-6 font-semibold text-2xl">Envie uma mensagem</h3>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputAnimation label={"Seu nome"} type={"text"} {...field} />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputAnimation
                    label={"Seu email"}
                    type={"email"}
                    {...field}
                  />
                )}
              />
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <InputAnimation
                    label={"Sua mensagem"}
                    type={"text"}
                    {...field}
                  />
                )}
              />

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full cursor-pointer"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                <Send size={16} />
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
