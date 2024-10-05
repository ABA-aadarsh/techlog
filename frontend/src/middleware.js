import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    // for login page
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (req.nextUrl.pathname === "/login") {
        // for all users and admin
        if (token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }
    const privilagedEmails = ["aadarshbandhuaryal@gmail.com"];
    console.log(token)
    if (token && privilagedEmails.includes(token.email)) {
        // for admin only
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/unauthorized", req.url));
}

export const config = {
    matcher: ["/admin", "/admin/:path*", "/login"], 
};
