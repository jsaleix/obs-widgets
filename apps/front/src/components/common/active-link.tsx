"use client";
import { classNames } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface Props extends LinkProps {
    activeClassName?: string;
    children: React.ReactNode;
    className?: string;
}

export default function ActiveLink({
    children,
    activeClassName,
    ...rest
}: Props) {
    const currentPath = usePathname();
    const cond = currentPath === rest.href.toString();

    return (
        <Link
            {...rest}
            className={classNames(
                rest.className ?? "",
                cond ? activeClassName ?? "" : ""
            )}
        >
            {children}
        </Link>
    );
}
