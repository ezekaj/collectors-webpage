import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const gradingRouter = createTRPCRouter({
  createSession: protectedProcedure
    .input(
      z.object({
        itemId: z.string().optional(),
        carType: z.enum(["LOOSE", "CARDED", "BOXED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gradingSession.create({
        data: {
          userId: ctx.userId,
          itemId: input.itemId,
          carType: input.carType,
          status: "PENDING",
        },
      });
    }),

  addImage: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        imageUrl: z.string().url(),
        angle: z.enum(["TOP", "LEFT", "RIGHT", "BOTTOM", "CARD_FRONT", "CARD_BACK"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db.gradingSession.findFirst({
        where: { id: input.sessionId, userId: ctx.userId },
      });
      if (!session) throw new Error("Session not found");

      return ctx.db.gradingImage.create({
        data: {
          sessionId: input.sessionId,
          imageUrl: input.imageUrl,
          angle: input.angle,
        },
      });
    }),

  submitForGrading: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db.gradingSession.findFirst({
        where: { id: input.sessionId, userId: ctx.userId },
        include: { images: true },
      });
      if (!session) throw new Error("Session not found");
      if (session.images.length < 3) throw new Error("At least 3 images required");

      await ctx.db.gradingSession.update({
        where: { id: input.sessionId },
        data: { status: "PROCESSING" },
      });

      // TODO: Queue BullMQ job for AI grading pipeline
      return { sessionId: input.sessionId, status: "PROCESSING" };
    }),

  getSession: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.gradingSession.findFirst({
        where: { id: input.sessionId, userId: ctx.userId },
        include: {
          images: true,
          result: true,
          item: { include: { images: { take: 1 } } },
        },
      });
    }),

  getMyHistory: protectedProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const sessions = await ctx.db.gradingSession.findMany({
        where: { userId: ctx.userId },
        include: {
          result: true,
          item: { include: { images: { take: 1 } } },
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (sessions.length > input.limit) {
        const next = sessions.pop();
        nextCursor = next?.id;
      }

      return { sessions, nextCursor };
    }),

  submitFeedback: protectedProcedure
    .input(
      z.object({
        resultId: z.string(),
        feedbackType: z.enum(["AGREE", "DISAGREE", "ADJUST"]),
        suggestedGrade: z.number().min(1).max(10).optional(),
        comment: z.string().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gradingFeedback.create({
        data: {
          resultId: input.resultId,
          userId: ctx.userId,
          feedbackType: input.feedbackType,
          suggestedGrade: input.suggestedGrade,
          comment: input.comment,
        },
      });
    }),
});
