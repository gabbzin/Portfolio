export interface FirstStep {
  name: string;
  tags: string[];
  /** URL do repositório público. Sem valor, o cartão aparece sem link. */
  repo?: string;
}

// TODO(Gabriel): preencher `repo` com a URL de cada repositório no GitHub.
export const firstSteps: FirstStep[] = [
  {
    name: "Calculadora",
    tags: ["HTML", "CSS", "JavaScript"],
    repo: undefined,
  },
  {
    name: "Relógio digital",
    tags: ["HTML", "CSS", "JavaScript"],
    repo: undefined,
  },
  {
    name: "Simulação de celular",
    tags: ["HTML", "CSS", "JavaScript"],
    repo: undefined,
  },
];
