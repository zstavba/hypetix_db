import { Router } from "express";
import { PerformanceController } from "../controllers/PerformanceController";
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

const Performance: PerformanceController = new PerformanceController();
router.get('/coders/performance',Performance.get);
router.get('/coders/performance/info/:id',Performance.getInformation);
router.post('/coders/performance/upload/file',upload.single('performance_file',),Performance.upload);


export default router;