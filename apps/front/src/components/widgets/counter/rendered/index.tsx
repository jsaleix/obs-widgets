import { CounterI, CounterPublicI } from "@/lib/interfaces/counter";
import RowItem from "./row-item";
import OptionalText from "./optional-text";
import { classNames } from "@/lib/utils";

interface Props {
    counter: CounterPublicI;
}

export default function Counter({ counter }: Props) {
    if (counter?.rows === undefined || counter?.id === undefined) return null;
    const { bgColor, bgImage, bgOpacity } = counter.general;
    const classes = classNames(
        "relative flex flex-col h-5rem w-fit min-w-80 min-h-24 rounded-md opacity-90 select-none overflow-hidden",
        `bg-[${bgColor}]`
    );

    return (
        <div
            className={classes}
            style={{
                backgroundColor: bgColor,
            }}
        >
            <div
                id="bg-image"
                className={classNames(
                    "absolute top-0 left-0 w-full h-full",
                    ``
                )}
                style={{
                    opacity: bgOpacity > 0 ? bgOpacity / 100 : 0,
                    backgroundImage: bgImage ? `url(${bgImage})` : "",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    zIndex: -1,
                }}
            />
            <div className="flex flex-col items-start gap-4 p-5 min-w-100 ">
                {counter.rows.length > 0 &&
                    counter.rows.map((r, idx) => (
                        <RowItem
                            data={r}
                            key={idx}
                            iconColor={counter.general.iconsColor}
                        />
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
