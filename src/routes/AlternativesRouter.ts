import { Router } from "express";
import { AlternativeChipersController } from "../controllers/AlternativeChipersController";

const router = Router();
const alternatives: AlternativeChipersController = new AlternativeChipersController();

router.post('/alternative/chipers/create/marketing', alternatives.createMakretingChiper);
router.post('/alternative/chipers/create/default', alternatives.createDefaultInformation);
router.get('/alternative/chipers/makreting/get/:id',alternatives.getMarketingInformation);
router.get('/alternative/list',alternatives.getList);


export default router;
