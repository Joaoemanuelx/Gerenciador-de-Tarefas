import { Router, type Request } from "express";
import { AuthController } from "../controller/authController.js";
import passport from "passport";

const authControler = new AuthController();
const authRoutes = Router();


authRoutes.post("/login",passport.authenticate("local", { session: false }),authControler.login);
export default authRoutes;