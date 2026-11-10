import { Github, Instagram, Linkedin, type LucideIcon } from "lucide-react";

interface Social {
  name: string;
  icon: LucideIcon;
  href: string;
}

export const github: Social = {
  name: "GitHub",
  icon: Github,
  href: "https://github.com/gabbzin",
};

export const linkedin: Social = {
  name: "LinkedIn",
  icon: Linkedin,
  href: "https://www.linkedin.com/in/gabriel-pimentel-zxn111/",
};

export const instagram: Social = {
  name: "Instagram",
  icon: Instagram,
  href: "https://www.instagram.com/gabb.pimentel/",
};

export const email = "dev.gabrielpimentell@gmail.com";

export const phone = {
  href: "tel:+5561991284291",
  label: "+55 (61) 99128-4291",
};
