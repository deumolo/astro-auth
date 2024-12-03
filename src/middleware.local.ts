//Este archivo no funciona por su filename
//Esto es un demo

import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {

    const authHeaders = context.request.headers.get('authorization') ?? '';

    if (privateRoutes.includes(context.url.pathname)) {
        return checkLocalAuth(authHeaders, next);
    }

    return next();
});

const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
    if (authHeaders) {
        const authValue = authHeaders.split(' ')[1] ?? 'user:pass';
        const decodedValue = atob(authValue).split(':');
        const [user, password] = decodedValue;

        if (user === 'admin' || password === 'admin') {
            return next();
        }
    }

    return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic real="Secure Area"' } });
}