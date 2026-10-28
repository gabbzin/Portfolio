export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  image?: string;
  repo?: string;
  demo?: string;
  status: "concluido" | "em-desenvolvimento";
  caseStudy: {
    problem: string;
    decisions: string[];
    result: string;
    contribution?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "axon",
    name: "Axon",
    description:
      "SaaS multi-tenant de agendamento e gestão para barbearias, com painéis para administrador, barbeiro e cliente.",
    tags: [
      "TanStack Start",
      "React",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Docker",
    ],
    image: "/projects/axon.png",
    status: "em-desenvolvimento",
    caseStudy: {
      problem:
        "Barbearias com vários profissionais costumam controlar agenda e atendimentos de forma manual e descentralizada. O Axon unifica isso para administrador, barbeiro e cliente, com foco em uso pelo celular.",
      decisions: [
        "Backend em NestJS com isolamento de dados por barbearia: um guard resolve o tenant e um contexto assíncrono injeta o tenantId nos repositórios.",
        "Módulos de agendamento e avaliação organizados com DDD (commands, queries e domínio separados), por concentrarem as regras de negócio mais complexas.",
        "Agenda baseada em disponibilidade semanal, pausas recorrentes e bloqueios de exceção, com o tamanho do slot definido pela duração do serviço.",
        "Nova versão com arquitetura mais estruturada que a legada, que segue em produção, com frontend em TanStack Start e Query.",
      ],
      result:
        "API de agendamentos, barbeiros, serviços, avaliações e dashboard pronta, e frontend com agendamento em etapas, histórico e painéis por perfil. A versão legada está em produção e a nova está sendo preparada para implantação. Assinaturas com Stripe ficaram fora do MVP.",
    },
  },
  {
    slug: "oportune",
    name: "Oportune",
    description:
      "Plataforma que conecta alunos, professores e empresas, centralizando oportunidades para quem está no início da carreira.",
    tags: ["TypeScript", "React", "Next.js", "PostgreSQL", "Prisma", "Docker"],
    image: "/projects/oportune.png",
    repo: "https://github.com/PedrFelip/oportune",
    status: "concluido",
    caseStudy: {
      problem:
        "O dilema do primeiro emprego: o aluno precisa de experiência para ser contratado, mas só ganha experiência sendo contratado. Estágios e projetos acadêmicos ficam espalhados e difíceis de encontrar.",
      decisions: [
        "Três perfis de usuário (aluno, empresa e professor), cada um com cadastro e perfil próprios.",
        "Candidatura em um clique, reaproveitando os dados do perfil do aluno.",
        "Notificações por email no cadastro e a cada mudança de status da candidatura.",
        "Busca avançada de vagas com filtros por área, semestre e carga horária.",
      ],
      result:
        "Plataforma web que reúne vagas de empresas e professores e candidaturas de alunos em um só lugar, desenvolvida como projeto integrador da faculdade em 2025.",
      contribution:
        "Projeto em equipe (repositório de Pedro). Fiquei responsável pelo frontend da aplicação.",
    },
  },
  {
    slug: "match-room",
    name: "Match Room",
    description: "Organiza e gerencia listas de futebol entre amigos.",
    tags: ["React", "Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
    image: "/projects/match-room.png",
    repo: "https://github.com/gabbzin/matchroom",
    demo: "https://matchroom-beryl.vercel.app/",
    status: "concluido",
    caseStudy: {
      problem:
        "Organizar o racha de futebol entre amigos: sortear os times, decidir quem fica no banco e acompanhar quem ganhou, sem planilha nem grupo de mensagens.",
      decisions: [
        "Sistema de salas compartilhadas por URL, onde vários usuários acompanham a partida ao mesmo tempo e só o dono da sala edita, validado por um token de dono.",
        "Rotação automática: quem perde vai para o banco e o banco entra contra o vencedor, mantendo a partida contínua.",
        "Uma única tabela Room no PostgreSQL, com jogadores, times e histórico em campos JSON, pela flexibilidade de um modelo em evolução.",
      ],
      result:
        "App no ar com criação e compartilhamento de salas, sorteio de times, partidas contínuas e histórico com data e hora, persistido em banco.",
    },
  },
  {
    slug: "alocca-plantoes",
    name: "Alocca Plantões",
    description:
      "Plataforma de gestão de plantões médicos, com candidatura a plantões, controle de presença por geofencing, notificações e fluxo financeiro.",
    tags: ["NestJS", "Kotlin", "PostgreSQL", "Docker", "SeaweedFS"],
    status: "em-desenvolvimento",
    caseStudy: {
      problem:
        "Gerenciar plantões médicos em um só lugar: candidatura, presença, notificações e processos financeiros.",
      decisions: [
        "Check-in e check-out baseados em localização e geofencing, para validar a presença no local do plantão.",
        "Backend em NestJS, com os fluxos de candidatura e gerenciamento de plantões definidos antes da implementação.",
        "Envio de comprovantes financeiros com armazenamento de arquivos no SeaweedFS.",
      ],
      result:
        "Projeto em fase inicial: MVP e estrutura definidos, com o backend como próxima etapa.",
      contribution:
        "Participei da definição do MVP, da arquitetura do backend e dos fluxos principais.",
    },
  },
  {
    slug: "jejum",
    name: "Jejum+",
    description:
      "Aplicativo mobile de acompanhamento de jejum intermitente, com timer, janela de alimentação e histórico de sessões.",
    tags: ["Flutter", "Provider", "ChangeNotifier", "Hive"],
    repo: "https://github.com/gabbzin/jejum_app",
    status: "concluido",
    caseStudy: {
      problem:
        "Teste técnico de um processo seletivo: um app para acompanhar o jejum intermitente.",
      decisions: [
        "Estado gerenciado com Provider e ChangeNotifier, separando a lógica nos controllers.",
        "Persistência local com Hive, para manter o histórico sem depender de servidor.",
      ],
      result:
        "App com timer e indicador de progresso circular, protocolos, refeições, login e histórico de sessões.",
    },
  },
];
