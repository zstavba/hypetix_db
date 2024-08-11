import { Router } from "express";
import { LanguageController } from "../controllers/LanguageController";
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

const Language: LanguageController = new LanguageController();
router.post('/languages/upload',upload.single('language_file'),Language.upload);
router.get('/languages/get',Language.get);


export default router;