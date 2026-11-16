import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { Role } from "@prisma/client";


export interface AuthenticatedUser {
  id: string;
  nome: string;
  email: string;
  role: Role;
}

export class AuthService {
  async login(user: AuthenticatedUser) {
    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30s"
      }
    );

    return {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role
      }
    };
  }
}