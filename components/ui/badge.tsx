import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        dev: "border-transparent bg-yellow-500/10 text-yellow-700 [a&]:hover:bg-yellow-600",
        success:
          "border-transparent bg-green-500/10 text-green-800 [a&]:hover:bg-green-600",
        // Frontend
        react:
          "border-transparent bg-sky-500/10 text-sky-800 [a&]:hover:bg-sky-600/20",
        next: "border-transparent bg-neutral-900/10 text-neutral-800 [a&]:hover:bg-neutral-900/20",
        tailwind:
          "border-transparent bg-cyan-500/10 text-cyan-800 [a&]:hover:bg-cyan-600/20",
        typescript:
          "border-transparent bg-blue-600/10 text-blue-800 [a&]:hover:bg-blue-700/20",

        // Backend
        node: "border-transparent bg-green-600/10 text-green-800 [a&]:hover:bg-green-700/20",
        express:
          "border-transparent bg-zinc-600/10 text-zinc-800 [a&]:hover:bg-zinc-700/20",

        // Database / ORM
        postgres:
          "border-transparent bg-indigo-600/10 text-indigo-800 [a&]:hover:bg-indigo-700/20",
        prisma:
          "border-transparent bg-violet-600/10 text-violet-800 [a&]:hover:bg-violet-700/20",

        // Infra / Payments
        docker:
          "border-transparent bg-sky-700/10 text-sky-900 [a&]:hover:bg-sky-800/20",
        stripe:
          "border-transparent bg-purple-600/10 text-purple-800 [a&]:hover:bg-purple-700/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export const tagVariantMap: Record<string, BadgeVariant> = {
  React: "react",
  Next: "next",
  "Next.js": "next",
  TailwindCSS: "tailwind",
  TypeScript: "typescript",
  "Node.js": "node",
  Express: "express",
  PostgreSQL: "postgres",
  Prisma: "prisma",
  Docker: "docker",
  Stripe: "stripe",
};

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
