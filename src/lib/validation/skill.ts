import { z } from "zod";
import { slugField, optionalNumberString } from "./common";

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: slugField,
  categoryId: z.string().trim().min(1, "Select a category"),
  proficiency: z.enum(["primary", "proficient", "working_knowledge", "familiar"]),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  icon: z.string().trim().max(200).optional().or(z.literal("")),
  yearsOfUse: optionalNumberString,
  isFeatured: z.boolean(),
  sortOrder: z.number().int(),
  isPublished: z.boolean(),
});

export type SkillInput = z.infer<typeof skillSchema>;
