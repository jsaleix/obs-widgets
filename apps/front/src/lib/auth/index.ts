import { NextAuthOptions, getServerSession } from "next-auth";
import counterService from "../services/counter.service";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { Adapter } from "next-auth/adapters";
import { firebaseConfig } from "../firebase/config";
import twitchProvider from "./providers/twitch-provider";

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

export const authOptions: NextAuthOptions = {
    adapter: FirestoreAdapter(firebaseConfig) as Adapter,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (!token) return session;
            session.user.id = token.sub;
            return session;
        },
    },
    providers: [twitchProvider],
    secret: process.env.NEXTAUTH_SECRET,
};
