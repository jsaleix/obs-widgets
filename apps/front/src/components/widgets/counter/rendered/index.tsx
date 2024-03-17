import { CounterI, CounterPublicI } from "@/lib/interfaces/counter";
import RowItem from "./row-item";
import OptionalText from "./optional-text";
import { classNames } from "@/lib/utils";

interface Props {
    counter: CounterPublicI;
}

export default function Counter({ counter }: Props) {
    if (counter?.rows === undefined || counter?.id === undefined) return null;
    const { bgColor, bgImage, bgImageOpacity, bgOpacity } = counter.general;
    const bgColorToRgba = (color: string, opacity: number) => {
        const hex = color.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    };

    return (
        <div
            className={
                "relative flex flex-col h-5rem w-fit min-w-24 min-h-24 rounded-md select-none overflow-hidden"
            }
            style={{
                backgroundColor: bgColorToRgba(bgColor, bgOpacity),
            }}
        >
            <div
                id="bg-image"
                className={classNames("absolute top-0 left-0 w-full h-full")}
                style={{
                    opacity: bgImageOpacity > 0 ? bgImageOpacity / 100 : 0,
                    backgroundImage: bgImage ? `url(${bgImage})` : "",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: 1,
                }}
            />
            <div
                id="rows"
                className="flex flex-col items-start gap-4 p-5 min-w-100 z-2"
                style={{ zIndex: 2 }}
            >
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
