import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[75vw] max-w-92.5 gap-6 p-0">
        <SheetHeader>
          <SheetTitle>Portfolio</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
