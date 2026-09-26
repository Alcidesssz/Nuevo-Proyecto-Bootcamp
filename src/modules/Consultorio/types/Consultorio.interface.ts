import type { Types } from 'mongoose';
import type ITelefono from '../../Pacientes/types/PacienteTelefono.interface';

interface IConsultorio {
    _id: Types.ObjectId;
    Medico: Types.ObjectId;        // referencia
    Especialidad: Types.ObjectId;  // referencia
    NumeroConsultorio: string;
    Piso: string;
    Direccion: string;
    Telefono: ITelefono;
    CorreoElectronico: string;
}

export default IConsultorio;