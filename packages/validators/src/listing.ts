import { z } from "zod";
import { conditionGradeSchema, currencySchema } from "./item";

export const listingTypeSchema = z.enum(["SALE", "TRADE", "AUCTION"]);

export const shippingOptionSchema = z.object({
  carrier: z.string(),
  method: z.string(),
  priceCents: z.number().int().nonnegative(),
  currency: currencySchema,
  estimatedDays: z.number().int().positive(),
});

export const listingSchema = z.object({
  id: z.string().cuid(),
  sellerId: z.string().cuid(),
  itemId: z.string().cuid(),
  type: listingTypeSchema,
  priceCents: z.number().int().nonnegative(),
  currency: currencySchema,
  condition: conditionGradeSchema,
  description: z.string().nullable(),
  shipsFrom: z.string().length(2),
  shipsTo: z.array(z.string().length(2)),
  shippingOptions: z.array(shippingOptionSchema),
});

export const createListingSchema = z.object({
  itemId: z.string().cuid(),
  type: listingTypeSchema.default("SALE"),
  priceCents: z.number().int().nonnegative(),
  currency: currencySchema.default("EUR"),
  condition: conditionGradeSchema,
  description: z.string().optional(),
  shipsFrom: z.string().length(2),
  shipsTo: z.array(z.string().length(2)).min(1),
  shippingOptions: z.array(shippingOptionSchema).min(1),
});
