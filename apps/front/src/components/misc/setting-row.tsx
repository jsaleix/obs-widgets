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
        <div className="w-full flex gap-5 align-center space-between">
            <div className="w-1/3 flex flex-col">
                <h1 className="text-xl capitalize">{title}</h1>
                {details && <p className="text-gray-400">{details}</p>}
            </div>
            <div
                className={classNames(
                    "w-1/3 flex flex-col",
                    contentClassName ?? ""
                )}
            >
                {children}
            </div>
        </div>
    );
}
