const key = "text-highlight";
const str = "text-sky-300 dark:text-sky-300";

function Line({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-pre">{children}</div>;
}

export function CodeCard() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/30">
      <div className="flex items-center gap-2 border-b bg-code px-4 py-3">
        <span
          aria-hidden="true"
          className="size-3 rounded-full bg-red-400/80"
        />
        <span
          aria-hidden="true"
          className="size-3 rounded-full bg-yellow-400/80"
        />
        <span
          aria-hidden="true"
          className="size-3 rounded-full bg-green-400/80"
        />
        <span className="ml-3 font-mono text-subtle text-xs">gabriel.ts</span>
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-sm leading-7">
        <code>
          <Line>
            <span className="text-violet-400">const</span> gabriel = {"{"}
          </Line>
          <Line>
            {"  "}
            <span className={key}>funcao</span>:{" "}
            <span className={str}>"Desenvolvedor Full-Stack"</span>,
          </Line>
          <Line>
            {"  "}
            <span className={key}>frontend</span>: [
            <span className={str}>"React"</span>,{" "}
            <span className={str}>"Next.js"</span>],
          </Line>
          <Line>
            {"  "}
            <span className={key}>backend</span>: [
            <span className={str}>"Node.js"</span>,{" "}
            <span className={str}>"NestJS"</span>],
          </Line>
          <Line>
            {"  "}
            <span className={key}>banco</span>:{" "}
            <span className={str}>"PostgreSQL"</span>,
          </Line>
          <Line>
            {"  "}
            <span className={key}>infra</span>: [
            <span className={str}>"Docker"</span>,{" "}
            <span className={str}>"Linux"</span>],
          </Line>
          <Line>{"};"}</Line>
        </code>
      </pre>
    </div>
  );
}
