import { z } from "zod";
import { optionalDateString } from "./common";

export const achievementSchema = z.object({
  title: z.string().trim().min(1).max(200),
  type: z.enum([
    "award",
    "competition",
    "scholarship",
    "certification",
    "leadership",
    "organization",
    "speaking_engagement",
  ]),
  issuer: z.string().trim().max(200).optional().or(z.literal("")),
  date: optionalDateString,
  endDate: optionalDateString,
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  evidenceUrl: z.string().trim().max(500).optional().or(z.literal("")),
  sortOrder: z.number().int(),
  isPublished: z.boolean(),
});

export type AchievementInput = z.infer<typeof achievementSchema>;
