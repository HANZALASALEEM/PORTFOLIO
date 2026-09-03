import type { ArchitectureStep } from "@/data/products";

type ArchitectureDiagramProps = {
  steps: ArchitectureStep[];
};

function Arrow({ vertical }: { vertical: boolean }) {
  return (
    <svg
      viewBox={vertical ? "0 0 24 40" : "0 0 40 24"}
      className={vertical ? "h-8 w-6 shrink-0 text-accent md:hidden" : "hidden h-6 w-8 shrink-0 text-accent md:block"}
      fill="none"
      aria-hidden
    >
      {vertical ? (
        <path
          d="M12 2v30m0 0-8-8m8 8 8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M2 12h30m0 0-8-8m8 8-8 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function ArchitectureDiagram({ steps }: ArchitectureDiagramProps) {
  return (
    <div
      role="img"
      aria-label={`Architecture flow: ${steps.map((step) => step.label).join(" to ")}`}
      className="flex flex-col items-stretch gap-0 md:flex-row md:items-center"
    >
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-col items-stretch md:flex-row md:items-center">
          <div className="flex min-w-[10rem] flex-col gap-1 rounded-xl border border-border bg-surface px-4 py-3">
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm font-medium text-foreground">{step.label}</span>
            <span className="text-xs text-muted">{step.detail}</span>
          </div>
          {i < steps.length - 1 ? (
            <div className="flex items-center justify-center py-1 md:px-1">
              <Arrow vertical />
              <Arrow vertical={false} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
