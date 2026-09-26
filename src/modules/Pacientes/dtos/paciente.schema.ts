import {z} from 'zod';
import {IPacienteDireccion} from '../types/PacienteDireccion.interface';
import {ObraSocial} from '../types/PacienteObraSocial.enum';
import {PacienteSexo} from '../types/PacienteSexo.enum';
import {TipoTelefono} from '../types/PacienteTelefono.enum';

export const ICrearPacienteDTO = z.object({
    body: z.object({
        Nombre: z.string({error: 'El Nombre del paciente es obligatorio'}),
        DNI: z.string({error: 'El DNI del paciente es obligatorio'}),
        Sexo: z.enum(PacienteSexo, {error: 'El sexo del Paciente no ha sido ingresado'}),
        FechaNacimiento: z.iso.date({message: 'La Fecha de Nacimiento no es valida'}),
        Direccion: z.string({error: 'La Direccion no es valida'}),
        Telefono: z.string({error: 'El Numero de telefono no es valido'}),

    })
})
