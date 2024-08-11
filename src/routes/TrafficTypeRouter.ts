import { Router } from "express";
import { TrafficTypeController } from "../controllers/TrafficTypeControllet";
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
const router =  Router();

const TrafficType : TrafficTypeController = new TrafficTypeController();
router.post('/traffic/type/upload',upload.single("traffic_type_file"),TrafficType.upload);
router.get('/traffic/type/get',TrafficType.get);
router.get('/traffic/type/get/info/:id',TrafficType.getInformation);



export default router;