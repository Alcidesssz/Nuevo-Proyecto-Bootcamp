import { Request, Response } from 'express';
import Especialidad from './Especialidad';
import {respuestaEstandar} from '../../utils/respuestaEstandar';

export const getEspecialidades = async (req: Request, res: Response) => {
  try {
    const especialidades = await Especialidad.find();
    return respuestaEstandar(res, 200, true, 'Especialidades obtenidas exitosamente', especialidades);
  } catch (error: any) {
    return respuestaEstandar(res, 500, false, 'Error al obtener las especialidades', error.message);
  }
};

export const getEspecialidadById = async (req: Request, res: Response) => {
  try {
    const especialidad = await Especialidad.findById(req.params.id);
    if (!especialidad) {
      return respuestaEstandar(res, 404, false, 'Especialidad no encontrada');
    }
    return respuestaEstandar(res, 200, true, 'Especialidad obtenida', especialidad);
  } catch (error: any) {
    return respuestaEstandar(res, 500, false, 'Error al obtener la especialidad', error.message);
  }
};

export const createEspecialidad = async (req: Request, res: Response) => {
  try {
    const nuevaEspecialidad = await Especialidad.create(req.body);
    return respuestaEstandar(res, 201, true, 'Especialidad creada exitosamente', nuevaEspecialidad);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map((err: any) => err.message);
      return respuestaEstandar(res, 400, false, 'Error de validación', errores);
    }
    return respuestaEstandar(res, 500, false, 'Error al crear la especialidad', error.message);
  }
};

export const updateEspecialidad = async (req: Request, res: Response) => {
  try {
    const especialidad = await Especialidad.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!especialidad) {
      return respuestaEstandar(res, 404, false, 'Especialidad no encontrada');
    }
    return respuestaEstandar(res, 200, true, 'Especialidad actualizada', especialidad);
  } catch (error: any) {
    return respuestaEstandar(res, 500, false, 'Error al actualizar', error.message);
  }
};

export const deleteEspecialidad = async (req: Request<{id: string}>, res: Response) => {
    try {

        const { id } = req.params;

        const especialidadBorrado = await Especialidad.findByIdAndUpdate(
            id, 
            { activo: false },
            { new: true }
        );

        if (!especialidadBorrado) {
            return respuestaEstandar(res, 404, false, `Especialidad no encontrado con ID ${id}`);
        }
        
        return respuestaEstandar(res, 200, true,  'Especialidad eliminado exitosamente', especialidadBorrado);
    } catch (error: any) {
        console.error('Error al eliminar el especialidad:', error);
        return respuestaEstandar(res, 400, false, 'ID con formato invalido', error.message);
    }
};

