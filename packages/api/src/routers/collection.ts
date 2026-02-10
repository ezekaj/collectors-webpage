import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const collectionRouter = createTRPCRouter({
  getMyCollections: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.collection.findMany({
      where: { userId: ctx.userId, deletedAt: null },
      include: {
        _count: { select: { items: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const collection = await ctx.db.collection.findUnique({
      where: { id: input.id, deletedAt: null },
      include: {
        items: {
          include: {
            item: { include: { images: { take: 1 }, category: true } },
            variant: true,
            gradingResult: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!collection) return null;
    if (!collection.isPublic && collection.userId !== ctx.userId) return null;

    return collection;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        isPublic: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.collection.create({
        data: {
          userId: ctx.userId,
          name: input.name,
          description: input.description,
          isPublic: input.isPublic,
        },
      });
    }),

  addItem: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        itemId: z.string(),
        variantId: z.string().optional(),
        quantity: z.number().int().min(1).default(1),
        condition: z.enum(["MINT", "NEAR_MINT", "EXCELLENT", "VERY_GOOD", "GOOD", "FAIR", "POOR"]).optional(),
        purchasePriceCents: z.number().int().optional(),
        purchaseCurrency: z.enum(["EUR", "USD"]).optional(),
        isWishlist: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const collection = await ctx.db.collection.findFirst({
        where: { id: input.collectionId, userId: ctx.userId, deletedAt: null },
      });
      if (!collection) throw new Error("Collection not found");

      return ctx.db.collectionItem.create({
        data: {
          collectionId: input.collectionId,
          itemId: input.itemId,
          variantId: input.variantId,
          quantity: input.quantity,
          condition: input.condition,
          purchasePriceCents: input.purchasePriceCents,
          purchaseCurrency: input.purchaseCurrency,
          isWishlist: input.isWishlist,
        },
      });
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    const [totalItems, totalCollections, wishlistItems] = await Promise.all([
      ctx.db.collectionItem.count({
        where: {
          collection: { userId: ctx.userId, deletedAt: null },
          isWishlist: false,
        },
      }),
      ctx.db.collection.count({
        where: { userId: ctx.userId, deletedAt: null },
      }),
      ctx.db.collectionItem.count({
        where: {
          collection: { userId: ctx.userId, deletedAt: null },
          isWishlist: true,
        },
      }),
    ]);

    return { totalItems, totalCollections, wishlistItems };
  }),
});
