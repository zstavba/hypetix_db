import { Router } from "express";
import { WorkProcedureController } from "../controllers/WorkProcedureController";
import { WorkOrderController } from "../controllers/WorkorderController";

const router = Router();

const WorkOrder: WorkOrderController = new WorkOrderController();

router.post('/create',WorkOrder.createWorkorder);
router.get('/get/list',WorkOrder.getWorkorder);

export default router; 