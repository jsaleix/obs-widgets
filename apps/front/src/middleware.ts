export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/widgets", "/admin"],
};
