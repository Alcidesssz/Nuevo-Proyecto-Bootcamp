import { z } from 'zod';
import { TipoTelefono } from '../types/PacienteTelefono.enum';
import { PacienteSexo } from '../types/PacienteSexo.enum';

export const direccionSchema = z.object({
    Calle: z.string({ error: 'La calle es obligatoria' }).min(1, 'La calle es obligatoria'),
    Numero: z.string({ error: 'El número es obligatorio' }).min(1, 'El número es obligatorio'),
    Ciudad: z.string({ error: 'La ciudad es obligatoria' }).min(1, 'La ciudad es obligatoria'),
    Provincia: z.string({ error: 'La provincia es obligatoria' }).min(1, 'La provincia es obligatoria'),
});

export const telefonoSchema = z.object({
    tipo: z.enum(TipoTelefono).optional().default(TipoTelefono.CELULAR),
    codArea: z.string({ error: 'El código de área es obligatorio' })
        .regex(/^\d{1,4}$/, 'El código de área debe contener entre 1 y 4 dígitos'),
    numero: z.string({ error: 'El número es obligatorio' })
        .regex(/^\d{6,9}$/, 'El número debe contener entre 6 y 9 dígitos'),
});

export const crearPacienteSchema = z.object({
    body: z.object({
        Nombre: z.string({ error: 'El nombre es obligatorio' }).min(2, 'El nombre es obligatorio'),
        DNI: z.string({ error: 'El DNI es obligatorio' })
            .min(7, 'DNI invalido')
            .regex(/^\d{7,8}$/, 'El DNI debe contener entre 7 y 8 dígitos'),
        FechaNacimiento: z.iso.date({ error: 'formato de fecha invalido' }),
        Sexo: z.enum(PacienteSexo, { error: 'El sexo es obligatorio' }),
        Direccion: direccionSchema,
        Telefono: telefonoSchema,
        CorreoElectronico: z.email({ error: 'Email invalido' }),
        ObraSocial: z.object({
            Nombre: z.string({ error: 'El nombre de la obra social es obligatorio' }).min(1, 'El nombre de la obra social es obligatorio'),
            NumeroAfiliado: z.string({ error: 'El número de afiliado es obligatorio' }).min(1, 'El número de afiliado es obligatorio'),
        }),
    }),
});

export const actualizarPacienteSchema = z.object({
    body: crearPacienteSchema.shape.body.partial(),
});

export const queryPacientesSchema = z.object({
    query: z.object({
        obraSocial: z.string().optional(),
        dni: z.string().optional(),
    }),
});

export const agregarConsultaSchema = z.object({
    body: z.object({
        fecha: z.iso.date({ error: 'formato de fecha invalido' }).optional(),
        diagnostico: z.string({ error: 'El diagnostico es obligatorio' }).min(1, 'El diagnostico es obligatorio'),
        tratamiento: z.string().optional(),
        medico: z.string({ error: 'El médico es obligatorio' }).min(1, 'El médico es obligatorio'),
    }),
});

export type ICrearPacienteDTO = z.infer<typeof crearPacienteSchema>['body'];
export type IActualizarPacienteDTO = z.infer<typeof actualizarPacienteSchema>['body'];
export type IFiltroPacientesQuery = z.infer<typeof queryPacientesSchema>['query'];
export type IAgregarConsultaDTO = z.infer<typeof agregarConsultaSchema>['body'];