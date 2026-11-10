"use client";

import { Zap } from "lucide-react";
import { setRecruiterMode, useRecruiterMode } from "@/lib/recruiter-mode";
import { Button } from "./ui/button";

export function RecruiterToggle() {
  const active = useRecruiterMode();

  return (
    <Button
      variant={active ? "default" : "outline"}
      aria-pressed={active}
      title="Mostra o mesmo conteúdo de forma direta, sem a cena 3D"
      className="max-md:size-11 max-md:px-0"
      onClick={() => {
        setRecruiterMode(!active);
        // O layout muda de altura: voltar ao topo evita cair no meio de
        // outra seção.
        window.scrollTo({ top: 0 });
      }}
    >
      <Zap aria-hidden="true" />
      <span className="max-md:sr-only">Modo recrutador</span>
    </Button>
  );
}
