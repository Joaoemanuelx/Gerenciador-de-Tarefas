import { UserService } from "../services/userService.js";
import { Request, Response } from "express";
import { UserParams } from "../types/userTypes.js";


const userService = new UserService();
export class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await userService.createUser({ name, email, password });
            res.status(201).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message || "Erro ao criar usuário" });
        }
    }
    
    async listarUsuarios(_req: Request, res: Response) {
        try {
            const users = await userService.listarUsuarios();
            res.status(200).json(users);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message || "Erro ao listar usuários" });
        }
    }

    async listarUsuarioId(req: Request<UserParams>, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.listarUsuarioPorId(id);
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message || "Erro ao listar usuário por ID" });
        }
    }

    async apagarUsuario(req: Request<UserParams>, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.apagarUsuario(id);
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message || "Erro ao apagar usuário" });
        }
    }
}