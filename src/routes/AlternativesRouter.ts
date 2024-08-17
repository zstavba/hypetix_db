import { Router } from "express";
import { AlternativeChipersController } from "../controllers/AlternativeChipersController";
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
const alternatives: AlternativeChipersController = new AlternativeChipersController();

router.post('/alternative/chipers/create/marketing', alternatives.createMakretingChiper);
router.post('/alternative/chipers/create/default', alternatives.createDefaultInformation);
router.get('/alternative/chipers/makreting/get/:id',alternatives.getMarketingInformation);
router.get('/alternative/list',alternatives.getList);
router.get('/alternative/chipers/create/basics', alternatives.insertBasicInformation);

export default router;
