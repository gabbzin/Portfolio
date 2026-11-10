# Portfólio — Gabriel Pimentel

Landing page pessoal de Gabriel Pimentel, desenvolvedor Full-Stack em Brasília. A home é uma viagem em sete capítulos ("A Volta ao Mundo"), da partida em Brasília ao contato, com estudo de caso por projeto e um formulário que envia e-mail.


## Stack

- Next.js 16 (App Router) e React 19
- Tailwind CSS 4 e shadcn/ui
- GSAP (ScrollTrigger) e Lenis para scroll e animação
- three e React Three Fiber para a cena 3D
- zustand (progresso do scroll lido pela cena) e next-themes
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

## Como a home funciona

Uma cena 3D fica fixa atrás do conteúdo e o scroll é a única fonte de progresso. A página tem três trechos: a partida (hero), a viagem (scroll fixado em atos, cada um com seus passos) e a chegada (contato). Cada trecho escreve seu progresso em `lib/journey-store.ts`; o diretor da cena lê esse valor a cada quadro, percorre a trilha de poses (`scene/poses.ts`) e todos os elementos (globo, rota, marcadores, porto) leem a pose corrente.

Há uma versão estática com o mesmo conteúdo em seções normais, usada no servidor, sem JavaScript, com `prefers-reduced-motion`, em aparelho fraco e sem WebGL acelerado. Para forçar: `?modo=3d` ou `?modo=estatico`. O botão "Modo recrutador" do cabeçalho liga essa mesma versão e guarda a escolha no navegador.

## Estrutura

- `app/`: rotas, layout e server action de e-mail
- `components/journey/`: partida, viagem fixada, versão estática, chegada e o provider (modo, Lenis, canvas)
- `components/journey/acts.tsx`: o texto de cada ato, um nó por passo
- `components/journey/scene/`: cena R3F: poses, diretor, globo, rota, marcadores e porto
- `consts/`: capítulos, plano da viagem (`voyage.ts`), projetos, primeiros passos, stack, experiência
- `scripts/generate-land-mask.mjs`: gera a máscara de continentes do globo
