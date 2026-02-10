import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const marketplaceRouter = createTRPCRouter({
  getListings: publicProcedure
    .input(
      z.object({
        type: z.enum(["SALE", "TRADE", "AUCTION"]).optional(),
        categorySlug: z.string().optional(),
        condition: z.enum(["MINT", "NEAR_MINT", "EXCELLENT", "VERY_GOOD", "GOOD", "FAIR", "POOR"]).optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        currency: z.enum(["EUR", "USD"]).optional(),
        query: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const listings = await ctx.db.listing.findMany({
        where: {
          status: "ACTIVE",
          deletedAt: null,
          ...(input.type && { type: input.type }),
          ...(input.condition && { condition: input.condition }),
          ...(input.currency && { currency: input.currency }),
          ...(input.minPrice && { priceCents: { gte: input.minPrice } }),
          ...(input.maxPrice && { priceCents: { lte: input.maxPrice } }),
          ...(input.categorySlug && {
            item: { category: { slug: input.categorySlug } },
          }),
          ...(input.query && {
            OR: [
              { title: { contains: input.query, mode: "insensitive" as const } },
              { description: { contains: input.query, mode: "insensitive" as const } },
            ],
          }),
        },
        include: {
          item: { include: { images: { take: 1 }, category: true } },
          images: { take: 1 },
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (listings.length > input.limit) {
        const next = listings.pop();
        nextCursor = next?.id;
      }

      return { listings, nextCursor };
    }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.listing.findUnique({
      where: { id: input.id, deletedAt: null },
      include: {
        item: {
          include: { images: true, category: true, variants: true },
        },
        images: true,
        seller: true,
        offers: {
          where: { status: "PENDING" },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        variantId: z.string().optional(),
        type: z.enum(["SALE", "TRADE", "AUCTION"]),
        title: z.string().min(1).max(200),
        description: z.string().max(5000).optional(),
        priceCents: z.number().int().min(0),
        currency: z.enum(["EUR", "USD"]),
        condition: z.enum(["MINT", "NEAR_MINT", "EXCELLENT", "VERY_GOOD", "GOOD", "FAIR", "POOR"]),
        shipsFrom: z.string(),
        shipsTo: z.array(z.string()),
        shippingOptions: z.array(z.object({
          method: z.string(),
          priceCents: z.number().int(),
          currency: z.enum(["EUR", "USD"]),
          estimatedDays: z.number().int().optional(),
        })),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.create({
        data: {
          sellerId: ctx.userId,
          itemId: input.itemId,
          variantId: input.variantId,
          type: input.type,
          title: input.title,
          description: input.description,
          priceCents: input.priceCents,
          currency: input.currency,
          condition: input.condition,
          shipsFrom: input.shipsFrom,
          shipsTo: input.shipsTo,
          shippingOptions: input.shippingOptions,
          status: "ACTIVE",
        },
      });
    }),

  makeOffer: protectedProcedure
    .input(
      z.object({
        listingId: z.string(),
        amountCents: z.number().int().min(1),
        currency: z.enum(["EUR", "USD"]),
        message: z.string().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.offer.create({
        data: {
          listingId: input.listingId,
          buyerId: ctx.userId,
          amountCents: input.amountCents,
          currency: input.currency,
          message: input.message,
          status: "PENDING",
          expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
        },
      });
    }),
});
