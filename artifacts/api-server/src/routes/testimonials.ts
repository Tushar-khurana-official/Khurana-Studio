import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, testimonialsTable } from "@workspace/db";
import { ListTestimonialsQueryParams, ListTestimonialsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (req, res): Promise<void> => {
  const query = ListTestimonialsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let dbQuery = db.select().from(testimonialsTable).$dynamic();

  if (query.data.featured !== undefined) {
    dbQuery = dbQuery.where(eq(testimonialsTable.featured, query.data.featured));
  }

  const items = await dbQuery.orderBy(desc(testimonialsTable.createdAt));
  res.json(ListTestimonialsResponse.parse(items));
});

export default router;
