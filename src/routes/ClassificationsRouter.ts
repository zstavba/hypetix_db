import { Router } from "express";
import { ClassificationController } from "../controllers/ClassificationController";

const router = Router();

const CLS: ClassificationController = new ClassificationController();
router.get('/classifications/get',CLS.get);

export default router;