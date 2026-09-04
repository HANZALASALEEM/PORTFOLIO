import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-4 min-[501px]:scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          index="05 / 06"
          title="Personal Projects"
          description="Built during university, before any industry experience — side projects to learn by shipping something complete."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.04}>
              <Link href={`/projects/${project.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-foreground">{project.name}</h3>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-muted transition-colors group-hover:text-accent"
                    />
                  </div>
                  <p className="flex-1 text-sm text-muted">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
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
