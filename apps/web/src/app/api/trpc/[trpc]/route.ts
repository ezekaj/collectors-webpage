import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext } from "@sammelfieber/api";

function getUserId(): string | null {
  try {
    const { auth } = require("@clerk/nextjs/server");
    const { userId } = auth();
    return userId;
  } catch {
    return null;
  }
}

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ userId: getUserId() }),
  });

export { handler as GET, handler as POST };
