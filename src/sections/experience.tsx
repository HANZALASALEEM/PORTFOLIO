import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading index="03 / 06" title="Work Experience" />
        <div className="flex flex-col gap-10">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <div className="grid gap-4 border-l border-border pl-6 sm:grid-cols-[1fr_2fr]">
                <div>
                  <p className="text-sm font-medium text-foreground">{job.role}</p>
                  <p className="text-sm text-accent">{job.company}</p>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                  <p className="text-xs text-muted">{job.location}</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-muted">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
