"use client";
import { navLinks } from "@/lib/config/routes";
import { classNames } from "@/lib/utils";
import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

interface Props {
    open: boolean;
    setOpen: (val: boolean) => void;
    user: Session["user"] | null | undefined;
}

export default function MobileMenu({ open, setOpen, user }: Props) {
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
            {open && (
                <>
                    <ul
                        className="relative menu menu-vertical flex flex-col items-center gap-2 text-xl text-white capitalize"
                        style={{ zIndex: 10001 }}
                    >
                        {navLinks.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className="text-3xl"
                                    onClick={closeMenu}
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
