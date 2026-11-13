import { Router } from "express";
import { UserController } from "../controller/userController.js";
import { createUserSchema } from "../middlewares/userValidator.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { UserParams } from "../types/userTypes.js";

const userController = new UserController();
const userRoutes = Router();

userRoutes.post("/users", validateSchema(createUserSchema), (req, res) => userController.createUser(req, res));
userRoutes.get("/users", (req, res) => userController.listarUsuarios(req, res));
userRoutes.get<UserParams>("/users/:id", (req, res) => userController.listarUsuarioId(req, res));
userRoutes.delete<UserParams>("/users/:id", (req, res) => userController.apagarUsuario(req, res));

export default userRoutes;