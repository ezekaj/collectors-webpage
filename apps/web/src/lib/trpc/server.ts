import "server-only";
import { createTRPCContext } from "@sammelfieber/api";
import { appRouter } from "@sammelfieber/api";

function getUserId(): string | null {
  try {
    const { auth } = require("@clerk/nextjs/server");
    const { userId } = auth();
    return userId;
  } catch {
    return null;
  }
}

export const serverTrpc = appRouter.createCaller(() =>
  createTRPCContext({ userId: getUserId() }),
);
