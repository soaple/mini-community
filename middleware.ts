import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/sign-in', '/sign-up', '/post-write'],
};

function middleware(req: NextRequest) {
    const sessionToken = req.cookies.getAll().find((cookie) => {
        return cookie.name.endsWith('next-auth.session-token');
    });
    const isAuthenticated = !!sessionToken;

    switch (req.nextUrl.pathname) {
        case '/sign-in':
        case '/sign-up':
            if (isAuthenticated) {
                return NextResponse.redirect(new URL('/', req.url));
            }
            break;
        case '/post-write':
            if (!isAuthenticated) {
                return NextResponse.redirect(new URL('/sign-in', req.url));
            }
    }

    return NextResponse.next();
}

export default middleware;
