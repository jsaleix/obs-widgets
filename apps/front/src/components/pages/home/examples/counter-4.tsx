"use client";

import Counter from "@/components/widgets/counter/rendered";
import { IconsValues } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import { useEffect, useState } from "react";

const PRIMARY_COLOR = "#f55361";
const SECONDARY_COLOR = "#FFFFFF";
const BG_COLOR = "#23205e";

const counterData = {
    id: "id",
    name: "name",
    owner: "owner",
    rows: [
        {
            id: crypto.randomUUID(),
            icon: IconsValues.crown,
            fontColor: "#f5df53",
            label: "Kills",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.controller,
            fontColor: SECONDARY_COLOR,
            label: "Deaths",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.controller,
            fontColor: SECONDARY_COLOR,
            label: "Assists",
            value: 0,
        },
    ],
    general: {
        bgColor: BG_COLOR,
        iconsColor: PRIMARY_COLOR,
        optionalText: "Game overview 🎮🔫",
        optionalTextColor: "#FFFFFF",
    },
};

export default function Counter4() {
    const [counter, setCounter] = useState<CounterPublicI>(counterData);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomVal = Math.floor(Math.random() * 100);
            const prev = counter;
            const [kills, deaths, assists] = prev.rows;
            if (randomVal % 4 === 0)
                kills.value = kills.value + 1 >= 100 ? 0 : kills.value + 1;
            if (randomVal % 2 === 0)
                deaths.value = deaths.value + 1 >= 100 ? 0 : deaths.value + 1;
            if (randomVal % 6 === 0)
                assists.value =
                    assists.value + 1 >= 100 ? 0 : assists.value + 1;
            //Bug if I use setCounter(prev => return {...}) so I have to use a temp variable
            setCounter({ ...prev, rows: [kills, deaths, assists] });
        }, 1300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center w-fit h-fit">
            <Counter counter={counter} />
        </div>
    );
}
