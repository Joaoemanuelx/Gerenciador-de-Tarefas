import { Request, Response } from "express";
import { AuthService } from "../services/authService.js";


const authService = new AuthService();
export class AuthController {
  async login(req: Request, res: Response) {
    try {
         if (!req.user) {
            return res.status(401).json({
            message: "Usuário não autenticado"
            });
        }
        const logado = await authService.login(req.user);
        res.cookie("token", logado.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 1000
        });
        return res.status(200).json({ user: logado.user });    
    }catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message || "Erro ao fazer login" });
    }
  } 
}