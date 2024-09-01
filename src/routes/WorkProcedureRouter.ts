import { Router } from "express";
import { WorkProcedureController } from "../controllers/WorkProcedureController";
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



const WP: WorkProcedureController = new WorkProcedureController();
router.post('/work/procedures/upload',upload.single('work_procedure_file'),WP.upload);
router.get('/work/procedures/get',WP.get);
router.get('/work/procedures/get/info/:id',WP.getInformation);
router.delete('/work/procedures/delete/:id',WP.deletereWorkProcedure);

export default router; 