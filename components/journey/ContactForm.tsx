"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { sendEmailAction } from "@/app/actions/send-email";
import InputAnimation from "@/components/InputAnimation";
import { Button } from "@/components/ui/button";

const dataForm = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.email("Insira um email válido").nonempty("O email é obrigatório"),
  message: z.string().nonempty("A mensagem é obrigatória"),
});

type dataForm = z.infer<typeof dataForm>;

export function ContactForm() {
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
          <InputAnimation label={"Seu email"} type={"email"} {...field} />
        )}
      />
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <InputAnimation label={"Sua mensagem"} type={"text"} {...field} />
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
  );
}
