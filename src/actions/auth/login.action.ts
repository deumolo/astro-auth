// @prefix sample-action
// @description 
/* eslint-disable */

import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { firebase } from '@/firebase/config';
import type { FirebaseError } from 'firebase/app';

export const loginUser = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().min(3),
        password: z.string().min(3),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ email, password, remember_me }, { cookies }) => {
        {
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

            //Ingreso de usuario
            try {
                const user = await signInWithEmailAndPassword(firebase.auth, email, password);
                console.log("user: ", user.user)
                return user.user.providerData[0];
            } catch (error) {
                const firebaseError = error as FirebaseError;

                if (firebaseError.code === 'auth/invalid-credential') {
                    throw new Error('Las credenciales son incorrectas');
                }

                throw new Error('Error al crear el usuario');
            }

        }
    }
})
