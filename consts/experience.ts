export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    company: "[PREENCHER] Empresa",
    role: "[PREENCHER] Cargo",
    period: "[PREENCHER] Início - Atual",
    summary:
      "Sistema interno de automação de notas fiscais (NFS-e) para um escritório de contabilidade, o Evolução Automações.",
    highlights: [
      "Download automatizado de NFS-e do portal nacional com certificado digital, processado em filas.",
      "Cadastro de empresas, contadores e certificados, com download em lote por contador.",
      "Conciliação contábil do extrato por empresa, com relatório em tabela.",
      "Monitoramento da aplicação com Prometheus e Grafana.",
    ],
    tags: [
      "NestJS",
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "TanStack Query",
      "Docker",
    ],
  },
];
