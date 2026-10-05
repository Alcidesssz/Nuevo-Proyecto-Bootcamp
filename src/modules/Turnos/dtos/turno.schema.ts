import {z} from 'zod';
import {EstadoTurno} from '../types/TurnoEstado.enum';
import {Especialidad} from '../types/TurnoEspecialidad.enum';

export const CrearTurnoSchema = z.object({
    body: z.object({
        Paciente: z.string({ error: 'El ID del paciente es obligatorio' }).min(1, {message: 'El ID del paciente es obligatorio'}),
        Especialidad: z.enum(Especialidad, {
            error: 'Especialidad no valida'
        }),
        EstadoTurno: z.enum(EstadoTurno, {
            error: 'Estado de turno no valido'
        }),
        FechaTurno: z.iso.date({message: 'Formato de fecha invalido'}),
        Estado: z.enum(EstadoTurno, {
            error: "Estado de turno no valido"
        }).optional(), 
    }),
    query: z.object({
        urgencia: z.enum(['true', 'false']).optional()
    })
});
    
export type ICrearTurnoDTO = z.infer<typeof CrearTurnoSchema>['body'];
export type IQueryUrgencia = z.infer<typeof CrearTurnoSchema>['query'];