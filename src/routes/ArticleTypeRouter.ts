import { Router } from "express";
import { ArticleTypeController } from "../controllers/ArticleTypeController";
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

const ArticleType: ArticleTypeController = new ArticleTypeController();

router.get('/article/type',ArticleType.get);
router.get('/article/type/:number',ArticleType.getNumber);
router.get('/article/type/info/:id',ArticleType.getInformation);
router.get('/article/type/group/type/:type',ArticleType.getByGroupType);
router.get('/article/type/group/name/:name',ArticleType.getByGroupName);
router.post('/article/type/upload/file',upload.single('article_type'),ArticleType.upload);
router.post('/article/type/post/data',ArticleType.create);


export default router;
