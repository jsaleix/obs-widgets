import { classNames } from "@/lib/utils";
import React, { useMemo } from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    register: any;
}

export default function Select({
    className,
    register,
    children,
    ...props
}: Props) {
    const classes = classNames(
        "w-full p-2 border border-gray-300 rounded-md outline-none text-black",
        className ?? ""
    );

    return (
        <select {...props} className={classes} {...register}>
            {children}
        </select>
    );
}
