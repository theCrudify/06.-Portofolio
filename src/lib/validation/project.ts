import { z } from "zod";
import { slugField, optionalDateString } from "./common";

export const projectSeoSchema = z.object({
  title: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(300).optional().or(z.literal("")),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: slugField,
  shortDescription: z.string().trim().min(1).max(400),
  overview: z.string().trim().max(4000).optional().or(z.literal("")),
  businessContext: z.string().trim().max(4000).optional().or(z.literal("")),
  problems: z.string().trim().max(4000).optional().or(z.literal("")),
  responsibilities: z.array(z.string().trim().min(1)).max(30),
  solution: z.string().trim().max(4000).optional().or(z.literal("")),
  keyFeatures: z.array(z.string().trim().min(1)).max(30),
  businessWorkflow: z.string().trim().max(4000).optional().or(z.literal("")),
  architectureDescription: z.string().trim().max(4000).optional().or(z.literal("")),
  technicalChallenges: z.string().trim().max(4000).optional().or(z.literal("")),
  results: z.array(z.string().trim().min(1)).max(30),
  industryId: z.string().trim().optional().or(z.literal("")),
  projectTypeId: z.string().trim().optional().or(z.literal("")),
  employmentType: z.enum(["professional", "internship", "freelance", "personal", "open_source"]),
  role: z.string().trim().max(200).optional().or(z.literal("")),
  relatedExperienceId: z.string().trim().optional().or(z.literal("")),
  technologyIds: z.array(z.string().trim().min(1)).max(50),
  integrationIds: z.array(z.string().trim().min(1)).max(50),
  startDate: optionalDateString,
  endDate: optionalDateString,
  coverImage: z.string().trim().max(500).optional().or(z.literal("")),
  publicClientLabel: z.string().trim().min(1).max(200),
  confidentialityNotice: z.string().trim().max(1000).optional().or(z.literal("")),
  visibility: z.enum(["public", "anonymized", "private"]),
  status: z.enum(["draft", "published", "archived"]),
  isFeatured: z.boolean(),
  featuredOrder: z.number().int(),
  sortOrder: z.number().int(),
  seo: projectSeoSchema,
});

export type ProjectInput = z.infer<typeof projectSchema>;
