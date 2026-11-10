import type { ReactNode } from "react";

interface TechTileProps {
  name: string;
  children: ReactNode;
}

export function TechTile({ name, children }: TechTileProps) {
  return (
    <li className="flex flex-col items-center gap-3 rounded-lg border bg-code px-3 py-5 text-center transition-[transform,border-color] hover:-translate-y-1 hover:border-highlight/60 motion-reduce:transform-none">
      {children}
      <span className="font-medium text-sm">{name}</span>
    </li>
  );
}
