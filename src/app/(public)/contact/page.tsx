import { ContactForm } from "@/components/public/contact-form";
import { Container } from "@/components/shared/container";
import { getProfile } from "@/modules/profile/profile.service";
import { getSiteSettings } from "@/modules/settings/site-settings.service";

export const dynamic = "force-dynamic";

const AVAILABILITY_LABEL: Record<string, string> = {
  open: "Available for new opportunities",
  limited: "Limited availability",
  unavailable: "Not currently available",
};

export default async function ContactPage() {
  const [profile, siteSettings] = await Promise.all([getProfile(), getSiteSettings()]);

  const availabilityLabel = profile?.availabilityStatus
    ? AVAILABILITY_LABEL[profile.availabilityStatus] ?? null
    : null;

  return (
    <Container as="main">
      <div className="py-12 lg:py-16">
      <p className="id-badge text-label text-accent">01. Contact</p>
      <h1 className="text-h1 mt-2 text-foreground">Get in Touch</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-10">
        <div>
          {availabilityLabel && (
            <p className="mb-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-success">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {availabilityLabel}
            </p>
          )}
          <p className="text-body text-muted">
            I&apos;m open to full-time roles, freelance projects, and technical
            collaboration. Send a message and I&apos;ll get back to you as soon as
            possible.
          </p>

          {(siteSettings?.publicEmail || siteSettings?.socialLinks?.linkedin) && (
            <div className="mt-6 flex flex-col gap-3">
              {siteSettings?.publicEmail && (
                <a
                  href={`mailto:${siteSettings.publicEmail}`}
                  className="cyber-card cyber-card-hover hud-frame-corners inline-flex items-center gap-2 px-4 py-3 text-body font-semibold text-foreground transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-muted">
                    <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                    <path d="M19 8.839l-7.626 3.813a2.5 2.5 0 0 1-2.748 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                  </svg>
                  {siteSettings.publicEmail}
                </a>
              )}
              {siteSettings?.socialLinks?.linkedin && (
                <a
                  href={siteSettings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-card cyber-card-hover hud-frame-corners inline-flex items-center gap-2 px-4 py-3 text-body font-semibold text-foreground transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-muted">
                    <path fillRule="evenodd" d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z" clipRule="evenodd" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>

        <ContactForm />
      </div>
      </div>
    </Container>
  );
}
