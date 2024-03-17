interface NavLinkI {
    name: string;
    path: string;
}

export const navLinks: Array<NavLinkI> = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Manage Widgets",
        path: "/widgets",
    },
];

export const protectedPaths = ["/widgets", "/admin"];
