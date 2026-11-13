import { prisma } from "../database/prisma.js";
import { hash } from "bcryptjs";
export class UserService {
    async createUser({ name, email, password }) {
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (userAlreadyExists) {
            throw new Error("Email ja cadastrado");
        }
        const hashedPassword = await hash(password, 8);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                senha: hashedPassword
            }
        });
        return {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };
    }
    async listarUsuarios() {
        const users = await prisma.user.findMany();
        if (!users) {
            throw new Error("Nenhum usuário encontrado");
        }
        return users.map((user) => ({
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }));
    }
    async apagarUsuario(id) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        });
        return {
            name: deletedUser.name,
            email: deletedUser.email,
            createdAt: deletedUser.createdAt
        };
    }
}
//# sourceMappingURL=userService.js.map