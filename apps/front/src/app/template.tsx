import Header from "@/components/layout/header";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <Header />
            <main className="w-full h-full">{children}</main>
        </React.Fragment>
    );
}
