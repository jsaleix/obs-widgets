import { CounterI, CounterPublicI } from "@/lib/interfaces/counter";
import RowItem from "./row-item";
import OptionalText from "./optional-text";

interface Props {
    counter: CounterPublicI;
}

export default function Counter({ counter }: Props) {
    if (counter?.rows === undefined || counter?.id === undefined) return null;
    return (
        <div className="flex flex-col bg-neutral-900/85 h-5rem w-fit rounded-md opacity-90 select-none">
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
