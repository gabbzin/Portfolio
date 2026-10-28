import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <span className="font-mono text-highlight text-sm">{label}</span>
      <h2 className="mt-2 font-bold text-3xl tracking-tight md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </Reveal>
  );
}
