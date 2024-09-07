import { Router } from "express";
import { WorkProcedureController } from "../controllers/WorkProcedureController";
import multer = require("multer");
import path = require("path");
import { WorkSheetController } from "../controllers/WorkSheetController";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'assets/uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage: storage });
const router = Router();

let WorkSHeet: WorkSheetController = new WorkSheetController();

router.post('/work/sheet/create',WorkSHeet.createWorkSheet);
router.get('/work/sheet/get',WorkSHeet.getWorkSheets);
router.get('/work/sheet/info/:id',WorkSHeet.getWorkSheetInformation);
router.get('/work/sheet/get/items/:id',WorkSHeet.getItemsById);
router.delete("/work/sheet/delete/item/:id",WorkSHeet.deleteWorkSheetItem);
router.post('/work/sheet/create/item',WorkSHeet.createWorkSHeetItem);
router.post('/work/sheet/item/update/:id',WorkSHeet.updateSelectedItem);
router.post('/work/sheet/update/data/:id',WorkSHeet.updateWorkSheet);
router.delete('/work/sheet/delete/:id',WorkSHeet.deleteWorkSheet);

export default router;