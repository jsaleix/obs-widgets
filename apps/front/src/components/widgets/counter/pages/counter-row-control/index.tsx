"use client";
import { CounterI } from "@/lib/interfaces/counter";
import useSSECounter from "@/hooks/use-sse-counter";
import RowControlItem from "./row-control-item";

interface Props {
    counter: CounterI;
    bgColor: string;
}

export default function CounterRowControl({ counter }: Props) {
    const data = useSSECounter({ initData: counter });

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.rows.length > 0 &&
                data.rows.map((r, idx) => (
                    <RowControlItem
                        secret={counter.secret}
                        counter={data}
                        row={r}
                        key={idx}
                    />
                ))}
        </div>
    );
}
