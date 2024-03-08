import { classNames } from "@/lib/utils";

interface Props {
    title: string;
    details?: string;
    children?: React.ReactNode;
    contentClassName?: string;
}

export default function SettingRow({
    title,
    details,
    contentClassName,
    children,
}: Props) {
    return (
        <div className="w-full flex flex-col md:flex-row gap-5 align-center space-between">
            <div className="w-full lg:w-1/3 flex flex-col">
                <h1 className="text-xl capitalize">{title}</h1>
                {details && <p className="text-gray-400">{details}</p>}
            </div>
            <div
                className={classNames(
                    "w-full lg:w-1/3 flex flex-col",
                    contentClassName ?? ""
                )}
            >
                {children}
            </div>
        </div>
    );
}
