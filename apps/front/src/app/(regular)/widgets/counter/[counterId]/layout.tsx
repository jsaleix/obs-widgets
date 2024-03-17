import ActiveLink from "@/components/common/active-link";
import Button from "@/components/common/button";
import ExternalIcon from "@/components/icons/external";
import { checkPermission } from "@/lib/auth";
import counterService from "@/lib/services/counter.service";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode;
    params: {
        counterId: string;
    };
}

async function authorizationCheck(counterId: string) {
    try {
        await checkPermission(counterId);
    } catch (e) {
        redirect("/widgets");
    }
}

export default async function Layout({
    children,
    params: { counterId },
}: Props) {
    await authorizationCheck(counterId);
    const baseUrl = `/widgets/counter/${counterId}`;

    return (
        <div className="w-full flex flex-col md:gap-5">
            <div className="px-5 md:px-0 w-full border-b-2 border-gray-600 flex flex-col gap-3 md:gap-0 md:flex-row md:items-center justify-start py-3 mb-5">
                <LinksSection baseUrl={baseUrl} />
                <Link
                    target="_blank"
                    href={`/viewer/counter/${counterId}`}
                    className="ml-0 md:ml-auto"
                >
                    <Button className="px-10 !w-fit flex gap-2">
                        Overlay mode <ExternalIcon />
                    </Button>
                </Link>
            </div>
            <div className="px-5 md:px-0 w-full">{children}</div>
        </div>
    );
}

export function LinksSection({ baseUrl }: { baseUrl: string }) {
    const navLinks = [
        {
            name: "Overview",
            path: `${baseUrl}/overview`,
        },
        {
            name: "Edit",
            path: `${baseUrl}/edit`,
        },
        {
            name: "Controls",
            path: `${baseUrl}/controls`,
        },
        {
            name: "Settings",
            path: `${baseUrl}/settings`,
        },
    ];

    return (
        <ul className="md:w-fit w-full rounded-xl md:rounded-full overflow-hidden flex flex-row p-2 gap-4 border border-grey-400 items-center text-md overflow-x-scroll hideScrollBar">
            {navLinks.map((item, index) => (
                <li>
                    <ActiveLink
                        key={index}
                        href={item.path}
                        className="py-1 px-4 hover:bg-gray-200 text-white hover:text-black rounded-full transition-colors duration-200"
                        activeClassName="bg-red-800 !hover:bg-red-800 !hover:text-white"
                    >
                        {item.name}
                    </ActiveLink>
                </li>
            ))}
        </ul>
    );
}
