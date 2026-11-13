import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    password: z.string().min(6).max(100).regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
})