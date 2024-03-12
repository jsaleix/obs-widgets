import ActiveLink from "@/components/common/active-link";
import Button from "@/components/common/button";
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
            <div className="w-full border-b-2 border-gray-600 flex flex-col gap-3 md:gap-0 md:flex-row md:items-center justify-start py-3 mb-5 px-5">
                <ul className={"flex align-center gap-5 h-fit"}>
                    <li>
                        <ActiveLink
                            href={`${baseUrl}/overview`}
                            activeClassName="underline"
                        >
                            Overview
                        </ActiveLink>
                    </li>
                    <li>
                        <ActiveLink
                            href={`${baseUrl}/edit`}
                            activeClassName="underline"
                        >
                            Edit
                        </ActiveLink>
                    </li>
                    <li>
                        <ActiveLink
                            href={`${baseUrl}/controls`}
                            activeClassName="underline"
                        >
                            Controls
                        </ActiveLink>
                    </li>
                    <li>
                        <ActiveLink
                            href={`${baseUrl}/settings`}
                            activeClassName="underline"
                        >
                            Settings
                        </ActiveLink>
                    </li>
                </ul>
                <Link
                    target="_blank"
                    href={`/viewer/counter/${counterId}`}
                    className="ml-0 md:ml-auto"
                >
                    <Button className="px-10 !w-fit">View (live)</Button>
                </Link>
            </div>
            <div className="px-0 w-full">{children}</div>
        </div>
    );
}
