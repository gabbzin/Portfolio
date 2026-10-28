# Portfólio — Gabriel Pimentel

Landing page pessoal de Gabriel Pimentel, desenvolvedor Full-Stack em Brasília. Apresenta projetos (com estudo de caso), stack, sobre e um formulário de contato que envia e-mail.


## Stack

- Next.js 16 (App Router) e React 19
- Tailwind CSS 4 e shadcn/ui
- framer-motion e next-themes
- react-hook-form e zod
- Resend (envio de e-mail)
- Biome (lint e formatação)

## Como rodar

```bash
pnpm install
cp .env.example .env.local   # defina RESEND_API_KEY
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

| Comando      | O que faz                   |
| ------------ | --------------------------- |
| `pnpm dev`   | Servidor de desenvolvimento |
| `pnpm build` | Build de produção           |
| `pnpm lint`  | Lint e formatação (Biome)   |

## Estrutura

- `app/`: rotas, layout e server action de e-mail
- `components/main/`: seções da landing
- `consts/`: dados de projetos, skills e navegação
