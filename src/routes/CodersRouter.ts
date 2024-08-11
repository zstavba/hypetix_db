import { Router } from "express";
import { CodersController } from "../controllers/CodersController";
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

const Coder: CodersController = new CodersController();
router.post('/coder/upload',upload.single('coder_upload_file'), Coder.upload);


export default router; 