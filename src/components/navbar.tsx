"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Code2,
  Briefcase,
  Package,
  FolderGit2,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { personal } from "@/data/personal";
import { cn } from "@/lib/cn";

const links: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/#about", label: "About", icon: User },
  { href: "/#skills", label: "Skills", icon: Code2 },
  { href: "/#experience", label: "Work", icon: Briefcase },
  { href: "/#products", label: "Products", icon: Package },
  { href: "/#projects", label: "Projects", icon: FolderGit2 },
  { href: "/#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.replace("/#", "")))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 flex justify-center transition-all duration-500 ease-out max-[500px]:hidden",
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
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
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

            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </Container>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-border bg-background/95 backdrop-blur max-[500px]:block"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-6">
          {links.map(({ href, label, icon: Icon }) => {
            const id = href.replace("/#", "");
            const active = activeId === id;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[10px] transition-colors",
                  active ? "text-accent" : "text-muted",
                )}
              >
                <Icon size={19} strokeWidth={active ? 2.4 : 2} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
