import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ThreeBackground } from "@/components/three-background";
import { personal } from "@/data/personal";

const links = [
  { label: personal.email, href: `mailto:${personal.email}`, icon: Mail },
  { label: personal.phone, href: `tel:${personal.phone}`, icon: Phone },
  { label: "GitHub", href: personal.github, icon: GithubIcon },
  { label: "LinkedIn", href: personal.linkedin, icon: LinkedinIcon },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-4 min-[501px]:scroll-mt-24 overflow-hidden py-24">
      <ThreeBackground
        variant="field"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      />
      <Container>
        <SectionHeading
          index="06 / 06"
          title="Contact"
          description="Have a product to build or a role to fill? I'm open to hearing about it."
        />
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <link.icon size={16} className="text-accent" />
                  {link.label}
                </a>
              ))}
            </div>
            <ButtonLink href={`mailto:${personal.email}`}>
              Say hello
              <ArrowUpRight size={16} />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
