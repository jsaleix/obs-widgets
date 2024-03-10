"use client";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {session ? <p>Hello {session.user.email}</p> : <p>Hello</p>}
        </main>
    );
}
