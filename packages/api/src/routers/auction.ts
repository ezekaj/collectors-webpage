import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const auctionRouter = createTRPCRouter({
  getUpcoming: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.auction.findMany({
        where: {
          status: { in: ["SCHEDULED", "LIVE"] },
        },
        include: {
          lots: {
            take: 3,
            include: {
              listing: {
                include: { item: { include: { images: { take: 1 } } } },
              },
            },
          },
          _count: { select: { lots: true } },
        },
        take: input.limit,
        orderBy: { startTime: "asc" },
      });
    }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.auction.findUnique({
      where: { id: input.id },
      include: {
        lots: {
          include: {
            listing: {
              include: { item: { include: { images: true } } },
            },
            bids: {
              take: 10,
              orderBy: { createdAt: "desc" },
              include: { bidder: { select: { id: true, displayName: true } } },
            },
            currentBidder: { select: { id: true, displayName: true } },
          },
          orderBy: { lotNumber: "asc" },
        },
        curator: { select: { id: true, displayName: true } },
      },
    });
  }),

  placeBid: protectedProcedure
    .input(
      z.object({
        lotId: z.string(),
        amountCents: z.number().int().min(1),
        currency: z.enum(["EUR", "USD"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const lot = await ctx.db.auctionLot.findUnique({
        where: { id: input.lotId },
        include: { auction: true },
      });
      if (!lot) throw new Error("Lot not found");
      if (lot.auction.status !== "LIVE") throw new Error("Auction is not live");
      if (input.amountCents <= (lot.currentBidCents ?? lot.startingPriceCents - 1)) {
        throw new Error("Bid must be higher than current bid");
      }

      const bid = await ctx.db.bid.create({
        data: {
          lotId: input.lotId,
          bidderId: ctx.userId,
          amountCents: input.amountCents,
          currency: input.currency,
        },
      });

      await ctx.db.auctionLot.update({
        where: { id: input.lotId },
        data: {
          currentBidCents: input.amountCents,
          currentBidderId: ctx.userId,
          bidCount: { increment: 1 },
        },
      });

      return bid;
    }),

  setAutoBid: protectedProcedure
    .input(
      z.object({
        lotId: z.string(),
        maxAmountCents: z.number().int().min(1),
        incrementCents: z.number().int().min(100).default(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.autoBidConfig.upsert({
        where: {
          lotId_userId: { lotId: input.lotId, userId: ctx.userId },
        },
        create: {
          lotId: input.lotId,
          userId: ctx.userId,
          maxAmountCents: input.maxAmountCents,
          incrementCents: input.incrementCents,
        },
        update: {
          maxAmountCents: input.maxAmountCents,
          incrementCents: input.incrementCents,
        },
      });
    }),
});
