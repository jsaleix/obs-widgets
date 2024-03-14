"use client";

import Counter from "@/components/widgets/counter/rendered";
import { IconsValues } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import { useEffect, useState } from "react";

const PRIMARY_COLOR = "#3480eb";
const SECONDARY_COLOR = "#03adfc";
const BG_COLOR = "#36526b";
// const BG_COLOR = "#4bd1fa";

const counterData = {
    id: "id",
    name: "name",
    owner: "owner",
    rows: [
        {
            id: crypto.randomUUID(),
            icon: IconsValues.star,
            fontColor: "#737aeb",
            label: "shinies",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.controller,
            fontColor: SECONDARY_COLOR,
            label: "encounters",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.target,
            fontColor: PRIMARY_COLOR,
            label: "legendaries",
            value: 0,
        },
    ],
    general: {
        bgColor: BG_COLOR,
        iconsColor: "#FFFFFF",
        optionalText: "Gotta catch 'em all! 🎮",
        optionalTextColor: "#FFFFFF",
    },
};

export default function Counter1() {
    const [counter, setCounter] = useState<CounterPublicI>(counterData);

    useEffect(() => {
        const interval = setInterval(() => {
            const prev = counter;
            const [shinies, encounters, legendaries] = prev.rows;
            encounters.value =
                encounters.value + 1 >= 100 ? 0 : encounters.value + 1;
            //Bug if I use setCounter(prev => return {...}) so I have to use a temp variable
            setCounter({ ...prev, rows: [shinies, encounters, legendaries] });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center w-fit h-fit">
            <Counter counter={counter} />
        </div>
    );
}
