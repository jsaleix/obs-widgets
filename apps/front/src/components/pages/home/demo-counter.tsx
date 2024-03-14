"use client";

import Counter from "@/components/widgets/counter/rendered";
import { IconsValues } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import { useEffect, useState } from "react";

const counterData = {
    id: "id",
    name: "name",
    owner: "owner",
    rows: [
        {
            id: crypto.randomUUID(),
            icon: IconsValues.crown,
            fontColor: "#FFFFFF",
            label: "/2 victories",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.controller,
            fontColor: "#999999",
            label: "games",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.cross,
            fontColor: "#a32f2f",
            label: "loses",
            value: 0,
        },
    ],
    general: {
        bgColor: "#232329",
        iconsColor: "#FFFFFF",
        optionalText: "Road to Diamond ⚔️",
        optionalTextColor: "#FFFFFF",
    },
};

export default function DemoCounter() {
    const [counter, setCounter] = useState<CounterPublicI>(counterData);

    useEffect(() => {
        const interval = setInterval(() => {
            const prev = counter;
            const [row1, games, loses] = prev.rows;
            games.value = games.value + 1 >= 100 ? 0 : games.value + 1;
            loses.value = loses.value + 1 >= 100 ? 0 : loses.value + 1;
            loses.label = loses.value > 5 ? "loses 🤡" : "loses";
            setCounter({ ...prev, rows: [row1, games, loses] });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center w-fit h-fit">
            <Counter counter={counter} />
        </div>
    );
}
