import { Router } from "express";
import { PriceTypeController } from "../controllers/PriceTypeController";
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

const PriceType: PriceTypeController = new PriceTypeController();
router.post('/price/type/upload',upload.single("price_type_file"), PriceType.upload);
router.get('/price/type/get',PriceType.get);
router.get('/price/type/get/info/:id',PriceType.getInformation);


export default router; 