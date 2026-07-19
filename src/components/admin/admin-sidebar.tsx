"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/lib/auth/actions";

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/experiences", label: "Experiences" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/resume", label: "Resume" },
  { href: "/admin/settings", label: "Settings" },
];

function NavLinks({ pathname, onNavigate }: { pathname: string | null; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`text-body rounded-lg px-3 py-2.5 font-medium transition-colors ${
              isActive
                ? "bg-accent/10 text-accent"
                : "text-muted hover:bg-surface-muted hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutButton() {
  return (
    <div className="border-t border-border p-3">
      <form action={logoutAction}>
        <button
          type="submit"
          className="text-body w-full rounded-lg px-3 py-2.5 text-left font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          Log out
        </button>
      </form>
    </div>
  );
}

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
        <Link href="/admin/dashboard" className="text-h4 font-semibold text-foreground">
          Admin
        </Link>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </header>

      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface lg:sticky lg:top-0 lg:flex">
        <div className="border-b border-border px-5 py-5">
          <Link href="/admin/dashboard" className="text-h4 font-semibold text-foreground">
            Admin
          </Link>
          <p className="text-small mt-1 truncate text-muted">{email}</p>
        </div>
        <NavLinks pathname={pathname} />
        <LogoutButton />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Close menu backdrop"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-foreground/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-surface shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-5">
              <div>
                <p className="text-h4 font-semibold text-foreground">Admin</p>
                <p className="text-small mt-1 truncate text-muted">{email}</p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
}
