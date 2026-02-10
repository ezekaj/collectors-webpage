import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const priceGuideRouter = createTRPCRouter({
  getItemValuation: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .query(async ({ ctx, input }) => {
      const [marketValues, recentSales] = await Promise.all([
        ctx.db.marketValue.findMany({
          where: { itemId: input.itemId },
          orderBy: { calculatedAt: "desc" },
        }),
        ctx.db.priceRecord.findMany({
          where: { itemId: input.itemId },
          orderBy: { recordedAt: "desc" },
          take: 20,
        }),
      ]);

      return { marketValues, recentSales };
    }),

  getPriceHistory: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
        condition: z.enum(["MINT", "NEAR_MINT", "EXCELLENT", "VERY_GOOD", "GOOD", "FAIR", "POOR"]).optional(),
        period: z.enum(["30d", "90d", "1y", "all"]).default("90d"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const now = new Date();
      const periodMap: Record<string, Date | null> = {
        "30d": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        "90d": new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
        "1y": new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
        all: null,
      };

      const startDate = periodMap[input.period];

      return ctx.db.priceRecord.findMany({
        where: {
          itemId: input.itemId,
          ...(input.condition && { condition: input.condition }),
          ...(startDate && { recordedAt: { gte: startDate } }),
        },
        orderBy: { recordedAt: "asc" },
      });
    }),

  submitCommunityPrice: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        priceCents: z.number().int().min(1),
        currency: z.enum(["EUR", "USD"]),
        condition: z.enum(["MINT", "NEAR_MINT", "EXCELLENT", "VERY_GOOD", "GOOD", "FAIR", "POOR"]),
        priceSource: z.string(),
        notes: z.string().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.communityPriceSubmission.create({
        data: {
          userId: ctx.userId,
          itemId: input.itemId,
          priceCents: input.priceCents,
          currency: input.currency,
          condition: input.condition,
          priceSource: input.priceSource,
          notes: input.notes,
        },
      });
    }),

  getTrending: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.marketValue.findMany({
        where: {
          trendDirection: "UP",
          sampleSize: { gte: 5 },
        },
        include: {
          item: { include: { images: { take: 1 }, category: true } },
        },
        orderBy: { trendPercentage: "desc" },
        take: input.limit,
      });
    }),
});
