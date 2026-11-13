import {prisma} from "../database/prisma.js";
import {Status} from "@prisma/client";

type TarefaRecord = Awaited<ReturnType<typeof prisma.tarefa.findMany>>[number];
interface CreateTarefaDTO {
    nome: string;
    descricao: string;
    userId: string;
}

interface UpdateTarefaDTO {
    nome: string;
    descricao: string;
    status: Status;
}

interface OutputTarefaDTO {
    nome: string;
    descricao: string;
    status: Status;
    createdAt: Date;
}

export class TarefaService {
    async createTarefa({nome, descricao, userId}: CreateTarefaDTO): Promise<OutputTarefaDTO> {
        const tarefa = await prisma.tarefa.create({
            data: {
                nome,
                descricao,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        return {
            nome: tarefa.nome,
            descricao: tarefa.descricao,
            createdAt: tarefa.createdAt,
            status: tarefa.status
        };
    }

    async listarPorId(id: string): Promise<OutputTarefaDTO> {
        const tarefa = await prisma.tarefa.findUnique({
            where: {
                id
            }
        });
        if (!tarefa) {
            throw new Error("Tarefa não encontrada");
        }
        return {
            nome: tarefa.nome,
            descricao: tarefa.descricao,
            createdAt: tarefa.createdAt,
            status: tarefa.status
        };
    }

    async updateTarefa(id: string, {nome, descricao, status}: UpdateTarefaDTO): Promise<OutputTarefaDTO> {
        const tarefa = await prisma.tarefa.update({
            where: {
                id
            },
            data: {
                nome,
                descricao,
                status
            }
        });
        if (!tarefa) {
            throw new Error("Tarefa não encontrada");
        }
        return {
            nome: tarefa.nome,
            descricao: tarefa.descricao,
            createdAt: tarefa.createdAt,
            status: tarefa.status
        };
    }

    async deleteTarefa(id: string): Promise<{ message: string }> {
        const tarefa = await prisma.tarefa.delete({
            where: {
                id
            }
        });
        if (!tarefa) {
            throw new Error("Tarefa não encontrada");
        }
        return {
            message: `tarefa ${tarefa.nome} deletada com sucesso`
        };
    }
}