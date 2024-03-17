import { navLinks } from "@/lib/config/routes";
import Image from "next/image";
import Link from "next/link";
import AuthPart from "./auth-part-desktop";
import { Session } from "next-auth";
import { Roles } from "@/lib/config/users";
import ActiveLink from "../common/active-link";

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
                    <nav className="flex items-center gap-10">
                        {navLinks.map((item, index) => (
                            <ActiveLink
                                key={index}
                                href={item.path}
                                activeClassName="underline"
                            >
                                {item.name}
                            </ActiveLink>
                        ))}
                        {user?.role === Roles.admin && (
                            <Link href="/admin">Admin</Link>
                        )}
                    </nav>
                </div>
                <AuthPart user={user} />
            </div>
        </header>
    );
}
