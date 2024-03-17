import { navLinks } from "@/lib/config/routes";
import Image from "next/image";
import Link from "next/link";
import AuthPart from "./auth-part-desktop";
import { Session } from "next-auth";
import { Roles } from "@/lib/config/users";
import ActiveLink from "../common/active-link";
import React from "react";

interface Props {
    user: Session["user"] | null | undefined;
}

export default function HeaderDesktop({ user }: Props) {
    return (
        <header className="hidden md:flex w-full h-fit border-b-2 border-gray-500">
            <div className="w-full p-3 container mx-auto flex justify-between flex items-center">
                <div className={"flex justify-center items-center gap-6"}>
                    <div className="w-33 h-20 overflow-hidden hover:opacity-80">
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                className="h-full w-full object-contain"
                                alt="logo"
                                width={130}
                                height={100}
                            />
                        </Link>
                    </div>
                </div>
                <nav className="w-fit">
                    <LinksSection userRole={user?.role} />
                </nav>
                <AuthPart user={user} />
            </div>
        </header>
    );
}

export function LinksSection({ userRole }: { userRole: string | undefined }) {
    return (
        <div className="rounded-full flex p-2 gap-4 border border-grey-400 items-center text-xs">
            {navLinks.map((item, index) => (
                <ActiveLink
                    key={index}
                    href={item.path}
                    className="p-2 hover:bg-gray-200 text-white hover:text-black rounded-full transition-colors duration-200"
                    activeClassName="bg-red-800 !hover:bg-red-800 !hover:text-white"
                >
                    {item.name}
                </ActiveLink>
            ))}
            {userRole === Roles.admin && (
                <ActiveLink
                    href="/admin"
                    className="p-2 hover:bg-gray-200 text-white hover:text-black rounded-full transition-colors duration-200"
                    activeClassName="bg-red-800 !hover:bg-red-800 !hover:text-white"
                >
                    Admin
                </ActiveLink>
            )}
        </div>
    );
}
