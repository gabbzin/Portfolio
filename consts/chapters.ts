export interface Chapter {
  /** Âncora da seção (usada no menu e em links externos). */
  id: string;
  /** Nome da parada na viagem. */
  stop: string;
  /** Título do conteúdo. */
  title: string;
  /** Frase de abertura do capítulo. Rascunho: reescreva na sua voz. */
  lede: string;
}

export const chapters = [
  {
    id: "partida",
    stop: "Partida",
    title: "Brasília",
    lede: "Construo aplicações web completas com React, Next.js e NestJS, do banco de dados à interface.",
  },
  {
    id: "primeiros-passos",
    stop: "Bússola",
    title: "Primeiros passos",
    lede: "Tudo começou com um relógio, uma calculadora e curiosidade demais.",
  },
  {
    id: "stack",
    stop: "Continente TypeScript",
    title: "Stack",
    lede: "Meu território é TypeScript, de ponta a ponta.",
  },
  {
    id: "projetos",
    stop: "Cidades",
    title: "Projetos",
    lede: "Cada projeto é uma cidade que eu precisei planejar, construir e manter.",
  },
  {
    id: "experiencia",
    stop: "Porto",
    title: "Experiência",
    lede: "Em produção, o trabalho pesado sai da aplicação principal e vai para workers dedicados.",
  },
  {
    id: "sobre",
    stop: "Travessia",
    title: "Formação e arquitetura",
    lede: "No meio do caminho, o que aprendo é arquitetura: decisões que sustentam o sistema depois do primeiro deploy.",
  },
  {
    id: "contato",
    stop: "Chegada",
    title: "Contato",
    lede: "Próxima parada: o seu time.",
  },
] as const satisfies readonly Chapter[];

export type ChapterId = (typeof chapters)[number]["id"];

export function getChapter(id: ChapterId) {
  const index = chapters.findIndex(chapter => chapter.id === id);
  return { ...chapters[index], index };
}
