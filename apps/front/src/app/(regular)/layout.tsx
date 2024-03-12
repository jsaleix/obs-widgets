import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { classNames } from "@/lib/utils";
import SessionProvider from "@/components/providers/session-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerAuthSession } from "@/lib/auth";
import { APP_TITLE } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: APP_TITLE,
    description: "Toolbox for your Twitch live stream",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerAuthSession();

    return (
        <html lang="en" data-theme="dark">
            <body
                className={classNames(
                    inter.className,
                    "min-h-screen max-w-screen overflow-x-hidden"
                )}
            >
                <SessionProvider session={session} refetchOnWindowFocus={true}>
                    {children}
                </SessionProvider>
                <ToastContainer />
                <div id="modal-root"></div>
            </body>
        </html>
    );
}
