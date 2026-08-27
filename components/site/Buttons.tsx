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
        "group h-auto min-h-12 rounded-sm px-6 py-4 text-base font-medium tracking-[0.04em]",
        "bg-ink text-white transition-all duration-300 hover:bg-brand-accent",
        "hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(26,31,46,0.25)]",
        className
      )}
    >
      <Link href={href}>
        <span>{children}</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
        "h-auto min-h-12 rounded-sm border-ink bg-transparent px-6 py-4 text-base font-medium tracking-[0.04em]",
        "text-ink transition-all duration-300 hover:bg-ink hover:text-white",
        "hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(26,31,46,0.2)]",
        className
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
