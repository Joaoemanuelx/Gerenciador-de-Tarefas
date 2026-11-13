
import { RequestHandler } from "express";
import { ZodError, ZodType } from "zod";

export const validateSchema = (schema: ZodType): RequestHandler => {
    return async (req, res, next) => {
        try {
            const validatedData = await schema.parseAsync(req.body);

            req.body = validatedData;

            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Erro de validação nos dados enviados",
                    errors: error.issues.map((err) => ({
                        field: err.path.join("."),
                        message: err.message
                    }))
                });
            }

            console.error("Erro no middleware de validação:", error);

            return res.status(500).json({
                message: "Erro interno no servidor."
            });
        }
    };
};
