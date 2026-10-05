import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        email: z.email({ error: 'Email invalido' }),
        password: z.string({ error: 'La contraseña es obligatoria' }).min(1, 'La contraseña es obligatoria'),
    })
});

export type ILoginDTO = z.infer<typeof loginSchema>['body'];