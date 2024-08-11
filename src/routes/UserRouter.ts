import { Router } from "express";
import { UserController } from "../controllers/UserControllet";
import { User } from "../entity/User";

const router = Router();

const U: UserController = new UserController();

router.get('/list',U.getList);
router.get('/info/:id',U.getInformation);
router.get('/get/type/:type',U.getUserByType)
router.post('/login',U.loginUser);
router.post('/register',U.registerUser);
router.get('/upload',U.upload);


export default router;