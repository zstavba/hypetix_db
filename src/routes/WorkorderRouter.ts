import { Router } from "express";
import { WorkProcedureController } from "../controllers/WorkProcedureController";
import { WorkOrderController } from "../controllers/WorkorderController";

const router = Router();

const WorkOrder: WorkOrderController = new WorkOrderController();

router.post('/create',WorkOrder.createWorkorder);
router.get('/get/list',WorkOrder.getWorkorder);
router.get('/get/info/:id',WorkOrder.getInformation);
router.delete('/delete/workorder/:id',WorkOrder.deleteWorkOrder);

export default router; 