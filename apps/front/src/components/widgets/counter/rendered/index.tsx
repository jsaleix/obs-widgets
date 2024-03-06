import { CounterI, CounterPublicI } from "@/lib/interfaces/counter";
import RowItem from "./row-item";
import OptionalText from "./optional-text";
import { classNames } from "@/lib/utils";

interface Props {
    counter: CounterPublicI;
}

export default function Counter({ counter }: Props) {
    if (counter?.rows === undefined || counter?.id === undefined) return null;
    const bgColor = counter.general.bgColor;
    const classes = classNames(
        "flex flex-col h-5rem w-fit rounded-md opacity-90 select-none bg-opacity-85",
        // "bg-[#1da1f2]",
        `bg-[${bgColor}]`
    );
    return (
        <div className={classes} style={{ backgroundColor: bgColor }}>
            <div className="flex flex-col items-start gap-4 p-5 w-90">
                {counter.rows.length > 0 &&
                    counter.rows.map((r, idx) => (
                        <RowItem data={r} key={idx} />
                    ))}
                {counter.general.optionalText && (
                    <OptionalText
                        text={counter.general.optionalText}
                        color={counter.general.optionalTextColor}
                    />
                )}
            </div>
        </div>
    );
}
