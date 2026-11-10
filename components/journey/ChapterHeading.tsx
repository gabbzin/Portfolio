import { type ChapterId, getChapter } from "@/consts/chapters";

export function chapterLabel(id: ChapterId) {
  const { index, stop } = getChapter(id);
  return `// ${String(index).padStart(2, "0")} · ${stop.toLowerCase()}`;
}

export function ChapterHeading({ id }: { id: ChapterId }) {
  const { title, lede } = getChapter(id);

  return (
    <header className="mb-10 max-w-3xl">
      <p className="font-mono text-highlight text-sm">{chapterLabel(id)}</p>
      <h2
        id={`${id}-titulo`}
        className="mt-2 font-bold font-display text-3xl tracking-tight md:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground md:text-xl">{lede}</p>
    </header>
  );
}
