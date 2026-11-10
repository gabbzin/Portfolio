"use client";

import { useJourney } from "./Journey";
import { Voyage } from "./Voyage";
import { VoyageStatic } from "./VoyageStatic";

/** Os atos do meio: fixados com a cena no modo 3D, empilhados no estático. */
export function VoyageActs() {
  return useJourney().mode === "3d" ? <Voyage /> : <VoyageStatic />;
}
