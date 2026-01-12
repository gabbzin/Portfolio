import { Folder, Home, Mail, MenuIcon, Settings, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Settings },
  { name: "Projects", href: "#projects", icon: Folder },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="z-1001 w-[75vw] max-w-92.5 gap-6 p-0"
      >
        <SheetHeader>
          <SheetTitle className="font-bold font-inter text-xl uppercase">
            Menu
          </SheetTitle>
        </SheetHeader>
        <div>
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 py-2 font-medium text-base text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <div className="flex items-center gap-2">
                <item.icon className="size-4" />
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
