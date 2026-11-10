import {
  Briefcase,
  Folder,
  Layers,
  type LucideIcon,
  Mail,
  User,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

// Na ordem das paradas da viagem.
export const navItems: NavItem[] = [
  { name: "Stack", href: "/#stack", icon: Layers },
  { name: "Projetos", href: "/#projetos", icon: Folder },
  { name: "Experiência", href: "/#experiencia", icon: Briefcase },
  { name: "Sobre", href: "/#sobre", icon: User },
  { name: "Contato", href: "/#contato", icon: Mail },
];
