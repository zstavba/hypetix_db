import { Router } from "express";
import { WarehouseController } from "../controllers/WarehouseControler";
import multer = require("multer");
import path = require("path");
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

const Warehouse: WarehouseController = new WarehouseController();

router.get('/warehouse',Warehouse.getList);  
router.post('/warehouse/upload/file',upload.single('warehouse_file'),Warehouse.upload);

export default router;