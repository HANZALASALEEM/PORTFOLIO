import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { Container } from "@/components/ui/container";
import { personal } from "@/data/personal";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {personal.name}.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-foreground"
          >
            <GithubIcon size={18} />
          </Link>
          <Link
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-foreground"
          >
            <LinkedinIcon size={18} />
          </Link>
          <Link
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-foreground"
          >
            <Mail size={18} />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
