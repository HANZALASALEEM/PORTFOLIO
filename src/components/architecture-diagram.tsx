import { Cloud, Database, ExternalLink, Server, Shield, User, Zap } from "lucide-react";
import type { ComponentType } from "react";
import { cn } from "@/lib/cn";

export type ArchitectureNodeKind = "client" | "service" | "queue" | "datastore" | "external" | "output";

export type ArchitectureNode = {
  label: string;
  detail: string;
  kind?: ArchitectureNodeKind;
};

export type ArchitectureLayer = {
  title: string;
  nodes: ArchitectureNode[];
};

const ICONS: Record<ArchitectureNodeKind, ComponentType<{ size?: number; className?: string }>> = {
  client: User,
  service: Server,
  queue: Zap,
  datastore: Database,
  external: Cloud,
  output: ExternalLink,
};

function NodeIcon({ kind }: { kind?: ArchitectureNodeKind }) {
  const Icon = ICONS[kind ?? "service"];
  return <Icon size={13} className="shrink-0 text-accent" />;
}

function Arrow() {
  return (
    <svg viewBox="0 0 40 24" className="hidden h-6 w-8 shrink-0 text-accent md:block" fill="none" aria-hidden>
      <path
        d="M2 12h30m0 0-8-8m8 8-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 40" className="h-8 w-6 shrink-0 text-accent md:hidden" fill="none" aria-hidden>
      <path
        d="M12 2v30m0 0-8-8m8 8 8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ArchitectureDiagramProps = {
  layers: ArchitectureLayer[];
};

export function ArchitectureDiagram({ layers }: ArchitectureDiagramProps) {
  return (
    <div
      role="img"
      aria-label={`Architecture: ${layers.map((l) => l.title).join(" to ")}`}
      className="flex flex-col items-stretch gap-4 md:flex-row"
    >
      {layers.map((layer, i) => (
        <div key={layer.title} className="contents md:flex md:items-stretch">
          <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-border bg-surface/60 p-4 md:min-w-[12rem]">
            <span className="font-mono text-[11px] font-medium tracking-wide text-muted uppercase">
              {String(i + 1).padStart(2, "0")} · {layer.title}
            </span>
            <div className="flex flex-1 flex-col justify-center gap-2">
              {layer.nodes.map((node) => (
                <div
                  key={node.label}
                  className={cn(
                    "flex min-h-16 flex-col justify-center gap-1 rounded-xl border border-border bg-background px-3 py-2.5",
                    node.kind === "external" || node.kind === "queue" ? "border-dashed" : "",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <NodeIcon kind={node.kind} />
                    <span className="text-sm font-medium text-foreground">{node.label}</span>
                    {node.kind === "external" ? (
                      <Shield size={11} className="ml-auto shrink-0 text-muted" aria-hidden />
                    ) : null}
                  </div>
                  <span className="text-xs text-muted">{node.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {i < layers.length - 1 ? (
            <div className="flex items-center justify-center py-1 md:py-0 md:px-2">
              <ArrowDown />
              <Arrow />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
