import { Router } from "express";
import { LocationsController } from "../controllers/LocationsController";
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



const Locations: LocationsController = new LocationsController();
router.get('/locations/get',Locations.get);
router.post('/locations/upload',upload.single('locations_file'),Locations.upload);


export default router;