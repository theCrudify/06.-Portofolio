import { z } from "zod";
import { slugField } from "./common";

export const industrySchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: slugField,
  sortOrder: z.number().int(),
});

export type IndustryInput = z.infer<typeof industrySchema>;
