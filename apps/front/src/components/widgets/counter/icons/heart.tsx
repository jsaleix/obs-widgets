interface Props {
    color: string;
}

export default function HeartIcon({ color }: Props) {
    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 28 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.14 22.0327L14 22.1744L13.846 22.0327C7.196 15.9259 2.8 11.8877 2.8 7.79292C2.8 4.95913 4.9 2.83379 7.7 2.83379C9.856 2.83379 11.956 4.25068 12.698 6.17766H15.302C16.044 4.25068 18.144 2.83379 20.3 2.83379C23.1 2.83379 25.2 4.95913 25.2 7.79292C25.2 11.8877 20.804 15.9259 14.14 22.0327ZM20.3 0C17.864 0 15.526 1.14768 14 2.94714C12.474 1.14768 10.136 0 7.7 0C3.388 0 0 3.41471 0 7.79292C0 13.1346 4.76 17.5128 11.97 24.1297L14 26L16.03 24.1297C23.24 17.5128 28 13.1346 28 7.79292C28 3.41471 24.612 0 20.3 0Z"
                fill={color ?? "white"}
            />
        </svg>
    );
}
