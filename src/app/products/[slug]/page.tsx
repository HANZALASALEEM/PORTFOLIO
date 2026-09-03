import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Layers, Target, UserRound } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ThreeBackground } from "@/components/three-background";
import { ProductMockup } from "@/components/product-mockup";
import { products, getProduct } from "@/data/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <article className="pb-20">
      <div className="relative overflow-hidden pt-14 pb-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[520px] bg-[radial-gradient(circle_at_top,_var(--accent-soft),_transparent_70%)]"
        />
        <ThreeBackground className="pointer-events-none absolute inset-0 -z-10 h-[520px] w-full opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <Container className="flex flex-col gap-10">
          <Reveal>
            <div className="flex flex-col gap-6">
              <Link
                href="/#products"
                className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft size={16} />
                Back to products
              </Link>
              <div className="flex flex-col items-start gap-4">
                <Badge variant={product.ownership === "end-to-end" ? "accent" : "default"}>
                  {product.ownership === "end-to-end" ? "Built end-to-end" : "Contributor"}
                </Badge>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {product.name}
                </h1>
                <p className="max-w-2xl font-(--font-description) text-lg text-muted">
                  {product.tagline}
                </p>
                <ButtonLink href={product.url} target="_blank" className="w-fit">
                  Visit {product.name}
                  <ArrowUpRight size={16} />
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ProductMockup name={product.name} url={product.url} seed={product.slug} />
          </Reveal>
        </Container>
      </div>

      <Container className="flex flex-col gap-16 pt-6">
        <Reveal delay={0.05}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 text-accent">
                <Target size={16} />
                <h2 className="font-mono text-sm">The problem</h2>
              </div>
              <p className="text-muted">{product.problem}</p>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 text-accent">
                <UserRound size={16} />
                <h2 className="font-mono text-sm">My role</h2>
              </div>
              <p className="text-muted">{product.role}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-border p-6">
            <ThreeBackground
              variant="field"
              opacity={0.5}
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            />
            <h2 className="font-mono text-sm text-accent">Tech stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-accent">
              <Layers size={16} />
              <h2 className="font-mono text-sm">Key features</h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col gap-6">
            <h2 className="font-mono text-sm text-accent">High-level architecture</h2>
            <div className="relative overflow-x-auto rounded-2xl border border-border p-6">
              <ThreeBackground
                variant="field"
                opacity={0.5}
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
              />
              <ArchitectureDiagram steps={product.architecture} />
            </div>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
