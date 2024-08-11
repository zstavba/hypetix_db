import { Router } from "express";
import { ShippingController } from "../controllers/ShippingController";
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

const ShippingMethod: ShippingController = new ShippingController();
router.get('/shipping/method/get',ShippingMethod.get);
router.get('/shipping/method/get/info/:id',ShippingMethod.getInforomation);
router.post('/shipping/method/upload',upload.single('shipping_method_file'),ShippingMethod.upload);


export default router;