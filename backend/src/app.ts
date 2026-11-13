import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(userRoutes);

app.get("/health", (_req, res) => {
  return res.status(200).json({status: "OK", message: "Servidor está funcionando corretamente!" });
});

export default app;
