interface NavLinkI {
    name: string;
    path: string;
    target?: string;
}

export const navLinks: Array<NavLinkI> = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Widgets",
        path: "/widgets",
    },
];

export const protectedPaths = [
    "/widgets", "/account"
]