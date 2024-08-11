import { Router } from "express";
import { CurrencieController } from "../controllers/CurrencieController";
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

const Currencie: CurrencieController = new CurrencieController();
router.post('/currencie/upload',upload.single('currencie_file'),Currencie.upload);
router.get('/currencie/get',Currencie.get);
router.get('/currencie/get/info/:id',Currencie.getInformation)

export default router;