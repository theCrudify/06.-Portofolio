import { z } from "zod";

export const slugField = z
  .string()
  .trim()
  .min(1)
  .max(150)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only");

export const optionalNumberString = z.string().trim().max(20).optional().or(z.literal(""));

export const requiredDateString = z.string().trim().min(1, "Required");

export const optionalDateString = z.string().trim().max(20).optional().or(z.literal(""));

export function toOptionalNumber(value: string | undefined | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function toDate(value: string): Date {
  return new Date(value);
}

export function toOptionalDate(value: string | undefined | null): Date | undefined {
  if (!value) return undefined;
  return new Date(value);
}

export function dateToInputValue(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}
