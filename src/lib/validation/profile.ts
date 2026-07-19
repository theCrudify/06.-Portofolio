import { z } from "zod";

export const profileStatisticSchema = z.object({
  label: z.string().trim().min(1).max(60),
  value: z.string().trim().min(1).max(30),
});

export const profileSchema = z.object({
  fullName: z.string().trim().min(1).max(150),
  professionalTitle: z.string().trim().min(1).max(150),
  shortSummary: z.string().trim().min(1).max(500),
  aboutContent: z.string().trim().max(6000).optional().or(z.literal("")),
  publicLocation: z.string().trim().max(150).optional().or(z.literal("")),
  publicEmail: z.string().trim().max(200).optional().or(z.literal("")),
  profileImage: z.string().trim().max(500).optional().or(z.literal("")),
  availabilityStatus: z.enum(["open", "limited", "unavailable"]),
  primaryCTA: z.string().trim().min(1).max(60),
  secondaryCTA: z.string().trim().min(1).max(60),
  statistics: z.array(profileStatisticSchema).max(8),
  isPublished: z.boolean(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
