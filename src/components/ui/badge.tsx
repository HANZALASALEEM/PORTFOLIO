import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Badge({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted",
        className,
      )}
      {...props}
    />
  );
}
