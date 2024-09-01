import { Router } from "express";
import { CodersController } from "../controllers/CodersController";
import multer = require("multer");
import path = require("path");
import { CharacteristicsController } from "../controllers/CharacteristicsController";
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

let C: CharacteristicsController = new CharacteristicsController();

router.get('/characteristics/get',C.get);
router.get('/characteristics/upload',C.upload);


export default router;