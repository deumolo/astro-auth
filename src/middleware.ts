import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from './firebase/config';

const privateRoutes = ['/protected']

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({ url, request, locals }, next) => {
    const isLoggedIn = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser;

    locals.isLoggedIn = isLoggedIn;

    return next();
});