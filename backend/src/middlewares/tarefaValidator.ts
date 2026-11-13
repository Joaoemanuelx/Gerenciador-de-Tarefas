import {z} from 'zod';

export const createTarefaSchema = z.object({
    nome: z.string().min(1).max(100),
    descricao: z.string().max(255).optional(),
    status: z.enum(['EmEspera', 'Inicio', 'EmAndamento', 'Concluido']).default('EmEspera')
})

export const updateTarefaSchema = z.object({
    nome: z.string().min(1).max(100).optional(),
    descricao: z.string().max(255).optional(),
    status: z.enum(['EmEspera', 'Inicio', 'EmAndamento', 'Concluido']).optional()
})