import twitchProvider from "@/lib/auth/providers/twitch-provider";
import { firebaseConfig } from "@/lib/firebase/config";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";

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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
