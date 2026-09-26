import type { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError} from 'zod';
import { respuestaEstandar} from '../utils/respuestaEstandar';

export const validarSchema = (schema: ZodObject) => 
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        } catch (error: any) {
            if (error instanceof ZodError) {
                const errores = error.message;
                return respuestaEstandar(res, 400, false, "Datos Invalidos", errores)
            }
            next(error);
        }
    };