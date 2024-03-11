import { NextAuthOptions, getServerSession } from "next-auth";
import counterService from "../services/counter.service";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { Adapter } from "next-auth/adapters";
import { firebaseConfig } from "../firebase/config";
import twitchProvider from "./providers/twitch-provider";
import userService from "../services/user.service";
import { Roles } from "../config/users";

export const authOptions: NextAuthOptions = {
    adapter: FirestoreAdapter(firebaseConfig) as Adapter,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (!token) return session;
            session.user.id = token.sub;
            if (token?.role) session.user.role = token.role as string;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                const fullUser = await userService.getUser(user.id);
                if (fullUser) {
                    token.role = fullUser.role ?? Roles.user;
                }
            }
            return token;
        },
    },
    events: {
        async createUser(message) {
            const { id } = message.user;
            await userService.update(id, { role: Roles.user });
        },
    },
    providers: [twitchProvider],
    secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = () => getServerSession(authOptions);

export async function checkPermission(counterId: string) {
    const session = await getServerAuthSession();
    if (!session) throw new Error("Not authenticated.");
    const isAllowed = await counterService.isAllowedToEdit(
        counterId,
        session.user.id!
    );
    if (!isAllowed) throw new Error("Not allowed.");
}
