/** biome-ignore-all lint/suspicious/noArrayIndexKey: <Pode usar> */
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "A beautiful landing page app using React and Tailwind.",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Orbit Analytics Dashboard",
    description:
      "Interactive analytics dashboard with data visualization and filtering capabilities.",
    image: "/projects/project2.png",
    tags: ["TypeScript", "D3.js", "Next.js"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce platform with user authentication and payment processing.",
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "Stripe"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
          {" "}
          <span className="text-primary"> Projetos </span> Realizados
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Aqui estão alguns dos meus projetos recentes. Cada projeto foi
          cuidadosamente elaborado com atenção aos detalhes, desempenho e
          experiência do usuário.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group card-hover overflow-hidden rounded-lg bg-card shadow-xs"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={192}
                />
              </div>

              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      className="rounded-full border bg-secondary px-2 py-1 font-medium text-secondary-foreground text-xs"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mb-1 font-semibold text-xl"> {project.title}</h3>
                <p className="mb-4 text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 transition-colors duration-300 hover:text-primary"
                    >
                      <ExternalLink size={20} />
                    </Link>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 transition-colors duration-300 hover:text-primary"
                    >
                      <Github size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            className="cosmic-button mx-auto flex w-fit items-center gap-2"
            target="_blank"
            href="https://github.com/gabbzin"
            rel="noopener"
          >
            Confira no GitHub <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
