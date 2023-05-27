import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const previousPage = req.nextUrl.pathname;

    if (previousPage.startsWith("/checkout")) {
        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!session) {
            // const requestedPage = req.nextUrl.pathname;
            const url = req.nextUrl.clone();
            url.pathname = `/auth/login`;
            url.search = `p=${previousPage}`;
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    // Personal login
    // if (previousPage.startsWith("/checkout")) {
    //     const token = req.cookies.get("token")?.value || "";

    //     try {
    //         await jose.jwtVerify(
    //             token,
    //             new TextEncoder().encode(process.env.JWT_SECRET_SEED)
    //         );
    //         return NextResponse.next();
    //     } catch (error) {
    //         return NextResponse.redirect(
    //             new URL(`/auth/login?p=${previousPage}`, req.url)
    //         );
    //     }
    // }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/checkout/:path*"]
};
