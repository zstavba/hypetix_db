import { Router } from "express";
import { OrganizationalUnitsController } from "../controllers/OrganizationalUnitsConbtroller";
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

const OU: OrganizationalUnitsController = new OrganizationalUnitsController();
router.post('/organizational/units/upload',upload.single('ou_file'),OU.upload);
router.get('/organizational/units/get',OU.get);
router.get('/organizational/units/get/info/:id',OU.getInformation);

export default router; 