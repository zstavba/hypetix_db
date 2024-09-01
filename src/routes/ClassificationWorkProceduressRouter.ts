import { Router } from "express";
import { ClassificationWorkProceduressController } from "../controllers/ClassificationWorkProceduressController";

const router = Router();

let CWP : ClassificationWorkProceduressController = new ClassificationWorkProceduressController();

router.get('/classification/work/proceduress/get',CWP.get);
router.get('/classification/work/proceduress/upload',CWP.upload);

export default router; 