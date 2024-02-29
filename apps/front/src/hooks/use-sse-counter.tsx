import { CounterI } from "@/lib/interfaces/counter";
import { useEffect, useRef, useState } from "react";

export default function useSSECounter({ initData }: { initData: CounterI }) {
    const [data, setData] = useState<CounterI>(initData);
    const eventSourceRef = useRef<EventSource | null>(null);

    const setupEventSource = () => {
        const eventSource = new EventSource(
            `/api/widgets/counter/${initData.id}/sse`
        );
        eventSourceRef.current = eventSource;

        eventSource.addEventListener("counter-update", (d) => {
            const newData = JSON.parse(d.data);
            setData(newData.data);
        });
    };

    useEffect(() => {
        setupEventSource();
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        };
    }, []);

    return data;
}
