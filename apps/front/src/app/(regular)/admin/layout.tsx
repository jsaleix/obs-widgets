import ActiveLink from "@/components/common/active-link";
import { getServerAuthSession } from "@/lib/auth";
import { Roles } from "@/lib/config/users";
import userService from "@/lib/services/user.service";
import Link from "next/link";
import { redirect } from "next/navigation";

const baseUrl = `/admin`;

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerAuthSession();
    if (session?.user.role !== Roles.admin) return redirect("/");

    return (
        <div className="container mx-auto h-full w-full flex flex-col pb-10">
            <div className="w-full border-b-2 border-gray-600 flex flex-col gap-3 md:gap-0 md:flex-row md:items-center justify-start py-3 mb-5 px-5">
                <ul className={"flex align-center gap-5 h-fit"}>
                    <li>
                        <ActiveLink
                            href={`${baseUrl}`}
                            activeClassName="underline"
                        >
                            Home
                        </ActiveLink>
                    </li>
                </ul>
            </div>
            <div>{children}</div>
        </div>
    );
}
