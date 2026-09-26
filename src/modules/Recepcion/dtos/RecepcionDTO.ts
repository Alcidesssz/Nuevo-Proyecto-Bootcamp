import type {ICrearPacienteDTO} from '../../Pacientes/dtos/paciente.schema';
import {Especialidad} from '../../Turnos/types/TurnoEspecialidad.enum';
import {EstadoTurno} from '../../Turnos/types/TurnoEstado.enum';

export interface IRegistrarIngresoDTO {
    datosPaciente: ICrearPacienteDTO;
    especialidad: Especialidad;
    fechaTurno: string | Date;
    estado?: EstadoTurno;
    observaciones?: string;
}