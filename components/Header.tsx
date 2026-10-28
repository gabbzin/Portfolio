import Link from "next/link";
import { navItems } from "@/consts/nav";
import { Sidebar } from "./Sidebar";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export default function Header() {
  return (
    <header className="fixed top-0 z-1000 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Gabriel Pimentel, página inicial"
          className="font-bold font-mono text-highlight text-xl"
        >
          GP
        </Link>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="flex h-11 items-center rounded-md px-4 text-muted-foreground text-sm transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AnimatedThemeToggler />
          <div className="md:hidden">
            <Sidebar />
          </div>
        </div>
      </div>
    </header>
  );
}
