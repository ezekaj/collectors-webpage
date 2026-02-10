import { createTRPCRouter, publicProcedure } from "./trpc";
import { itemRouter } from "./routers/item";
import { collectionRouter } from "./routers/collection";
import { marketplaceRouter } from "./routers/marketplace";
import { gradingRouter } from "./routers/grading";
import { catalogueRouter } from "./routers/catalogue";
import { communityRouter } from "./routers/community";
import { userRouter } from "./routers/user";
import { auctionRouter } from "./routers/auction";
import { priceGuideRouter } from "./routers/priceGuide";
import { editorialRouter } from "./routers/editorial";

export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => {
    return { status: "ok", timestamp: new Date().toISOString() };
  }),
  item: itemRouter,
  collection: collectionRouter,
  marketplace: marketplaceRouter,
  grading: gradingRouter,
  catalogue: catalogueRouter,
  community: communityRouter,
  user: userRouter,
  auction: auctionRouter,
  priceGuide: priceGuideRouter,
  editorial: editorialRouter,
});

export type AppRouter = typeof appRouter;
