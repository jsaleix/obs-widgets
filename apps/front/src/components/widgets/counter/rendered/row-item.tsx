import { CounterRowSettings } from "@/lib/interfaces/counter";
import { classNames } from "@/lib/utils";
import { Suspense, lazy } from "react";
import IconRenderer from "./icon-renderer";

const CrownIcon = lazy(
    () => import("@/components/widgets/counter/icons/crown")
);
const HeartIcon = lazy(
    () => import("@/components/widgets/counter/icons/heart")
);

interface Props {
    data: CounterRowSettings;
    iconColor: string;
}

export default function RowItem({ iconColor, data }: Props) {
    const { fontColor, label, value, icon } = data;
    const RightIcon = icon === "crown" ? CrownIcon : HeartIcon;

    return (
        <div
            className="flex flex-row items-center h-fit gap-5"
            style={{ color: fontColor }}
        >
            <IconRenderer name={icon} color={iconColor} />
            <h1 className="text-6xl font-bold">
                <span className="animate-pulse">{value.toString()}</span>
                <span className={classNames("text-4xl")}>{label}</span>
            </h1>
        </div>
    );
}
