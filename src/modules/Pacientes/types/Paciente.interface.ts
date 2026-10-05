import type { Types } from 'mongoose';
import type { IPacienteDireccion } from './PacienteDireccion.interface';
import type IPacienteTelefono from './PacienteTelefono.interface';
import type IHistorialMedico from './HistorialMedico.interface';

export default interface IPaciente {
    _id: Types.ObjectId;
    Nombre: string;
    Apellido: string;
    DNI: string;
    FechaNacimiento: Date;
    Sexo: 'Masculino' | 'Femenino' | 'Otro';
    Direccion: IPacienteDireccion;
    Telefono: IPacienteTelefono;
    CorreoElectronico: string;
    HistorialMedico: IHistorialMedico;
}