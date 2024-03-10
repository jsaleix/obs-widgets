"use client";
import { navLinks } from "@/lib/config/routes";
import { classNames } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Divide } from "hamburger-react";

interface Props {
    user: Session["user"] | null | undefined;
}

export default function MobileMenu({ user }: Props) {
    const [open, setOpen] = useState(false);
    const baseClasses = classNames(
        "md:hidden h-screen w-screen fixed top-0 left-0 flex flex-col items-center justify-center",
        open ? "bg-black opacity-90" : "pointer-events-none"
    );

    const closeMenu = () => {
        setOpen(false);
    };

    const wrapSignOut = () => {
        setOpen(false);
        signOut();
    };

    return (
        <div className={baseClasses}>
            <div
                className="flex gap-3 items-center absolute top-6 right-5 pointer-events-auto"
                style={{ zIndex: 10000 }}
            >
                {user && (
                    <div className="flex h-10 w-10 rounded-full overflow-hidden">
                        <img
                            src={user.image as string}
                            alt={user.name as string}
                        />
                    </div>
                )}
                <Divide
                    size={32}
                    color={"white"}
                    toggle={(val) => setOpen(val)}
                    toggled={open}
                />
            </div>
            {open && (
                <>
                    <ul
                        className="relative menu menu-vertical flex flex-col items-center gap-2 text-xl text-white capitalize"
                        style={{ zIndex: 10001 }}
                    >
                        {navLinks.map((item, index) => (
                            <li>
                                <Link
                                    className="text-3xl"
                                    onClick={closeMenu}
                                    key={index}
                                    href={item.path}
                                    target={item?.target ?? "_self"}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-5 border-t-2 pt-5">
                        {user ? (
                            <button className="text-3xl" onClick={wrapSignOut}>
                                Sign Out
                            </button>
                        ) : (
                            <button
                                className="text-3xl"
                                onClick={() => signIn()}
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
