import { ZodError } from 'zod';
export const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            return next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Erro de validação nos dados enviados",
                    errors: error.issues.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }
            return res.status(500).json({
                message: "Erro interno no servidor."
            });
        }
    };
};
//# sourceMappingURL=validateSchema.js.map