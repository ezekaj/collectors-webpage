import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const editorialRouter = createTRPCRouter({
  getArticles: publicProcedure
    .input(
      z.object({
        locale: z.enum(["de", "en"]),
        status: z.literal("PUBLISHED").default("PUBLISHED"),
        categorySlug: z.string().optional(),
        tag: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const articles = await ctx.db.article.findMany({
        where: {
          locale: input.locale,
          status: input.status,
          deletedAt: null,
          ...(input.categorySlug && {
            category: { slug: input.categorySlug },
          }),
          ...(input.tag && {
            tags: { some: { tag: input.tag } },
          }),
        },
        include: {
          author: { select: { id: true, displayName: true, avatarUrl: true } },
          category: true,
          tags: true,
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { publishedAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (articles.length > input.limit) {
        const next = articles.pop();
        nextCursor = next?.id;
      }

      return { articles, nextCursor };
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string(), locale: z.enum(["de", "en"]) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.article.findFirst({
        where: {
          slug: input.slug,
          locale: input.locale,
          status: "PUBLISHED",
          deletedAt: null,
        },
        include: {
          author: { select: { id: true, displayName: true, avatarUrl: true, bio: true } },
          category: true,
          tags: true,
        },
      });
    }),

  getFeatured: publicProcedure
    .input(z.object({ locale: z.enum(["de", "en"]), limit: z.number().default(5) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.article.findMany({
        where: {
          locale: input.locale,
          status: "PUBLISHED",
          isFeatured: true,
          deletedAt: null,
        },
        include: {
          author: { select: { id: true, displayName: true, avatarUrl: true } },
          category: true,
        },
        take: input.limit,
        orderBy: { publishedAt: "desc" },
      });
    }),

  getSpotlights: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(10) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.collectorSpotlight.findMany({
        include: {
          user: { select: { id: true, displayName: true, avatarUrl: true, bio: true } },
          article: { select: { id: true, slug: true, title: true, coverImageUrl: true } },
        },
        take: input.limit,
        orderBy: { featuredAt: "desc" },
      });
    }),
});
