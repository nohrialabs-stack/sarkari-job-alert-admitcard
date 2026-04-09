import { Router, type IRouter } from "express";
import healthRouter from "./health";
import admitCardsRouter from "./admit-cards";
import mockTestsRouter from "./mock-tests";

const router: IRouter = Router();

router.use(healthRouter);
router.use(admitCardsRouter);
router.use(mockTestsRouter);

export default router;
