import { Router } from "express";
import { LocationsController } from "../controllers/LocationsController";
import multer = require("multer");
import path = require("path");
import { MaterialSheetController } from "../controllers/MaterialSheetController";
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

const MS: MaterialSheetController = new MaterialSheetController();

router.get('/material/sheet/get/list',MS.getMaterialSheets);
router.post('/material/sheet/create',MS.createMaterialSheet);
router.delete('/material/sheet/delete/:id',MS.deleteMaterialSheetItem);
router.get('/material/sheet/get/info/:id',MS.getInformation);
router.get('/material/sheet/items/:id',MS.getMaterialSheetItemsByID);
router.post('/material/sheet/create/item/:id',MS.createMaterialSheetItem)
router.post('/material/sheet/update/usage',MS.setMaterialSheetUsage)
router.delete('/material/sheet/delete/item/:id',MS.deleteMaterialSheetItem);


export default router; 