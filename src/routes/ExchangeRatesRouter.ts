import { Router } from "express";
import { ExchangeRatesController } from "../controllers/ExchangeRatesController";
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


const ER: ExchangeRatesController = new ExchangeRatesController();
router.post('/exchange/rates/upload',upload.single('exchange_rates_file'), ER.upload);
router.get('/exchange/rates/get',ER.get);
router.get('/exchange/rates/get/info/:id', ER.getInformation);


export default router;