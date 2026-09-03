import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          index="05 / 06"
          title="Personal Projects"
          description="Side projects built to learn, experiment, and ship something complete."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.04}>
              <Card className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-foreground">{project.name}</h3>
                  {project.githubUrl ? (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} on GitHub`}
                      className="shrink-0 text-muted transition-colors hover:text-accent"
                    >
                      <GithubIcon size={18} />
                    </Link>
                  ) : null}
                </div>
                <p className="flex-1 text-sm text-muted">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                {project.githubUrl ? (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent"
                  >
                    View repository
                    <ArrowUpRight size={14} />
                  </Link>
                ) : (
                  <span className="text-xs text-muted">Client project, no public repo</span>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
