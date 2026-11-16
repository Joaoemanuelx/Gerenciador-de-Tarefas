import { Router, type Request } from "express";
import { TarefaController } from "../controller/tarefaController.js";
import { createTarefaSchema } from "../middlewares/tarefaValidator.js";
import { updateTarefaSchema } from "../middlewares/tarefaValidator.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { TarefaParams } from "../types/tarefaTypes.js";

const tarefaController = new TarefaController();
const tarefaRoutes = Router();

tarefaRoutes.post("/tarefas", validateSchema(createTarefaSchema), (req, res) => tarefaController.createTarefa(req, res));
tarefaRoutes.get<TarefaParams>("/tarefas/:id", (req, res) => tarefaController.listarTarefaId(req, res));
tarefaRoutes.patch<TarefaParams>("/tarefas/:id", validateSchema(updateTarefaSchema), (req, res) => tarefaController.updateTarefa(req, res));
tarefaRoutes.delete<TarefaParams>("/tarefas/:id", (req, res) => tarefaController.deleteTarefa(req, res));
export default tarefaRoutes;