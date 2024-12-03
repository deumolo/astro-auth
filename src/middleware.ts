import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {

    const authHeaders = context.request.headers.get('authorization');

    if (privateRoutes.includes(context.url.pathname)) {
        if (authHeaders) {
            return next();
        }
        return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic real="Secure Area"' } });
    }

    return next();
});