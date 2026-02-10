import { z } from "zod";

export const userProfileSchema = z.object({
  id: z.string().cuid(),
  clerkId: z.string(),
  username: z.string().min(3).max(30),
  displayName: z.string().min(1).max(100),
  avatarUrl: z.string().url().nullable(),
  bio: z.string().max(500).nullable(),
  preferredLocale: z.enum(["de", "en"]),
  preferredCurrency: z.enum(["EUR", "USD"]),
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  preferredLocale: z.enum(["de", "en"]).optional(),
  preferredCurrency: z.enum(["EUR", "USD"]).optional(),
});
