import { Router } from "express";

import * as controller from '../controller/controller.js';
const router = Router();

router.post("/register",controller.register)
router.post('/login',controller.login)
router.post('/verifyOtp',controller.verifyOtp)
// router.post('/emailverifyOtp',controller.emailverifyOtp)
 


export default router; 