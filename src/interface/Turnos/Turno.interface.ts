import { Types, Document } from 'mongoose';
import { Especialidad } from './TurnoEspecialidad.enum';
import { EstadoTurno } from './TurnoEstado.enum';


export interface ITurno extends Document {
    id?: Types.ObjectId;
    Paciente: Types.ObjectId;
    Especialidad: Especialidad;
    FechaTurno: Date;
    Estado?: EstadoTurno;
    Observaciones?: string;
    activo: boolean;
}



