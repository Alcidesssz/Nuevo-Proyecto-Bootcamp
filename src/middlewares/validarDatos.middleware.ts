import type { Request, Response, NextFunction } from 'express';
import { z} from 'zod';
import { respuestaEstandar} from '../utils/respuestaEstandar';

export const validarSchema = (schema: z.ZodType<any, any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
            const resultado = schema.safeParse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            if (!resultado.success) {
                const detalles = resultado.error.issues.map((issue) => ({
                    campo: issue.path.join('.') || '(cuerpo completo)',
                    mensaje: issue.message,
                }));
                return respuestaEstandar(res, 400, false, 'Error de validacion', detalles);
            }

            req.body = resultado.data.body;
            next();
        };
    };

    module.exports = {validarSchema};