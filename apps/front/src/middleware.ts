import { protectedPaths } from "./lib/config/routes";

export { default } from "next-auth/middleware";

export const config = {
    matcher: protectedPaths,
};
