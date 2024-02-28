import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { classNames } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={classNames(inter.className, "overflow-hidden")}>
                {children}
            </body>
        </html>
    );
}
