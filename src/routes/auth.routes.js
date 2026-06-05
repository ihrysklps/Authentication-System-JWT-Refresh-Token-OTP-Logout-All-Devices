import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/register",authController.register) // POST --- /api/auth/register



/**GET api/auth/get-me */
authRouter.get("/get-me", authController.getMe)



export default authRouter;
