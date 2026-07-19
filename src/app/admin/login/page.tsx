"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type LoginActionState } from "@/lib/auth/actions";
import { inputClass, labelClass } from "@/components/admin/form-styles";

const initialState: LoginActionState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-muted px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-full border border-border bg-surface">
            <span className="text-h4 font-semibold text-accent">JF</span>
          </div>
          <p className="text-label mt-4 font-medium uppercase tracking-wide text-accent">
            Admin
          </p>
          <h1 className="text-h3 mt-1 font-semibold tracking-tight text-foreground">
            Sign in to your dashboard
          </h1>
          <p className="text-small mt-2 text-muted">
            Manage projects, experience, skills, and site content.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-8">
          <form action={formAction} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </div>

            {state.error && (
              <p className="text-small rounded-lg bg-danger/10 px-4 py-3 text-danger">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-body font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {isPending ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <Link
          href="/"
          className="text-small mt-6 flex items-center justify-center gap-1.5 font-medium text-muted transition-colors hover:text-foreground"
        >
          &larr; Back to site
        </Link>
      </div>
    </main>
  );
}
