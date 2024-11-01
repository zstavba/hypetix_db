import { Router } from "express";
import { ArticleTypeController } from "../controllers/ArticleTypeController";
import multer = require("multer");
import path = require("path");
import { BacktoProductionController } from "../controllers/BackToProductionControllet";
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

const BTP: BacktoProductionController = new BacktoProductionController();
router.post('/back/to/production/create',BTP.createProduction);
router.get('/back/to/production/get/list',BTP.getProductionList);
router.get('/back/to/production/get/info/:id',BTP.getInformation); 


export default router; 