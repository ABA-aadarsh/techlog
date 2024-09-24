import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    console.log("middleware was called")
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const allowedEmails = ["aadarshbandhuaryal@gmail.com"];
    if (token && allowedEmails.includes(token.email)) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
    matcher: ["/admin"], 
};
