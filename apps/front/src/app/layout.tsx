import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { classNames } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Impera's widgets",
    description: "Toolbox for your Twitch live stream",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={classNames(inter.className, "h-screen")}>
                {children}
            </body>
        </html>
    );
}
