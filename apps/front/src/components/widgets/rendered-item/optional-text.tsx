interface Props {
    text: string;
    color: string;
}

export default function OptionalText({ text, color }: Props) {
    const className = `text-2xl text-${color}`;
    return <h2 className={className}>{text}</h2>;
}
