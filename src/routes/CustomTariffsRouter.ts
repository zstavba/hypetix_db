import { Router } from "express";
import { CustomTariffsController } from "../controllers/CustomTariffsController";
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

const CustomTariffs: CustomTariffsController = new CustomTariffsController();


router.get('/custom/tariffs',CustomTariffs.get);
router.get('/custom/tariffs/:number',CustomTariffs.getNumber);
router.post('/custom/tariffs/upload/file',upload.single('custom_tariffs_file'),CustomTariffs.uploadCustomTariffsfile);
router.get('/custom/tariffs/info/:id',CustomTariffs.getInformation);


export default router;