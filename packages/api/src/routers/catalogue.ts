import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const catalogueRouter = createTRPCRouter({
  getPages: publicProcedure
    .input(
      z.object({
        seriesId: z.string().optional(),
        year: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.cataloguePage.findMany({
        where: {
          ...(input.seriesId && { seriesId: input.seriesId }),
          ...(input.year && { year: input.year }),
        },
        include: {
          series: true,
          slots: {
            include: { item: { include: { images: { take: 1 } } } },
            orderBy: [{ positionRow: "asc" }, { positionCol: "asc" }],
          },
        },
        orderBy: { pageNumber: "asc" },
      });
    }),

  getProgress: protectedProcedure
    .input(z.object({ seriesId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const where = {
        userId: ctx.userId,
        ...(input.seriesId && {
          slot: { page: { seriesId: input.seriesId } },
        }),
      };

      const [collected, total] = await Promise.all([
        ctx.db.catalogueProgress.count({ where }),
        ctx.db.catalogueSlot.count({
          where: input.seriesId ? { page: { seriesId: input.seriesId } } : {},
        }),
      ]);

      return { collected, total, percentage: total > 0 ? (collected / total) * 100 : 0 };
    }),

  collectItem: protectedProcedure
    .input(z.object({ slotId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.catalogueProgress.findUnique({
        where: {
          userId_slotId: { userId: ctx.userId, slotId: input.slotId },
        },
      });
      if (existing) return existing;

      return ctx.db.catalogueProgress.create({
        data: {
          userId: ctx.userId,
          slotId: input.slotId,
        },
      });
    }),

  getSeries: publicProcedure
    .input(z.object({ categorySlug: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.series.findMany({
        where: {
          deletedAt: null,
          ...(input.categorySlug && {
            category: { slug: input.categorySlug },
          }),
        },
        include: {
          _count: { select: { cataloguePages: true } },
        },
        orderBy: { year: "desc" },
      });
    }),
});
