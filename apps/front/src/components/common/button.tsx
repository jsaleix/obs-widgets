interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...rest }: Props) {
    const classes = `bg-blue-500 text-white p-2 rounded-md ${className}`;
    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
}
