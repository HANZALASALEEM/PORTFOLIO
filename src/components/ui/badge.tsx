import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: "default" | "accent";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs",
        variant === "accent"
          ? "border-accent/50 bg-surface text-accent"
          : "border-border bg-surface text-muted",
        className,
      )}
      {...props}
    />
  );
}
