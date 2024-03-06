"use client";
import RenderedWidget from "@/components/widgets/counter/rendered";
import useSSECounter from "@/hooks/use-sse-counter";
import { CounterI, CounterPublicI } from "@/lib/interfaces/counter";
import { useEffect } from "react";

interface Props {
    initData: CounterPublicI;
}

export default function RealtimeCounterWrapper({ initData }: Props) {
    const data = useSSECounter({ initData });
    return <RenderedWidget counter={data} />;
}
