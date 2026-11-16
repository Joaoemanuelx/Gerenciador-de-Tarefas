import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import {prisma} from "../database/prisma.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "nome",
      passwordField: "senha"
    },
    async (nome, senha, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { nome }
        });

        if (!user) {
          return done(null, false);
        }

        const passwordValid = await bcrypt.compare(
          senha,
          user.senha
        );

        if (!passwordValid) {
          return done(null, false);
        }

        return done(null, {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);