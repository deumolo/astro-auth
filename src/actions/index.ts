import { registerUser } from './auth/';
import { logoutUser } from './auth/';
import { loginUser } from './auth/';
import { loginWithGoogle } from './auth/';

export const server = {
    registerUser: registerUser,
    logoutUser: logoutUser,
    loginUser: loginUser,
    loginWithGoogle: loginWithGoogle
}