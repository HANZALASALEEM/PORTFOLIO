type ProductMockupProps = {
  name: string;
  url: string;
  seed: string;
};

function hueFromSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  }
  return hash;
}

export function ProductMockup({ name, url, seed }: ProductMockupProps) {
  const hue = hueFromSeed(seed);
  const displayUrl = url.replace(/^https?:\/\//, "");

  return (
    <div className="overflow-hidden rounded-2xl border border-accent/30 bg-surface shadow-[0_30px_80px_-40px_var(--accent)]">
      <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="ml-3 flex-1 truncate rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
          {displayUrl}
        </span>
      </div>
      <div
        className="relative flex aspect-[16/9] items-center justify-center"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, var(--accent) 85%, hsl(${hue} 70% 55%)) 0%, color-mix(in srgb, var(--accent) 25%, transparent) 55%, var(--surface) 100%)`,
        }}
      >
        <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
          <defs>
            <pattern id={`grid-${seed}`} width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${seed})`} />
        </svg>
        <span className="relative font-mono text-lg font-semibold uppercase tracking-widest text-white/90 drop-shadow-sm sm:text-2xl">
          {name}
        </span>
      </div>
    </div>
  );
}
