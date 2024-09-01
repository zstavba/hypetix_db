import { Router } from "express";
import { TechnologicalUnitsController } from "../controllers/TechnologicalUnitsController";

const router = Router();


let TU : TechnologicalUnitsController = new TechnologicalUnitsController();
router.get('/technological/units/get',TU.get);
router.get('/technological/units/get/info/:id',TU.getInformation);
router.get('/technological/units/upload',TU.upload);

export default router; 