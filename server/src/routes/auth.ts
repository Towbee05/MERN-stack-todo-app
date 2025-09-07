import express, { Response, Request, Router } from "express";
import { signupController, loginController } from '../controllers/auth'

const router: Router = express.Router();

// All authentication routes

router.route('/auth/signup/').post(signupController);
router.route('/auth/login/').post(loginController);


export default router;;

