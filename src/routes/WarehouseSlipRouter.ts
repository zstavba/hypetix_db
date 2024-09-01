import { Router } from "express";
import { WarehouseSlipController } from "../controllers/WarehouseSlipController";

const router = Router();

const Slip: WarehouseSlipController = new WarehouseSlipController();

router.post("/create/slip",Slip.createSlip);
router.get('/list/slips',Slip.getSlips);
router.get('/list/slips/by/:id',Slip.getSlipsByID);
router.delete('/delete/slip/:id',Slip.deleteSlip);
router.post(`/slip/save/slips`,Slip.saveSlipItem);



export default router; 