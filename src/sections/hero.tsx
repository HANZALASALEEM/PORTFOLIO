import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { ThreeBackground } from "@/components/three-background";
import { personal } from "@/data/personal";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[600px] bg-[radial-gradient(circle_at_top,_var(--accent-soft),_transparent_60%)]"
      />
      <ThreeBackground
        opacity={0.4}
        className="pointer-events-none absolute inset-0 -z-10 h-[600px] w-full [mask-image:linear-gradient(in_srgb_to_bottom,black,black_15%,transparent_80%)]"
      />
      <Container className="flex flex-col items-start gap-8">
        <Reveal>
          <Badge variant="accent" className="gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Available for new work
          </Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {personal.name}, {personal.role} building products end to end.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-xl font-(--font-description) text-lg text-muted">
            {personal.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/#products">
              View products
              <ArrowUpRight size={16} />
            </ButtonLink>
            <ButtonLink
              href={personal.resumeUrl}
              variant="secondary"
              target="_blank"
            >
              Resume
              <Download size={16} />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
