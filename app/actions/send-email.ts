"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email("Insira um email válido"),
  message: z.string().min(1, "A mensagem é obrigatória"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export async function sendEmailAction(data: ContactFormData) {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Dados inválidos" };
  }

  try {
    const { name, email, message } = result.data;

    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",

      to: ["dev.gabrielpimentell@gmail.com"],

      replyTo: email,

      subject: `Nova mensagem de ${name} pelo portfólio`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #333;">
          <h1>Nova mensagem do Portfólio</h1>
          <p><strong>De:</strong> ${name} (${email})</p>
          <hr />
          <p><strong>Mensagem:</strong></p>
          <p style="background-color: #f4f4f4; padding: 12px; border-radius: 4px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Erro Resend:", error);
      return { success: false, error: "Erro ao enviar email" };
    }

    return { success: true, data: emailData };
  } catch (err) {
    console.error("Erro Servidor:", err);
    return { success: false, error: "Erro interno no servidor" };
  }
}
