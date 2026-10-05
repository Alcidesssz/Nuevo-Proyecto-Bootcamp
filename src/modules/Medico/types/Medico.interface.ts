// Interfaz de documento Medico (solo tipos; valida el schema).
import type { Types } from 'mongoose';

interface IMedico {
    _id: Types.ObjectId;
    Nombre: string;
    Matricula: string;
    Especialidad: Types.ObjectId;   // referencia a la colección Especialidad
    Telefono: string;
    CorreoElectronico: string;
    activo?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export default IMedico;