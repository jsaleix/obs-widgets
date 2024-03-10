import { CounterRowSettings } from "@/lib/interfaces/counter";
import { classNames } from "@/lib/utils";
import { Suspense, lazy } from "react";
import IconRenderer from "./icon-renderer";

interface Props {
    data: CounterRowSettings;
    iconColor: string;
}

export default function RowItem({ iconColor, data }: Props) {
    const { fontColor, label, value, icon } = data;

    return (
        <div
            className="flex flex-row items-center h-fit gap-5"
            style={{ color: fontColor }}
        >
            <IconRenderer name={icon} color={iconColor} />
            <dl className="flex items-end gap-1">
                <dt className="text-6xl font-bold">{value}</dt>
                <dd className="text-4xl w-fit text-nowrap">{label}</dd>
            </dl>
        </div>
    );
}
