"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { sendEmailAction } from "@/app/actions/send-email";
import { cn } from "@/lib/utils";
import InputAnimation from "../InputAnimation";
import { Button } from "../ui/button";

const MediaSocials = [
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

  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<dataForm>({
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
    <section id="contact" className="relative bg-secondary/30 px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
          Vamos nos <span className="text-primary">conectar</span>
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Tem um projeto em mente ou quer colaborar? Sinta-se à vontade para
          entrar em contato. Estou sempre aberto a discutir novas oportunidades.
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h3 className="mb-6 font-semibold text-2xl">
              Informações de contato
            </h3>

            <div className="justify-center space-y-6">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:dev.gabrielpimentell@gmail.com"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    dev.gabrielpimentell@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium">Telefone</h4>
                  <a
                    href="tel:+5561991284291"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    +55 (61) 99128-4291
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <MapPin className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium">Localização</h4>
                  <span className="text-muted-foreground transition-colors hover:text-primary">
                    Brasília - DF - Brasil
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="mb-4 font-medium"> Conecte-se comigo</h4>
              <div className="flex justify-center space-x-4">
                {MediaSocials.map(media => (
                  <Link
                    key={media.name}
                    href={media.href}
                    target="_blank"
                    rel="noopener"
                  >
                    <media.icon />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-card p-8 shadow-xs">
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
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button flex w-full cursor-pointer items-center justify-center gap-2",
                )}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
