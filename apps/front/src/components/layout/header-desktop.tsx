import { navLinks } from "@/lib/config/routes";
import Image from "next/image";
import Link from "next/link";
import AuthPart from "./auth-part-desktop";
import { Session } from "next-auth";

interface Props {
    user: Session["user"] | null | undefined;
}

export default function HeaderDesktop({ user }: Props) {
    return (
        <div className="hidden md:flex w-full h-fit border-b-2 border-gray-500">
            <div className="w-full p-3 container mx-auto flex justify-between flex items-center">
                <div className={"flex justify-center items-center gap-6"}>
                    <div className="w-20 h-20 overflow-hidden">
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                className="h-full w-full object-cover"
                                alt="logo"
                                width={100}
                                height={100}
                            />
                        </Link>
                    </div>
                    <nav className="flex items-center gap-10">
                        {navLinks.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                target={item?.target ?? "_self"}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <AuthPart user={user} />
            </div>
        </div>
    );
}
