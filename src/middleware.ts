import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const previousPage = req.nextUrl.pathname;
    const validRoles = ["admin", "super-user", "SEO"];

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session) {
        // const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`;
        url.search = `p=${previousPage}`;

        // Para el backend (endpoints)
        if (previousPage.includes("/api")) {
            return new Response(JSON.stringify({ message: "No autorizado" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        return NextResponse.redirect(url);
    }

    if (previousPage.startsWith("/checkout")) {
        return NextResponse.next();
    }

    if (previousPage.startsWith("/admin") && !validRoles.includes(session.user.role)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (previousPage.startsWith("/api/admin") && !validRoles.includes(session.user.role)) {
        return new Response(JSON.stringify({ message: "No autorizado" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return NextResponse.next();

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
    matcher: ["/checkout/:path*", "/orders/:path*", "/api/orders/:path*", "/admin/:path*", "/api/admin/:path*"]
};
