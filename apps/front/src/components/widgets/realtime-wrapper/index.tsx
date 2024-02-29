"use client";
import RenderedWidget from "@/components/widgets/counter";
import useSSE from "@/hooks/use-sse";
import { CounterI } from "@/lib/interfaces/counter";
import { useEffect, useMemo, useState } from "react";

interface Props {
    initData: CounterI;
}

export default function RealtimeCounterWrapper({ initData }: Props) {
    const data = useSSE({ initData });
    return <RenderedWidget counter={data} />;
}
