import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div className="flex">
                <Image src="/logo.png" alt="logo" width={100} height={100} />
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/widgets">Widgets</Link>
                </nav>
            </div>
        </header>
    );
}
