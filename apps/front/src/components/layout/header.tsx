import { navLinks } from "@/lib/config/routes";
import Image from "next/image";
import Link from "next/link";
import AuthPart from "./auth-part-desktop";
import { getServerAuthSession } from "@/lib/auth";
import MobileMenu from "./mobile-menu";
import HeaderMobile from "./header-mobile";
import HeaderDesktop from "./header-desktop";

export default async function Header() {
    const session = await getServerAuthSession();

    return (
        <>
            <HeaderDesktop user={session?.user} />
            <HeaderMobile user={session?.user} />
        </>
    );
}
