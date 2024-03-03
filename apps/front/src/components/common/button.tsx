import { classNames } from "@/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...rest }: Props) {
    const classes = classNames(
        "flex justify-center items-center bg-blue-500 text-white p-2 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed",
        className ?? ""
    );

    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
}
