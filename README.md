# Portfólio — Gabriel Pimentel

Landing page pessoal de Gabriel Pimentel, desenvolvedor Full-Stack em Brasília. A home é uma viagem em sete capítulos ("A Volta ao Mundo"), da partida em Brasília ao contato, com estudo de caso por projeto e um formulário que envia e-mail.


## Stack

- Next.js 16 (App Router) e React 19
- Tailwind CSS 4 e shadcn/ui
- GSAP (ScrollTrigger) e Lenis para scroll e animação
- three e React Three Fiber para a cena 3D
- zustand (progresso da viagem) e next-themes
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
| `pnpm typecheck` | Checagem de tipos (tsc) |

## Estrutura

- `app/`: rotas, layout e server action de e-mail
- `components/chapters/`: os sete capítulos da viagem
- `components/journey/`: scroll suave, progresso por capítulo e o Canvas 3D
- `lib/journey-store.ts`: estado da viagem, escrito pelo ScrollTrigger e lido pela cena
- `consts/`: capítulos, projetos, primeiros passos, stack, experiência e navegação
