"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SiteButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function PrimaryButton({ href, children, className }: SiteButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        "h-auto rounded-sm px-6 py-4 text-xs tracking-[0.08em] uppercase",
        "bg-ink text-white hover:bg-brand-accent",
        className
      )}
    >
      <Link href={href}>
        <span>{children}</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}

export function GhostButton({ href, children, className }: SiteButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "h-auto rounded-sm border-ink bg-transparent px-6 py-4 text-xs tracking-[0.08em] uppercase",
        "text-ink hover:bg-ink hover:text-white",
        className
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
