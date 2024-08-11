import { Router } from "express";
import { MeassurmentUnitsController } from "../controllers/MeassurmentUnitsController";
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

const MeassurmentUnits: MeassurmentUnitsController = new MeassurmentUnitsController();

router.get('/meassurment/units',MeassurmentUnits.get);
router.get('/meassurment/units/:numnber',MeassurmentUnits.getNumber);
router.get('/meassurment/units/info/:id',MeassurmentUnits.getInformation);
router.post('/meassurment/units',upload.single('em_file'),MeassurmentUnits.uploadFile);


export default router; 