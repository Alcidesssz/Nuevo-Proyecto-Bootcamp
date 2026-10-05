import { z } from 'zod';
import { crearPacienteSchema } from '../../Pacientes/dtos/paciente.schema';
import { Especialidad } from '../../Turnos/types/TurnoEspecialidad.enum';
import { EstadoTurno } from '../../Turnos/types/TurnoEstado.enum';

export const IRegistrarIngresoDTO = z.object({
    body: z.object({
    datosPaciente: crearPacienteSchema.shape.body,
    especialidad: z.enum(Especialidad,{error: 'La especialidad no es valida'}),
    fechaTurno: z.iso.date({ error: 'Formato de fecha invalido'}),
    estado: z.enum(EstadoTurno, { error: 'El estado de turno no es valido'}).optional(),
    observaciones: z.string().optional(),
    })
})

export type IRegistrarIngresoDTO = z.infer<typeof IRegistrarIngresoDTO>['body'];