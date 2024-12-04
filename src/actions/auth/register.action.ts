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
    handler: async ({ name, email, password, remember_me }) => {
        {
            console.log('register', name, email, password, remember_me);
            return true
        }
    }
})
