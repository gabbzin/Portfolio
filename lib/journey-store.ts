import { create } from "zustand";

interface JourneyState {
  /** Hero: 0 no topo, 1 quando saiu da tela. */
  hero: number;
  /** Viagem fixada: de 0 a VOYAGE_BEATS, um por passo. */
  voyage: number;
  /** Chegada: 0 quando a seção entra, 1 no fim da página. */
  arrival: number;
  /** Ponteiro normalizado de -1 a 1, para o parallax da câmera. */
  pointer: { x: number; y: number };
  /** Falso até o primeiro movimento de mouse (em telas de toque, sempre). */
  pointerActive: boolean;
}

// O ScrollTrigger é a única fonte de progresso: cada seção escreve o seu
// trecho aqui e a cena lê com `getState()` dentro do useFrame. Nenhum
// componente assina estes campos, então rolar não re-renderiza o React.
export const useJourneyStore = create<JourneyState>(() => ({
  hero: 0,
  voyage: 0,
  arrival: 0,
  pointer: { x: 0, y: 0 },
  pointerActive: false,
}));
