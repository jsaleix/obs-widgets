import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { classNames } from "@/lib/utils";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Impera's widgets",
    description: "Toolbox for your Twitch live stream",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <body className={classNames(inter.className, "h-screen")}>
                <SessionProvider session={session} refetchOnWindowFocus={true}>
                    {children}
                </SessionProvider>
                <div id="modal-root"></div>
            </body>
        </html>
    );
}
