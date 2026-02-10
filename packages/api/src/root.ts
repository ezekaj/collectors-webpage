import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => {
    return { status: "ok", timestamp: new Date().toISOString() };
  }),

  // Domain routers will be added as they are built:
  // item: itemRouter,
  // collection: collectionRouter,
  // marketplace: marketplaceRouter,
  // grading: gradingRouter,
  // catalogue: catalogueRouter,
  // community: communityRouter,
  // user: userRouter,
  // notification: notificationRouter,
  // auction: auctionRouter,
  // priceGuide: priceGuideRouter,
  // editorial: editorialRouter,
  // admin: adminRouter,
});

export type AppRouter = typeof appRouter;
