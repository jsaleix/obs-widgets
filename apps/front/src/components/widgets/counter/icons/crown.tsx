interface Props {
    color: string;
}

export default function CrownIcon({ color }: Props) {
    return (
        <svg
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17 2L23.6667 12L32 5.33333L28.6667 22H5.33333L2 5.33333L10.3333 12L17 2Z"
                stroke={color??"white"}
                strokeWidth="3.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
