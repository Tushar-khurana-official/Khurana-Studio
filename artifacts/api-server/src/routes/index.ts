import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingsRouter from "./bookings";
import servicesRouter from "./services";
import portfolioRouter from "./portfolio";
import testimonialsRouter from "./testimonials";
import blogRouter from "./blog";
import contactRouter from "./contact";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bookingsRouter);
router.use(servicesRouter);
router.use(portfolioRouter);
router.use(testimonialsRouter);
router.use(blogRouter);
router.use(contactRouter);
router.use(statsRouter);

export default router;
