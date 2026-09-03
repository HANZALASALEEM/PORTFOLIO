import { GraduationCap, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";
import { personal } from "@/data/personal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading index="01 / 06" title="About" />
        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <Reveal>
            <p className="font-(--font-description) text-lg leading-relaxed text-muted">
              {personal.bio}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">{personal.education.degree}</p>
                  <p className="text-sm text-muted">{personal.education.school}</p>
                  <p className="font-mono text-xs text-muted">{personal.education.period}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-sm text-muted">{personal.location}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
