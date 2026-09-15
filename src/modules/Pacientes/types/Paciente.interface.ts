import {Types, Document} from 'mongoose';
import {IPacienteDireccion} from './PacienteDireccion.interface';
import { IPacienteSexo } from './PacienteSexo.enum';
import {IPacienteTelefono} from './PacienteTelefono.interface';
import {IPacienteObraSocial} from './PacienteObraSocial.interface';

export interface IPaciente extends Document {
    id?: Types.ObjectId;
    Nombre: string;
    DNI: string;
    Sexo: IPacienteSexo;
    FechaNacimiento: Date;
    Direccion: IPacienteDireccion;
    Telefono: IPacienteTelefono;
    CorreoElectronico: string;
    ObraSocial: IPacienteObraSocial;
}
