import { z } from "zod";

export const contactMessageStatusSchema = z.enum([
  "new",
  "read",
  "replied",
  "archived",
  "spam",
]);

export type ContactMessageStatusInput = z.infer<typeof contactMessageStatusSchema>;
