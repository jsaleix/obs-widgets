import Header from "@/components/layout/header";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    );
}
