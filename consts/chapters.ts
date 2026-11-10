export interface Chapter {
  /** Âncora da seção (usada no menu e em links externos). */
  id: string;
  /** Nome da parada na viagem. */
  stop: string;
  /** Título do conteúdo. */
  title: string;
  /** Frase de abertura do capítulo. Rascunho: reescreva na sua voz. */
  lede: string;
  /** Onde a parada fica no globo: [latitude, longitude] em graus. */
  coords: readonly [number, number];
}

const BRASILIA = [-15.79, -47.88] as const;

export const chapters = [
  {
    id: "partida",
    stop: "Partida",
    title: "Brasília",
    lede: "Construo aplicações web completas com React, Next.js e NestJS, do banco de dados à interface.",
    coords: BRASILIA,
  },
  {
    id: "primeiros-passos",
    stop: "Bússola",
    title: "Primeiros passos",
    lede: "Tudo começou com um relógio, uma calculadora e curiosidade demais.",
    // Fernando de Noronha: a ilha
    coords: [-3.85, -32.42],
  },
  {
    id: "stack",
    stop: "Continente TypeScript",
    title: "Stack",
    lede: "Meu território é TypeScript, de ponta a ponta.",
    // África: o continente
    coords: [6, 20],
  },
  {
    id: "projetos",
    stop: "Cidades",
    title: "Projetos",
    lede: "Cada projeto é uma cidade que eu precisei planejar, construir e manter.",
    // Ásia: as cidades
    coords: [24, 79],
  },
  {
    id: "experiencia",
    stop: "Porto",
    title: "Experiência",
    lede: "Em produção, o trabalho pesado sai da aplicação principal e vai para workers dedicados.",
    // Singapura: o porto
    coords: [1.29, 103.85],
  },
  {
    id: "sobre",
    stop: "Travessia",
    title: "Formação e arquitetura",
    lede: "No meio do caminho, o que aprendo é arquitetura: decisões que sustentam o sistema depois do primeiro deploy.",
    // Pacífico: mar aberto
    coords: [-12, -150],
  },
  {
    id: "contato",
    stop: "Chegada",
    title: "Contato",
    lede: "Próxima parada: o seu time.",
    coords: BRASILIA,
  },
] as const satisfies readonly Chapter[];

export type ChapterId = (typeof chapters)[number]["id"];

export function getChapter(id: ChapterId) {
  const index = chapters.findIndex(chapter => chapter.id === id);
  return { ...chapters[index], index };
}
