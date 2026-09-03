import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="text-sm text-accent">404</span>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Page not found</h1>
        <p className="max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <ButtonLink href="/">
          <ArrowLeft size={16} />
          Back to home
        </ButtonLink>
      </Container>
    </section>
  );
}
