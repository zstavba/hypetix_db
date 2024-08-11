import { Router } from "express";
import { UpnCodesController } from "../controllers/UpnCodesController";
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

const UPN: UpnCodesController = new UpnCodesController();
router.post('/defaults/upn/codes/upload',upload.single('upn_file'),UPN.upload);
router.get('/defaults/upn/codes/get',UPN.get);
router.get('/defaults/upn/codes/get/info/:id',UPN.getInformation);


export default router;