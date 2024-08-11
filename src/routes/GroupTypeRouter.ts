import { Router } from "express";
import { GroupTypeController } from "../controllers/GroupTypeController";
import multer = require("multer");
import path = require("path");

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'assets/uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage: storage });

const GT: GroupTypeController = new GroupTypeController();
router.post('/upload/group/type',upload.single('group_type_file'),GT.uploadGroupType);
router.get('/get/group/type', GT.getGroupType);
router.get('/get/group/by/type/:type',GT.getByType);

export default router;