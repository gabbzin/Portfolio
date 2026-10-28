import { Folder, Layers, type LucideIcon, Mail, User } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { name: "Projetos", href: "/#projetos", icon: Folder },
  { name: "Stack", href: "/#stack", icon: Layers },
  { name: "Sobre", href: "/#sobre", icon: User },
  { name: "Contato", href: "/#contato", icon: Mail },
];
