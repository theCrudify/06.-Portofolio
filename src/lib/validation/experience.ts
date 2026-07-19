import { z } from "zod";
import { requiredDateString, optionalDateString } from "./common";

export const experienceSchema = z.object({
  companyName: z.string().trim().min(1).max(200),
  publicCompanyName: z.string().trim().min(1).max(200),
  position: z.string().trim().min(1).max(200),
  employmentType: z.enum(["professional", "internship", "freelance", "personal", "open_source"]),
  employmentBasis: z.string().trim().max(200).optional().or(z.literal("")),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  startDate: requiredDateString,
  endDate: optionalDateString,
  isCurrent: z.boolean(),
  summary: z.string().trim().max(2000).optional().or(z.literal("")),
  responsibilities: z.array(z.string().trim().min(1)).max(30),
  achievements: z.array(z.string().trim().min(1)).max(30),
  technologyIds: z.array(z.string().trim().min(1)).max(50),
  companyLogo: z.string().trim().max(500).optional().or(z.literal("")),
  website: z.string().trim().max(500).optional().or(z.literal("")),
  sortOrder: z.number().int(),
  isPublished: z.boolean(),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
