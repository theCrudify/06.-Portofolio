import { z } from "zod";

export const siteSettingsSchema = z.object({
  siteTitle: z.string().trim().min(1).max(200),
  publicEmail: z.string().trim().email().max(200),
  socialLinks: z.object({
    github: z.string().trim().max(300).optional().or(z.literal("")),
    linkedin: z.string().trim().max(300).optional().or(z.literal("")),
  }),
  contactFormEnabled: z.boolean(),
  resumeDownloadEnabled: z.boolean(),
  resumeUrl: z.string().trim().max(500).optional().or(z.literal("")),
});

export const generalSettingsSchema = siteSettingsSchema.pick({
  siteTitle: true,
  publicEmail: true,
  socialLinks: true,
  contactFormEnabled: true,
});
export type GeneralSettingsInput = z.infer<typeof generalSettingsSchema>;

export const resumeSettingsSchema = siteSettingsSchema.pick({
  resumeUrl: true,
  resumeDownloadEnabled: true,
});
export type ResumeSettingsInput = z.infer<typeof resumeSettingsSchema>;
