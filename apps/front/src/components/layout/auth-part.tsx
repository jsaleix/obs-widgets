"use client";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
    user: Session["user"] | null | undefined;
}

export default function AuthPart({ user }: Props) {
    if (user) {
        return (
            <div className="flex items-center gap-5">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src={user.image as string} alt={user.name as string} />
                </div>
                <h3>{user.name}</h3>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    } else {
        return (
            <div className="flex items-center gap-5">
                <Link href="/auth/signin" onClick={() => signIn()}>
                    Sign in / Login
                </Link>
            </div>
        );
    }
}
