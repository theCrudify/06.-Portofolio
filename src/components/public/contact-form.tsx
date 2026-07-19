"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormInput } from "@/lib/validation/contact";

const PURPOSE_OPTIONS: { value: ContactFormInput["purpose"]; label: string }[] = [
  { value: "job_opportunity", label: "Job opportunity" },
  { value: "freelance_project", label: "Freelance project" },
  { value: "networking", label: "Professional networking" },
  { value: "collaboration", label: "Collaboration" },
  { value: "other", label: "Other" },
];

const inputClass =
  "w-full border border-border/70 bg-surface px-4 py-3 text-body text-foreground outline-none transition-all duration-200 placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent/30 disabled:opacity-50";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-accent/30 bg-surface p-8">
        <h2 className="text-h3 text-foreground">Message sent</h2>
        <p className="mt-2 text-body text-muted">
          Thanks for reaching out. I will review your message as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover"
        >
          Send another message
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("honeypot")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-foreground">
            Name
          </label>
          <input id="name" type="text" className={inputClass} {...register("name")} />
          {errors.name && (
            <p className="mt-1.5 text-[12px] font-bold uppercase tracking-wider text-danger">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-foreground">
            Email
          </label>
          <input id="email" type="email" className={inputClass} {...register("email")} />
          {errors.email && (
            <p className="mt-1.5 text-[12px] font-bold uppercase tracking-wider text-danger">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-foreground">
            Company <span className="text-muted font-normal">(optional)</span>
          </label>
          <input id="company" type="text" className={inputClass} {...register("company")} />
        </div>

        <div>
          <label htmlFor="purpose" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-foreground">
            Contact purpose
          </label>
          <select id="purpose" className={inputClass} {...register("purpose")}>
            <option value="">Select a purpose</option>
            {PURPOSE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.purpose && (
            <p className="mt-1.5 text-[12px] font-bold uppercase tracking-wider text-danger">Please select a purpose</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-foreground">
          Subject
        </label>
        <input id="subject" type="text" className={inputClass} {...register("subject")} />
        {errors.subject && (
          <p className="mt-1.5 text-[12px] font-bold uppercase tracking-wider text-danger">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-foreground">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={inputClass}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-[12px] font-bold uppercase tracking-wider text-danger">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="consent"
          type="checkbox"
          className="mt-0.5 size-4 border-border accent-accent"
          {...register("consent")}
        />
        <label htmlFor="consent" className="text-[12px] font-bold uppercase tracking-wider text-muted leading-relaxed">
          I consent to having this website store my submitted information so I can be
          contacted.
        </label>
      </div>
      {errors.consent && (
        <p className="-mt-2 text-[12px] font-bold uppercase tracking-wider text-danger">Consent is required to send a message</p>
      )}

      {status === "error" && (
        <p className="border border-danger/50 bg-danger/10 px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-danger">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 border border-accent bg-accent px-6 text-[13px] font-bold uppercase tracking-wider text-accent-foreground transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_var(--glow)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
