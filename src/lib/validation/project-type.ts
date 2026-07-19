import { z } from "zod";
import { slugField } from "./common";

export const projectTypeSchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: slugField,
  sortOrder: z.number().int(),
});

export type ProjectTypeInput = z.infer<typeof projectTypeSchema>;
