import { z } from "zod";

export const rarityRatingSchema = z.enum([
  "COMMON",
  "UNCOMMON",
  "RARE",
  "VERY_RARE",
  "ULTRA_RARE",
  "CHASE",
  "ONE_OF_ONE",
]);

export const conditionGradeSchema = z.enum([
  "GEM_MINT",
  "MINT",
  "NEAR_MINT_MINT",
  "NEAR_MINT",
  "EXCELLENT",
  "VERY_GOOD",
  "GOOD",
  "FAIR",
  "POOR",
]);

export const currencySchema = z.enum(["EUR", "USD"]);

export const itemSchema = z.object({
  id: z.string().cuid(),
  categoryId: z.string().cuid(),
  name: z.string().min(1).max(255),
  description: z.string().nullable(),
  year: z.number().int().min(1900).max(2100).nullable(),
  manufacturer: z.string().nullable(),
  series: z.string().nullable(),
  modelNumber: z.string().nullable(),
  barcode: z.string().nullable(),
  attributes: z.record(z.unknown()),
  rarityRating: rarityRatingSchema,
  estimatedValueCents: z.number().int().nonnegative().nullable(),
  currency: currencySchema,
});

export const createItemSchema = z.object({
  categoryId: z.string().cuid(),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  manufacturer: z.string().optional(),
  series: z.string().optional(),
  modelNumber: z.string().optional(),
  barcode: z.string().optional(),
  attributes: z.record(z.unknown()).default({}),
  rarityRating: rarityRatingSchema.default("COMMON"),
  estimatedValueCents: z.number().int().nonnegative().optional(),
  currency: currencySchema.default("EUR"),
});

export const itemSearchSchema = z.object({
  query: z.string().min(1).max(200),
  categoryId: z.string().cuid().optional(),
  rarityRating: rarityRatingSchema.optional(),
  minPrice: z.number().int().nonnegative().optional(),
  maxPrice: z.number().int().nonnegative().optional(),
  currency: currencySchema.optional(),
  year: z.number().int().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});
