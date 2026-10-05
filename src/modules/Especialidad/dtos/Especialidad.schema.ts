import { z } from 'zod';

export const crearEspecialidadSchema = z.object({
    body: z.object({
        nombre: z.string({ error: 'La especialidad es obligatoria' }).min(2, 'La especialidad es obligatoria'),
        descripcion: z.string().optional(),
    })
});

export const actualizarEspecialidadSchema = z.object({
    body: crearEspecialidadSchema.shape.body.partial(),
});

export type ICrearEspecialidadDTO = z.infer<typeof crearEspecialidadSchema>['body'];
export type IActualizarEspecialidadDTO = z.infer<typeof actualizarEspecialidadSchema>['body'];