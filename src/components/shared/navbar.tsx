"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { FullscreenToggle } from "./fullscreen-toggle";
import { Container } from "./container";

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/#projects", label: "GitHub Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-accent/20 bg-background/90 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="font-mono text-lg font-bold tracking-tight text-foreground">
            JF<span className="text-accent">/</span>DEV
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`relative px-4 py-2 text-[13px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  pathname === link.href
                    ? "text-accent bg-accent/10"
                    : "text-muted hover:text-foreground hover:bg-surface-muted"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <FullscreenToggle />
            <ThemeToggle />
            <Link
              href="/resume"
              className="flex h-9 items-center justify-center border border-accent/50 px-4 text-[13px] font-bold uppercase tracking-wider text-accent transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
            >
              Resume
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <FullscreenToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex size-8 items-center justify-center text-foreground transition-colors hover:bg-surface-muted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background md:hidden">
          <div className="flex h-16 items-center justify-between border-b border-accent/30 px-5">
            <span className="font-mono text-lg font-bold tracking-tight text-foreground">
              jidan<span className="text-accent">.</span>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex size-8 items-center justify-center text-foreground transition-colors hover:bg-surface-muted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-5 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 text-[13px] font-bold uppercase tracking-wider transition-all ${
                  pathname === link.href
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-accent/30 p-5">
            <Link
              href="/resume"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-full items-center justify-center border border-accent/50 text-[13px] font-bold uppercase tracking-wider text-accent transition-all hover:bg-accent hover:text-accent-foreground"
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
