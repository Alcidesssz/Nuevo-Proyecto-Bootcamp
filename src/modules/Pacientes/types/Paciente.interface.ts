import {Types, Document} from 'mongoose';
import type {IPacienteDireccion} from './PacienteDireccion.interface';
import { PacienteSexo } from './PacienteSexo.enum';
import type {TipoTelefono} from './PacienteTelefono.enum';
import type {ObraSocial} from './PacienteObraSocial.enum';

export interface IPaciente extends Document {
    id?: Types.ObjectId;
    Nombre: string;
    DNI: string;
    Sexo: PacienteSexo;
    FechaNacimiento: Date;
    Direccion: IPacienteDireccion;
    Telefono: TipoTelefono;
    CorreoElectronico: string;
    ObraSocial: ObraSocial;
}
