import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import type { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { error } from 'node_modules/astro/dist/core/logger/core';
import { firebase } from 'src/firebase/config';

export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(3),
        email: z.string().min(3),
        password: z.string().min(3),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ name, email, password, remember_me }, { cookies }) => {

        //Creación de cookies
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

        //Creación de usuario
        try {
            const user = await createUserWithEmailAndPassword(firebase.auth, email, password);

            //Actualizar el nombre del usuario
            updateProfile(firebase.auth.currentUser!, {
                displayName: name,
            });

            //Verificar el correo electrónico
            await sendEmailVerification(firebase.auth.currentUser!, {
                url: 'http://localhost:4321/protected?emailVerified=true',
            })

            return {
                ok: true,
                message: 'Usuario creado',
                email: user.user.email,
            };
        } catch (error) {
            const firebaseError = error as FirebaseError;

            if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('El correo ya está en uso');
            }

            throw new Error('Error al crear el usuario');
        }

        //Actualizar el nombre del usuario

        //Verificar el correo electrónico

        return {
            ok: true,
            message: 'Usuario creado',
        }
    }
})
