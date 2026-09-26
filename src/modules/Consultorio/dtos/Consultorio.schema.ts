import { z } from 'zod';

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

const TelefonoConsultorioSchema = z.object({
    codArea: z.string({ error: 'El código de área es obligatorio' })
        .regex(/^\d{2,5}$/, 'El código de área debe contener entre 2 y 5 dígitos'),
    numero: z.string({ error: 'El número es obligatorio' })
        .regex(/^\d{7,10}$/, 'El número debe contener entre 7 y 10 dígitos'),
});

export const crearConsultorioSchema = z.object({
    body: z.object({
        Medico: z.string({ error: 'El médico es obligatorio' })
            .regex(ObjectIdRegex, 'El médico debe ser un ObjectId válido'),
        Especialidad: z.string({ error: 'La especialidad es obligatoria' })
            .regex(ObjectIdRegex, 'La especialidad debe ser un ObjectId válido'),
        NumeroConsultorio: z.string({ error: 'El número de consultorio es obligatorio' })
            .regex(/^\d{1,3}$/, 'El número de consultorio no es válido'),
        Piso: z.string({ error: 'El piso es obligatorio' })
            .regex(/^\d{1,2}$/, 'El piso no es válido'),
        Direccion: z.string({ error: 'La dirección es obligatoria' }),
        Telefono: TelefonoConsultorioSchema,
        CorreoElectronico: z.email({ error: 'Email invalido' }),
    })
});

export const actualizarConsultorioSchema = z.object({
    body: crearConsultorioSchema.shape.body.partial(),
});

export type ICrearConsultorioDTO = z.infer<typeof crearConsultorioSchema>['body'];
export type IActualizarConsultorioDTO = z.infer<typeof actualizarConsultorioSchema>['body'];