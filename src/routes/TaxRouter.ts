import { Router } from "express";
import { TaxController } from "../controllers/TaxController";
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

const Tax: TaxController = new TaxController();

router.get('/tax',Tax.get);
router.get('/tax/number/:number',Tax.getNumber);
router.get('/tax/info/:id',Tax.getInformation);
router.post('/tax/file/upload',upload.single('tax_file'),Tax.upload);



export default router;