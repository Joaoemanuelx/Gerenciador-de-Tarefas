import { TarefaService } from "../services/tarefaService.js";
import { Request, Response } from "express";
import { TarefaParams } from "../types/tarefaTypes.js";


const tarefaService = new TarefaService();
export class TarefaController {
    async createTarefa(req: Request, res: Response) {
        try {
            const { nome, descricao, userId } = req.body;
            const tarefa = await tarefaService.createTarefa({ nome, descricao, userId });
            res.status(201).json(tarefa);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message || "Erro ao criar tarefa" });
        }
    }

    async listarTarefaId(req: Request<TarefaParams>, res: Response) {
        try{
            const { id } = req.params;
            const tarefa = await tarefaService.listarPorId(id);
            res.status(200).json(tarefa);
        } catch (error: any) {
            console.error(error);
            res.status(404).json({ error: error.message || "Erro ao listar tarefa" });
        }
    }

    async updateTarefa(req: Request<TarefaParams>, res: Response) {
        try{
            const { id } = req.params;
            const { nome, descricao, status } = req.body;
            const tarefa = await tarefaService.updateTarefa(id, { nome, descricao, status });
            res.status(200).json(tarefa);
        }
        catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message || "Erro ao atualizar tarefa" });
        }
    }

    async deleteTarefa(req: Request<TarefaParams>, res: Response) {
        try{
            const { id } = req.params;
            const saida = await tarefaService.deleteTarefa(id);
            res.status(200).json(saida);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message || "Erro ao excluir tarefa" });
        }
    }
}
