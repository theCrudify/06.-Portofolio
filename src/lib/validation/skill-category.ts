import { z } from "zod";
import { slugField } from "./common";

export const skillCategorySchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: slugField,
  description: z.string().trim().max(500).optional().or(z.literal("")),
  icon: z.string().trim().max(200).optional().or(z.literal("")),
  sortOrder: z.number().int(),
  isPublished: z.boolean(),
});

export type SkillCategoryInput = z.infer<typeof skillCategorySchema>;
