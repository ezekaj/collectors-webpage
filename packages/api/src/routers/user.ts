import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getProfile: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.user.findUnique({
      where: { id: input.id, deletedAt: null },
      include: {
        xp: true,
        badges: { include: { badge: true } },
        _count: {
          select: {
            followers: true,
            following: true,
            collections: true,
          },
        },
      },
    });
  }),

  getMe: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.userId },
      include: {
        xp: true,
        badges: { include: { badge: true } },
      },
    });
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        displayName: z.string().min(1).max(50).optional(),
        bio: z.string().max(500).optional(),
        avatarUrl: z.string().url().optional(),
        preferredLocale: z.enum(["de", "en"]).optional(),
        preferredCurrency: z.enum(["EUR", "USD"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.userId },
        data: input,
      });
    }),

  getActivity: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(50).default(20),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const activities = await ctx.db.activity.findMany({
        where: { userId: input.userId },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (activities.length > input.limit) {
        const next = activities.pop();
        nextCursor = next?.id;
      }

      return { activities, nextCursor };
    }),
});
