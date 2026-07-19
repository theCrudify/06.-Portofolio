import { connectToDatabase } from "@/lib/database/mongodb";
import type { GeneralSettingsInput, ResumeSettingsInput } from "@/lib/validation/site-settings";
import { SiteSettingsModel, type SiteSettings } from "./site-settings.model";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  await connectToDatabase();
  return SiteSettingsModel.findOne().lean<SiteSettings>();
}

export async function upsertSiteSettings(
  input: GeneralSettingsInput | ResumeSettingsInput
): Promise<void> {
  await connectToDatabase();
  await SiteSettingsModel.findOneAndUpdate(
    {},
    { $set: input },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}
