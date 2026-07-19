"use client";

import { usePathname } from "next/navigation";
import { Container } from "./container";

export type FooterProps = {
  fullName: string;
  githubUrl?: string;
  linkedinUrl?: string;
  publicEmail?: string;
};

export function Footer({ fullName, githubUrl, linkedinUrl, publicEmail }: FooterProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const socialLinks = [
    githubUrl ? { href: githubUrl, label: "GitHub" } : null,
    linkedinUrl ? { href: linkedinUrl, label: "LinkedIn" } : null,
    publicEmail ? { href: `mailto:${publicEmail}`, label: "Email" } : null,
  ].filter((link): link is { href: string; label: string } => link !== null);

  return (
    <footer className="border-t border-accent/30 bg-background">
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[15px] font-bold tracking-tight text-foreground">
            {fullName}
          </p>
          <p className="mt-0.5 text-[12px] font-bold uppercase tracking-wider text-muted">
            Full Stack Web Engineer
          </p>
        </div>

        <div className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[12px] font-bold uppercase tracking-wider text-muted transition-all duration-200 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>

      <div className="border-t border-border/50">
        <Container className="py-3">
          <p className="text-[12px] font-bold uppercase tracking-wider text-muted/60">
            &copy; {new Date().getFullYear()} {fullName}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
