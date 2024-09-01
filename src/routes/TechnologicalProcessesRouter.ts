import { Router } from "express";
import { TechnologicalProcessesController } from "../controllers/TechnologicalProcessesController";

const router = Router();

let TP: TechnologicalProcessesController = new TechnologicalProcessesController();

router.get('/technological/processes/get',TP.get);
router.get('/technological/processes/upload',TP.upload);

export default router;