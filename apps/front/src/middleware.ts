import { NextRequest } from "next/server";
import { protectedPaths } from "@/lib/config/routes";

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("currentUser")?.value;
    
    //Checks for each path in protectedPaths if request pathname starts with it
    if (
        !currentUser &&
        protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
    ) {
        // return Response.redirect(new URL("/login", request.url));
    }

    // if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    //     return Response.redirect(new URL("/", request.url));
    // }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
