import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, portfolioTable } from "@workspace/db";
import { ListPortfolioQueryParams, ListPortfolioResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/portfolio", async (req, res): Promise<void> => {
  const query = ListPortfolioQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let dbQuery = db.select().from(portfolioTable).$dynamic();

  if (query.data.category && query.data.category !== "all") {
    dbQuery = dbQuery.where(eq(portfolioTable.category, query.data.category));
  }

  if (query.data.featured !== undefined) {
    dbQuery = dbQuery.where(eq(portfolioTable.featured, query.data.featured));
  }

  const items = await dbQuery.orderBy(asc(portfolioTable.sortOrder));
  res.json(ListPortfolioResponse.parse(items));
});

export default router;
