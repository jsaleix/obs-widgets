import ActiveLink from "@/components/common/active-link";

export async function LinksSection({ baseUrl }: { baseUrl: string }) {
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
                <li key={index}>
                    <ActiveLink
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
