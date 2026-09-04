import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";
import { ThreeBackground } from "@/components/three-background";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-4 min-[501px]:scroll-mt-24 overflow-hidden py-24">
      <ThreeBackground
        variant="grid"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      />
      <Container>
        <SectionHeading
          index="02 / 06"
          title="Skills"
          description="Languages, frameworks, and infrastructure I use to ship products end to end."
        />
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="flex flex-col gap-2 border-l border-border pl-5">
                <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
                <p className="font-(--font-description) text-sm leading-relaxed text-muted">
                  {group.skills.join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
