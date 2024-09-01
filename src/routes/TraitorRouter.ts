import { Router } from "express";
import { TraitorController } from "../controllers/TraitorController";

const router = Router();

let Traitor: TraitorController = new TraitorController();

router.get('/traitor/get/list',Traitor.get);
router.get('/traitor/get/info/:id',Traitor.getInformation);
router.post('/traitor/create/object',Traitor.createTraitor);
router.delete('/traitor/delete/:id',Traitor.deleteTraitor);
router.get('/traitor/close/:id',Traitor.closeTraitor);
router.get('/traitor/open/:id',Traitor.openTraitor);
router.get('/traitor/items/:id',Traitor.getItemsByID);
router.post(`/traitor/save/fabric`, Traitor.saveFabricData);

export default router; 