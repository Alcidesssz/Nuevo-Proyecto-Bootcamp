import type { Request, Response, NextFunction } from 'express';

const { respuestaEstandar } = require('../utils/respuestaEstandar');

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const estado = err.status || 500;
    const mensaje = estado === 500 ? 'Error interno del servidor' : err.message;

    if (estado === 500) {
        console.error(`[ERROR] ${err.message}`);
    }

    return respuestaEstandar(res, estado, false, mensaje, null);
};

export default errorHandler;