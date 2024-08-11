import { Router } from "express";
import { WorkCenterClassificationController } from "../controllers/WorkCenterClassificationController";
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

const WCC: WorkCenterClassificationController = new WorkCenterClassificationController();
router.post('/work/center/classification/upload',upload.single('work_center_file'),WCC.upload);
router.get('/work/center/classification/get',WCC.getList);

export default router; 