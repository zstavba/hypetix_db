import { Router } from "express";
import { UnitAboveStorageController } from "../controllers/UnitAboveStorageController";
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

const UAS: UnitAboveStorageController = new UnitAboveStorageController();
router.post('/units/above/storage/upload',upload.single('uas_file'),UAS.upload);
router.get('/units/above/storage/get',UAS.get);
router.get('/units/above/storage/get/info/:id',UAS.getInformation);


export default router; 