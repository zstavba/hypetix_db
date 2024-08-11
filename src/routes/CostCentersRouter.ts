import { Router } from "express";
import { CostCentersController } from "../controllers/CostCentersController";
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


const CS: CostCentersController = new CostCentersController();
router.post('/cost/centers/upload',upload.single('cost_center_file'),CS.upload);
router.get('/cost/centers/get',CS.get);
router.get('/cost/centers/get/info/:id',CS.getInformation);



export default router;