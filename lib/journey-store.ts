import { create } from "zustand";
import { chapters } from "@/consts/chapters";

interface JourneyState {
  /** Índice do capítulo que cruza o centro da tela. */
  activeChapter: number;
  /** Progresso da página inteira, de 0 a 1. */
  progress: number;
  /**
   * Posição na viagem em "paradas": 0 é o primeiro capítulo centralizado na
   * tela, 1 o segundo, e os valores fracionários são o trecho entre eles.
   */
  travel: number;
  /** Progresso de cada capítulo, de 0 a 1, na ordem de `chapters`. */
  chapterProgress: number[];
  setActiveChapter: (index: number) => void;
  setProgress: (progress: number) => void;
  setTravel: (travel: number) => void;
  setChapterProgress: (index: number, progress: number) => void;
}

// O ScrollTrigger é a única fonte de progresso: ele escreve aqui e o DOM e a
// cena 3D só leem. A cena lê com `getState()` dentro do useFrame, sem seletor,
// para que o scroll não cause re-render do React.
export const useJourneyStore = create<JourneyState>(set => ({
  activeChapter: 0,
  progress: 0,
  travel: 0,
  chapterProgress: chapters.map(() => 0),
  setActiveChapter: activeChapter => set({ activeChapter }),
  setProgress: progress => set({ progress }),
  setTravel: travel => set({ travel }),
  setChapterProgress: (index, progress) =>
    set(state => {
      const chapterProgress = state.chapterProgress.slice();
      chapterProgress[index] = progress;
      return { chapterProgress };
    }),
}));
