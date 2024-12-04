import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const register = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(3),
        email: z.string().min(3),
        password: z.string().min(3),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ name, email, password, remember_me }, { cookies }) => {
        console.log({
            name,
            email,
            password,
            remember_me,
        });

        if (remember_me) {
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
                path: '/',
            });
        } else {
            cookies.delete('email', {
                path: '/',
            });
        }

        return {
            ok: true,
            message: 'Usuario creado',
        }
    }
})
