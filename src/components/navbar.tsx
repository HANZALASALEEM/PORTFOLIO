"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { personal } from "@/data/personal";
import { cn } from "@/lib/cn";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#products", label: "Products" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex justify-center transition-all duration-500 ease-out",
        scrolled && "px-4",
      )}
    >
      <div
        className={cn(
          "w-full border-b border-border bg-background/80 backdrop-blur transition-all duration-500 ease-out",
          scrolled &&
            "mt-3 max-w-7xl rounded-full border border-border bg-background/90 shadow-lg shadow-black/5",
        )}
      >
        <Container
          className={cn(
            "flex h-16 items-center justify-between transition-all duration-500 ease-out",
            scrolled && "h-12 max-w-none px-4",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
          >
            {personal.name}
          </Link>

          <nav
            className="relative hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                {hovered === link.href ? (
                  <motion.span
                    layoutId="navbar-hover-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-hover"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <ButtonLink href="/#contact" className="px-4 py-2 text-xs">
              Get in touch
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </Container>

        <AnimatePresence>
          {open ? (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden border-t border-border bg-background md:hidden"
            >
              <Container className="flex flex-col gap-1 py-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 flex items-center justify-between px-3">
                  <ThemeToggle />
                  <ButtonLink href="/#contact" className="px-4 py-2 text-xs">
                    Get in touch
                  </ButtonLink>
                </div>
              </Container>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
