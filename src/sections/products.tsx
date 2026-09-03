import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { ThreeBackground } from "@/components/three-background";
import { products } from "@/data/products";

export function Products() {
  return (
    <section id="products" className="relative scroll-mt-24 overflow-hidden py-24">
      <ThreeBackground
        variant="waves"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      />
      <Container>
        <SectionHeading
          index="04 / 06"
          title="Products"
          description="Real, shipped products. Two of them built by me from the first line of code to launch."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.05}>
              <Link href={`/products/${product.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col gap-4">
                  <div aria-hidden className="h-1.5 w-12 rounded-full bg-accent" />
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-muted transition-colors group-hover:text-accent"
                    />
                  </div>
                  <p className="flex-1 text-sm text-muted">{product.tagline}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={product.ownership === "end-to-end" ? "accent" : "default"}>
                      {product.ownership === "end-to-end" ? "Built end-to-end" : "Contributor"}
                    </Badge>
                    {product.stack.slice(0, 2).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
