import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { Session } from "next-auth";

interface Props {
    user: Session["user"] | null | undefined;
}

export default function HeaderMobile({ user }: Props) {
    return (
        <div className="flex md:hidden w-full h-fit border-b-2 border-gray-500">
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
                </div>
                <MobileMenu user={user} />
            </div>
        </div>
    );
}
