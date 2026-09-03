import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { personal } from "@/data/personal";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(circle_at_top,_var(--accent-soft),_transparent_65%)]"
      />
      <Container className="flex flex-col items-start gap-8">
        <Reveal>
          <Badge>Available for new work</Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {personal.name} — {personal.role} building products end to end.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-xl font-[var(--font-description)] text-lg text-muted">
            {personal.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/#products">
              View products
              <ArrowUpRight size={16} />
            </ButtonLink>
            <ButtonLink href={personal.resumeUrl} variant="secondary" target="_blank">
              Resume
              <Download size={16} />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
