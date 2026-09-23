/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
"use client";
import { GithubIcon, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

const data = [
  {
    title: "GitHub",
    icon: (
      <GithubIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "https://github.com/gabbzin",
  },
  {
    title: "LinkedIn",
    icon: (
      <Linkedin className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "https://www.linkedin.com/in/gabriel-pimentel-zxn111/",
  },
  {
    title: "Instagram",
    icon: (
      <Instagram className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "https://www.instagram.com/gabb.pimentel/",
  },
  {
    title: "Email",
    icon: (
      <Mail className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "mailto:user.gabrielp@gmail.com?subject=Ol%C3%A1+Gabriel!",
  },
];
export default function DockCustom() {
  return (
    <div className="fixed bottom-0 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3">
        {data.map((item, idx) => (
          <Link key={idx} href={item.href} target="_blank">
            <DockItem className="aspect-square rounded-full bg-background">
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
}
