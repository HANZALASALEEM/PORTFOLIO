import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Layers } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ThreeBackground } from "@/components/three-background";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { projects, getProject } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pb-20">
      <div className="relative overflow-hidden pt-14 pb-16">
        <ThreeBackground
          variant="field"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        />
        <Container className="flex flex-col gap-6">
          <Reveal>
            <div className="flex flex-col gap-6">
              <Link
                href="/#projects"
                className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft size={16} />
                Back to projects
              </Link>
              <div className="flex flex-col items-start gap-4">
                <Badge>University Project</Badge>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {project.name}
                </h1>
                <p className="max-w-2xl font-(--font-description) text-lg text-muted">
                  {project.description}
                </p>
                {project.githubUrl ? (
                  <ButtonLink href={project.githubUrl} target="_blank" className="w-fit">
                    View repository
                    <ArrowUpRight size={16} />
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      <Container className="flex flex-col gap-16 pt-6">
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-4">
            <h2 className="text-sm text-accent">Tech stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-accent">
              <Layers size={16} />
              <h2 className="text-sm">Key features</h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
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

        <Reveal delay={0.15}>
          <div className="flex flex-col gap-6">
            <h2 className="text-sm text-accent">High-level architecture</h2>
            <div className="relative overflow-x-auto rounded-2xl border border-border p-6">
              <ThreeBackground
                variant="field"
                opacity={0.5}
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
              />
              <ArchitectureDiagram layers={project.architecture} />
            </div>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
