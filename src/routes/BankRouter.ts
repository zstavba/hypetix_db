import { Router } from "express";
import { BankController } from "../controllers/BankController";

const router = Router();

const BC: BankController = new BankController();

router.get('/country',BC.getCountry);
router.get('/country/:number',BC.getNUmberCountry);
router.get('/zipcode',BC.getZipCode);
router.get('zipcode/:number', BC.getNumberZipCOde);


export default router;