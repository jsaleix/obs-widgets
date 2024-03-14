"use client";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { Divide } from "hamburger-react";
import { classNames } from "@/lib/utils";

interface Props {
    user: Session["user"] | null | undefined;
}

export default function HeaderMobile({ user }: Props) {
    const headerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            ref={headerRef}
            className={classNames(
                "flex md:hidden w-full h-fit border-b-2 border-gray-500 z-100",
                isScrolling ? "sticky top-0 left-0 bg-background bg-opacity-70" : ""
            )}
            style={{zIndex: 100}}
        >
            <div className="w-full p-3 container mx-auto flex justify-between items-center">
                <div className="w-33 h-20 overflow-hidden z-100" style={{zIndex: 101}}>
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            className="relative h-full w-full object-cover z-50"
                            alt="logo"
                            width={130}
                            height={100}
                        />
                    </Link>
                </div>
                <div className="flex justify-end items-center z-100" style={{zIndex: 101}}>
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
                        toggle={(val) => setOpenMenu(val)}
                        toggled={openMenu}
                    />
                </div>
                <MobileMenu open={openMenu} setOpen={setOpenMenu} user={user} />
            </div>
        </div>
    );
}
