import { registerUser } from './auth/';
import { logoutUser } from './auth/';

export const server = {
    registerUser: registerUser,
    logoutUser: logoutUser,
}