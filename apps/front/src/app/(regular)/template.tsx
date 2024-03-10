import Header from "@/components/layout/header";
import React from "react";

export default async function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <React.Fragment>
            <Header />
            <main className="w-100 h-full">{children}</main>
        </React.Fragment>
    );
}
