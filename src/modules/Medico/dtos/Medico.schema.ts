import { z } from 'zod';

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

export const crearMedicoSchema = z.object({
    body: z.object({
        Nombre: z.string({ error: 'El nombre del médico es obligatorio' }).min(2, 'El nombre del médico es obligatorio'),
        Matricula: z.string({ error: 'La matrícula es obligatoria' }).min(1, 'La matrícula es obligatoria'),
        Especialidad: z.string({ error: 'La especialidad es obligatoria' })
            .regex(ObjectIdRegex, 'La especialidad debe ser un ObjectId válido'),
        Telefono: z.string({ error: 'El teléfono es obligatorio' }).min(1, 'El teléfono es obligatorio'),
        CorreoElectronico: z.email({ error: 'Correo Electronico invalido' }),
    })
});

export const actualizarMedicoSchema = z.object({
    body: crearMedicoSchema.shape.body.partial(),
});

export type ICrearMedicoDTO = z.infer<typeof crearMedicoSchema>['body'];
export type IActualizarMedicoDTO = z.infer<typeof actualizarMedicoSchema>['body'];