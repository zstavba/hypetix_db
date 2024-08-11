import { Router } from "express";
import { CommercialStatesController } from "../controllers/CommercialStatesController";
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
const CommercialStates: CommercialStatesController = new CommercialStatesController();


router.post('/states/upload',upload.single('commercial_states_file'),CommercialStates.upload);
router.get('/states/delete/:type',CommercialStates.deleteMany);
router.delete('/states/delete/by/:id',CommercialStates.deleteByID);
router.get('/states/get/type/:type',CommercialStates.getByType);

export default router;