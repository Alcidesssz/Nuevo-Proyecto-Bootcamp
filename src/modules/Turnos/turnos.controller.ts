import type {Request, Response} from 'express';
import { EstadoTurno } from './types/TurnoEstado.enum';
import type { ICrearTurnoDTO, IQueryUrgencia } from './dtos/turno.schema';
import type { ITurno } from './types/Turno.interface';
import Turno from '../../modules/Turnos/Turno';
import {respuestaEstandar} from '../../utils/respuestaEstandar';

export const getTurnos = async (req: Request< unknown, unknown, unknown, { id?: string }>, res: Response) => {
    try {

        const {id} = req.query;
        //api/v1/turnos?id=89a7fc98fvs7

            if (id) {
                const turnos  = await Turno.findById(id).populate('Paciente');
                if (!turnos) {
                    return respuestaEstandar(res, 404, false, `Turno no encontrado con ID ${id}`);
                }
                return respuestaEstandar<ITurno>(res, 200, true, 'Turnos obtenidos exitosamente', turnos);
            };
                const turnos = await Turno.find({activo: true}).populate('Paciente');
        
        return respuestaEstandar(res, 200, true, 'Turnos obtenidos exitosamente', turnos);
    } catch (error: any) {
        return respuestaEstandar(res, 500, false, 'Error interno del servidor');
    }
};

export const createTurno = async (req: Request<unknown, unknown, ICrearTurnoDTO, IQueryUrgencia>, res: Response) => {
    try {

        /*const origenPeticion = req.headers['x-origen'];
        const tokenSeguridad = req.headers['authorization'];

        console.log("🌎 Peticion realizada desde:", origenPeticion);

        if (tokenSeguridad != 'token123') {
            return respuestaEstandar(res, 401, false, 'no tiene permisos');
        } */

        const esUrgente = req.query.urgencia === 'true';

        const datosDelTurno: any = {
            Paciente: req.body.Paciente,
            Especialidad: req.body.Especialidad,
            FechaTurno: req.body.FechaTurno,
        };

        if (esUrgente) {
            datosDelTurno.estado = EstadoTurno.ATENDIDO;
            datosDelTurno.observaciones = 'ingreso por guardia medica';
            console.log("🚨 ALERTA: registrado un turno de urgencia");
        }

        const nuevoTurno = await Turno.create(datosDelTurno);

        return respuestaEstandar(res, 201, true, 'Turno creado exitosamente', nuevoTurno);
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map((err: any) => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }
        return respuestaEstandar(res, 500, false, 'Error interno del servidor');
    }
};

export const deleteTurno = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params;

        const turnoBorrado = await Turno.findByIdAndUpdate(
            id, 
            { activo: false, estado: EstadoTurno.CANCELADO },
            { new: true }
        );

        if (!turnoBorrado) {
            return respuestaEstandar(res, 404, false, `Turno no encontrado con ID ${id}`);
        }
        return respuestaEstandar(res, 200, true, 'Turno eliminado exitosamente', turnoBorrado);
    } catch (error: any) {
        return respuestaEstandar(res, 500, false, 'Error interno del servidor');
    }
};

export const marcarAtendido = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params;

        const turnoActualizado = await Turno.findByIdAndUpdate(
            id,
            { Estado: EstadoTurno.ATENDIDO },
            { new: true }
        );

        if ( !turnoActualizado) return respuestaEstandar(res, 404, false, 'Turno No Encontrado' , id);
        return respuestaEstandar(res, 200, true, 'Turno Actualizado', turnoActualizado);
    } catch (error: any) {
        return respuestaEstandar(res, 500, false, 'Error de Servidor', error.message);
    }
};

exports = {
    getTurnos,
    createTurno,
    deleteTurno,
    marcarAtendido
};