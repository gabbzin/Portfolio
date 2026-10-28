const words = [
  { text: "React", top: "12%", left: "6%", size: "text-2xl" },
  { text: "Next.js", top: "20%", left: "44%", size: "text-xl" },
  { text: "TypeScript", top: "8%", left: "70%", size: "text-3xl" },
  { text: "NestJS", top: "38%", left: "3%", size: "text-xl" },
  { text: "Prisma", top: "34%", left: "58%", size: "text-2xl" },
  { text: "Node.js", top: "52%", left: "78%", size: "text-xl" },
  { text: "Docker", top: "58%", left: "10%", size: "text-2xl" },
  { text: "PostgreSQL", top: "70%", left: "36%", size: "text-xl" },
  { text: "Tailwind CSS", top: "66%", left: "62%", size: "text-2xl" },
  { text: "Express", top: "82%", left: "82%", size: "text-lg" },
  { text: "Linux", top: "80%", left: "8%", size: "text-lg" },
  { text: "Git", top: "46%", left: "30%", size: "text-lg" },
];

export function TechBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {words.map(word => (
        <span
          key={word.text}
          className={`absolute select-none font-mono text-foreground opacity-[0.13] ${word.size}`}
          style={{ top: word.top, left: word.left }}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
}
