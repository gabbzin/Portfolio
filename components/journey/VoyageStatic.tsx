import { voyageActs } from "@/consts/voyage";
import { actBeats } from "./acts";
import { ChapterHeading } from "./ChapterHeading";

/** Os mesmos atos sem cena nem scroll fixado: seções em ordem de leitura. */
export function VoyageStatic() {
  return (
    <>
      {voyageActs.map(act => (
        <section
          key={act.id}
          id={act.id}
          aria-labelledby={`${act.id}-titulo`}
          className="py-20 md:py-28"
        >
          <div className="container">
            <ChapterHeading id={act.id} />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {actBeats[act.id].map((content, index) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: a ordem dos passos é fixa
                  key={index}
                  className="rounded-xl border bg-card p-6"
                >
                  {content}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
