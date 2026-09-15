import type { Request, Response } from 'express';
import Paciente from './Paciente';

import {respuestaEstandar} from '../../utils/respuestaEstandar';

export const getPacientes = async (req: Request, res: Response) => {
    try {

        // ?ObraSocial=OSDE&DNI=12345678
        const { ObraSocial, DNI } = req.query;

        const filtro: Record<string, string> = {};

        if (ObraSocial) {
            let obraSocial: string | null = null;

            if (typeof ObraSocial === 'string') {
                obraSocial = ObraSocial.trim().toUpperCase();
            } else if (
                typeof ObraSocial === 'object' &&
                ObraSocial !== null &&
                !Array.isArray(ObraSocial)
            ) {
                const obraSocialObj = ObraSocial as {
                    nombre?: unknown;
                    name?: unknown;
                    ObraSocial?: unknown;
                };

                const obraSocialQuery =
                    typeof obraSocialObj.nombre === 'string'
                        ? obraSocialObj.nombre
                        : typeof obraSocialObj.name === 'string'
                            ? obraSocialObj.name
                            : typeof obraSocialObj.ObraSocial === 'string'
                                ? obraSocialObj.ObraSocial
                                : null;

                if (typeof obraSocialQuery === 'string') {
                    obraSocial = obraSocialQuery.trim().toUpperCase();
                }
            }

            if (obraSocial) {
                filtro['ObraSocial.Nombre'] = obraSocial;
            }
        }

        if (DNI) {
            filtro.DNI = String(DNI).trim();
        }

        console.log('🟢 Filtro Armado:', filtro);

        const pacientes = await Paciente.find(filtro);
        respuestaEstandar(res, 200, true, 'Pacientes encontrados', pacientes);
    } catch (error: any) {
        console.error('🔴 Error al obtener pacientes:', error);
        respuestaEstandar(res, 500, false, 'Error al obtener los pacientes', null);
    }
};

export const createPaciente = async (req: Request, res: Response) => {
    try {
        const nuevoPaciente = await Paciente.create(req.body);

        respuestaEstandar(
            res,
            201,
            true,
            'Paciente creado',
            nuevoPaciente
        );

    } catch (error: any) {

        console.error("❌ ERROR REAL AL CREAR PACIENTE:");
        console.error(error);

        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(
                (err: any) => err.message
            );

            return respuestaEstandar(
                res,
                400,
                false,
                'Error de validación',
                errores
            );
        }

        respuestaEstandar(
            res,
            500,
            false,
            'Error al crear el paciente',
            null
        );
    }
};

export const deletePaciente = async (req: Request<{id: string}>, res: Response) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return respuestaEstandar(res, 404, false, 'Paciente no encontrado', null);
        }
        const pacienteEliminado = await Paciente.findByIdAndDelete(id);
        respuestaEstandar(res, 200, true, 'Paciente eliminado', pacienteEliminado);
    } catch (error: any) {
        respuestaEstandar(res, 500, false, 'Error al eliminar el paciente', null);
    }
};