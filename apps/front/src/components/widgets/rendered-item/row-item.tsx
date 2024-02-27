import { WidgetRowSettings } from "@/interfaces/widget";
import { classNames } from "@/lib/utils";

interface Props {
    data: WidgetRowSettings;
}

export default function RowItem({ data }: Props) {
    return (
        <div className="flex flex-row items-center h-fit gap-5">
            <svg
                width="34"
                height="24"
                viewBox="0 0 34 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M17 2L23.6667 12L32 5.33333L28.6667 22H5.33333L2 5.33333L10.3333 12L17 2Z"
                    stroke="white"
                    strokeWidth="3.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <h1 className="text-6xl font-bold">
                <span className="animate-pulse">{data.value.toString()}</span>
                <span className={classNames("text-4xl")}>{data.label}</span>
            </h1>
        </div>
    );
}
