import ActiveLink from "@/components/common/active-link";
import Button from "@/components/common/button";
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
    // TODO: verify if the user is the owner of the widget
    const counter = await counterService.findOne(counterId);
    // return redirect("/widgets")
}

export default async function Layout({
    children,
    params: { counterId },
}: Props) {
    await authorizationCheck(counterId);
    const baseUrl = `/widgets/counter/${counterId}`;

    return (
        <div className="w-full flex flex-col gap-5">
            <div className="w-full border-b-2 border-gray-600 flex items-center py-3 mb-5">
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
                            Control
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
                    className="ml-auto"
                >
                    <Button className="px-10 ">View</Button>
                </Link>
            </div>
            {children}
        </div>
    );
}
