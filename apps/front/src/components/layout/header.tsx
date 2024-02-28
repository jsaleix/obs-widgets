import { navLinks } from "@/lib/config/routes";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full h-fit border-b-2 border-gray-500">
            <div className="w-full p-3 flex container mx-auto flex justify-center md:justify-between flex items-center justify-center">
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
            </div>
        </header>
    );
}
