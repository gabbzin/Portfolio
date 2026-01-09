import { Sidebar } from "./sidebar";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export default function Header() {
  return (
    <header className="sticky z-1000 flex items-center justify-between border-b bg-background p-4">
      <h1 className="font-bold text-xl">
        <span className="">Gabriel</span> <span>Portfolio</span>
      </h1>

      <div className="flex items-center gap-2">
        <AnimatedThemeToggler />
        <Sidebar />
      </div>
    </header>
  );
}
