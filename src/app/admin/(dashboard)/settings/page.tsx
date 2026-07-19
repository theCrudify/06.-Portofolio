import { getSiteSettings } from "@/modules/settings/site-settings.service";
import type { GeneralSettingsInput } from "@/lib/validation/site-settings";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  const defaultValues: GeneralSettingsInput = {
    siteTitle: settings?.siteTitle ?? "",
    publicEmail: settings?.publicEmail ?? "",
    socialLinks: {
      github: settings?.socialLinks?.github ?? "",
      linkedin: settings?.socialLinks?.linkedin ?? "",
    },
    contactFormEnabled: settings?.contactFormEnabled ?? true,
  };

  return (
    <div>
      <h1 className="text-h2 font-semibold text-foreground">Site Settings</h1>
      <p className="text-body mt-1 text-muted">
        Site title, public contact email, and social links.
      </p>
      <SettingsForm defaultValues={defaultValues} />
    </div>
  );
}
