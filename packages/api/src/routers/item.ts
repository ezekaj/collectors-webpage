import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.item.findUnique({
      where: { id: input.id },
      include: {
        category: true,
        images: true,
        variants: true,
        itemSeries: { include: { series: true } },
      },
    });
  }),

  search: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        categorySlug: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.item.findMany({
        where: {
          deletedAt: null,
          ...(input.categorySlug && {
            category: { slug: input.categorySlug },
          }),
          ...(input.query && {
            OR: [
              { name: { contains: input.query, mode: "insensitive" as const } },
              { manufacturer: { contains: input.query, mode: "insensitive" as const } },
            ],
          }),
        },
        include: { category: true, images: { take: 1 } },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        nextCursor = next?.id;
      }

      return { items, nextCursor };
    }),

  getByCategory: publicProcedure
    .input(
      z.object({
        categorySlug: z.string(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.item.findMany({
        where: {
          deletedAt: null,
          category: { slug: input.categorySlug },
        },
        include: { images: { take: 1 }, category: true },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { name: "asc" },
      });

      let nextCursor: string | undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        nextCursor = next?.id;
      }

      return { items, nextCursor };
    }),
});
