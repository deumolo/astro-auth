// @prefix sample-action
// @description 
/* eslint-disable */

import { defineAction } from 'astro:actions';
import { OK, z } from 'astro:schema';
import { signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebase } from '@/firebase/config';
import type { FirebaseError } from 'firebase/app';

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async (credentials) => {
        const credential = GoogleAuthProvider.credentialFromResult(credentials)

        if (!credential) {
            throw new Error('Google sign in falló')
        }

        await signInWithCredential(firebase.auth, credential)

        return {
            ok: true
        }
    }
})
