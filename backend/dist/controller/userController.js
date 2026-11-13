import { UserService } from "../services/userService.js";
const userService = new UserService();
export class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await userService.createUser({ name, email, password });
            res.status(201).json(user);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message || "Erro ao criar usuário" });
        }
    }
    async listarUsuarios(_req, res) {
        try {
            const users = await userService.listarUsuarios();
            res.status(200).json(users);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message || "Erro ao listar usuários" });
        }
    }
    async apagarUsuario(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.apagarUsuario(id);
            res.status(200).json(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message || "Erro ao apagar usuário" });
        }
    }
}
//# sourceMappingURL=userController.js.map