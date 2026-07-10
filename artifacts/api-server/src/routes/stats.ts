import { Router, type IRouter } from "express";
import { eq, count } from "drizzle-orm";
import { db, bookingsTable } from "@workspace/db";
import { GetStudioStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [totalResult] = await db.select({ count: count() }).from(bookingsTable);
  const [pendingResult] = await db
    .select({ count: count() })
    .from(bookingsTable)
    .where(eq(bookingsTable.status, "pending"));

  const stats = {
    yearsExperience: 10,
    happyClients: 1000,
    photosDelivered: 5000,
    clientRating: 4.9,
    totalBookings: totalResult?.count ?? 0,
    pendingBookings: pendingResult?.count ?? 0,
  };

  res.json(GetStudioStatsResponse.parse(stats));
});

export default router;
