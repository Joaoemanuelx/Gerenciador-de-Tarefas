import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import "./middlewares/localStrategy.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use("/users", userRoutes);
app.use("/tarefas", tarefaRoutes);
app.use("/auth", authRoutes);

app.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "OK",
    message: "Servidor está funcionando corretamente!"
  });
});

export default app;