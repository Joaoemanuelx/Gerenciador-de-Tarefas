import {prisma} from "../database/prisma.js";
import {hash} from "bcryptjs";


type UserRecord = Awaited<ReturnType<typeof prisma.user.findMany>>[number];

interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}
interface OutputUserDTO {
    name: string;
    email: string;
    createdAt: Date;
}

export class UserService {
    async createUser({name, email, password}: CreateUserDTO): Promise<OutputUserDTO> {
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        });
    
        if (userAlreadyExists) {
            throw new Error ("Email ja cadastrado");
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

    async listarUsuarios(): Promise<OutputUserDTO[]> {
        const users = await prisma.user.findMany();
        if (!users) {
            throw new Error("Nenhum usuário encontrado");
        }
        return users.map((user: UserRecord) => ({
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }));
    }

    async apagarUsuario(id: string): Promise<OutputUserDTO> {
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