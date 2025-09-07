import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const cookie = request.cookies;
    const token: string | undefined = cookie.get('token')?.value;
    if (!token && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    };
    return NextResponse.next();
};

export const config = {
    matcher: '/',
};