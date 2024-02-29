"use client";
import RenderedWidget from "@/components/widgets/counter/rendered";
import useSSECounter from "@/hooks/use-sse-counter";
import { CounterI } from "@/lib/interfaces/counter";

interface Props {
    initData: CounterI;
}

export default function RealtimeCounterWrapper({ initData }: Props) {
    const data = useSSECounter({ initData });
    return <RenderedWidget counter={data} />;
}
