import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
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
    <article className="py-20">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <div className="flex flex-col gap-6">
            <Link
              href="/#products"
              className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to products
            </Link>
            <div className="flex flex-col gap-4">
              <Badge>{product.ownership === "end-to-end" ? "Built end-to-end" : "Contributor"}</Badge>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {product.name}
              </h1>
              <p className="max-w-2xl font-[var(--font-description)] text-lg text-muted">
                {product.tagline}
              </p>
              <ButtonLink href={product.url} target="_blank" className="w-fit">
                Visit {product.name}
                <ArrowUpRight size={16} />
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-mono text-accent">The problem</h2>
              <p className="text-muted">{product.problem}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-mono text-accent">My role</h2>
              <p className="text-muted">{product.role}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-mono text-accent">Tech stack</h2>
            <div className="flex flex-wrap gap-2">
              {product.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-mono text-accent">Key features</h2>
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
            <h2 className="text-sm font-mono text-accent">High-level architecture</h2>
            <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-6">
              <ArchitectureDiagram steps={product.architecture} />
            </div>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
