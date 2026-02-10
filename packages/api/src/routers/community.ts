import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const communityRouter = createTRPCRouter({
  getPosts: publicProcedure
    .input(
      z.object({
        type: z.enum(["WANTED", "SHOWCASE", "DISCUSSION"]).optional(),
        categorySlug: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          deletedAt: null,
          ...(input.type && { type: input.type }),
          ...(input.categorySlug && {
            category: { slug: input.categorySlug },
          }),
        },
        include: {
          user: true,
          category: true,
          _count: { select: { comments: true } },
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (posts.length > input.limit) {
        const next = posts.pop();
        nextCursor = next?.id;
      }

      return { posts, nextCursor };
    }),

  createPost: protectedProcedure
    .input(
      z.object({
        type: z.enum(["WANTED", "SHOWCASE", "DISCUSSION"]),
        title: z.string().min(1).max(200),
        content: z.string().max(10000),
        categoryId: z.string().optional(),
        locale: z.enum(["de", "en"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          userId: ctx.userId,
          type: input.type,
          title: input.title,
          content: input.content,
          categoryId: input.categoryId,
          locale: input.locale,
        },
      });
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        postId: z.string().optional(),
        articleId: z.string().optional(),
        content: z.string().min(1).max(5000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.postId && !input.articleId) {
        throw new Error("Must provide postId or articleId");
      }
      return ctx.db.comment.create({
        data: {
          userId: ctx.userId,
          postId: input.postId,
          articleId: input.articleId,
          content: input.content,
        },
      });
    }),

  follow: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.userId === ctx.userId) throw new Error("Cannot follow yourself");
      return ctx.db.follow.create({
        data: { followerId: ctx.userId, followingId: input.userId },
      });
    }),

  unfollow: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.follow.delete({
        where: {
          followerId_followingId: {
            followerId: ctx.userId,
            followingId: input.userId,
          },
        },
      });
    }),

  getEvents: publicProcedure
    .input(
      z.object({
        upcoming: z.boolean().default(true),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.event.findMany({
        where: {
          deletedAt: null,
          ...(input.upcoming && { startTime: { gte: new Date() } }),
        },
        include: {
          _count: { select: { participants: true } },
          createdBy: true,
        },
        take: input.limit,
        orderBy: { startTime: "asc" },
      });
    }),
});
