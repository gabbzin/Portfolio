import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/consts/nav";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Abrir menu">
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
            <SheetClose asChild key={item.name}>
              <Link
                href={item.href}
                className="flex min-h-11 items-center gap-2 rounded-md px-3 py-2 font-medium text-base text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                <item.icon className="size-4" />
                {item.name}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
