// Valores que mudam a cada frame e são compartilhados entre os objetos da
// cena. Ficam fora do React de propósito: ninguém re-renderiza por causa deles.
export const sceneState = {
  /** Opacidade global da cena, definida pela câmera conforme a parada. */
  opacity: 1,
};
