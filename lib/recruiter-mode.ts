import { useSyncExternalStore } from "react";

const KEY = "modo-recrutador";
const listeners = new Set<() => void>();
let value: boolean | undefined;

function read() {
  if (value === undefined) {
    // localStorage pode estar bloqueado (aba privada, política do navegador).
    try {
      value = localStorage.getItem(KEY) === "1";
    } catch {
      value = false;
    }
  }
  return value;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setRecruiterMode(next: boolean) {
  value = next;
  try {
    localStorage.setItem(KEY, next ? "1" : "0");
  } catch {
    // Sem persistência a escolha vale só para esta visita.
  }
  for (const listener of listeners) listener();
}

/**
 * Modo recrutador: desliga a cena 3D e o scroll fixado e mostra o mesmo
 * conteúdo de forma direta. No servidor é sempre falso.
 */
export const useRecruiterMode = () =>
  useSyncExternalStore(subscribe, read, () => false);
