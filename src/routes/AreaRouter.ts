import { Router } from "express";
import { AreasController } from "../controllers/AreasControllet";
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

const Area: AreasController = new AreasController();
router.post('/areas/upload',upload.single('area_file'),Area.upload);
router.get('/areas/get',Area.get);
router.get('/areas/get/info/:id', Area.getInformation);



export default router; 