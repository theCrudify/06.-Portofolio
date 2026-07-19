import { z } from "zod";
import { optionalNumberString, optionalDateString, requiredDateString } from "./common";

export const educationSchema = z.object({
  institution: z.string().trim().min(1).max(200),
  degree: z.string().trim().min(1).max(200),
  fieldOfStudy: z.string().trim().max(200).optional().or(z.literal("")),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  startDate: requiredDateString,
  endDate: optionalDateString,
  gpa: optionalNumberString,
  maximumGpa: optionalNumberString,
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  scholarships: z.array(z.string().trim().min(1)).max(20),
  sortOrder: z.number().int(),
  isPublished: z.boolean(),
});

export type EducationInput = z.infer<typeof educationSchema>;
