import { classNames } from "@/lib/utils";
import React, { useMemo } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    register: any;
}

export default function Input({ className, register, ...props }: Props) {
    const classes = classNames(
        "w-full p-2 border border-gray-300 rounded-md outline-none text-black",
        className ?? ""
    );

    return (
        <input
            {...props}
            className={classes}
            {...register}
        />
    );
}
