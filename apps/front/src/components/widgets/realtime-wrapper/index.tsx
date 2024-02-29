"use client";
import RenderedWidget from "@/components/widgets/counter";
import { CounterI } from "@/lib/interfaces/counter";
import { useEffect, useMemo, useState } from "react";

interface Props {
    initData: CounterI;
}

export default function RealtimeCounterWrapper({ initData }: Props) {
    const [data, setData] = useState<CounterI>(initData);

    useEffect(() => {
        if (typeof window === "undefined") {
            console.log("window is undefined");
            return;
        }

        const eventSource = new EventSource(
            `/api/widgets/counter/${initData.id}/sse`
        );
        
        // eventSource.onmessage = (e) => {
        //     const msg = JSON.parse(e.data);
        //     console.log("onmessage", msg.type);
        //     if (msg.type === "counter-update") {
        //         setData(msg.data);
        //         console.log("counter-update", msg.data.row[0].value);
        //     }
        // };
        eventSource.addEventListener("counter-update", (d) => {
            const newData = JSON.parse(d.data);
            setData(newData.data);
            console.log("counter-update", d);
        })

        eventSource.addEventListener("connected", () => {
            console.log("connected");
        })
        return () => {
            eventSource.close();
        };
    });
    return <RenderedWidget counter={data} />;
}
