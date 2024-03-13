"use client";

import Counter from "@/components/widgets/counter/rendered";
import { IconsValues } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import { useEffect, useState } from "react";

const PRIMARY_COLOR = "#03fc41";
const SECONDARY_COLOR = "#03adfc";
const BG_COLOR = "#232329";

const counterData = {
    id: "id",
    name: "name",
    owner: "owner",
    rows: [
        {
            id: crypto.randomUUID(),
            icon: IconsValues.crown,
            fontColor: PRIMARY_COLOR,
            label: "Top 1",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.controller,
            fontColor: SECONDARY_COLOR,
            label: "Execs",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.controller,
            fontColor: PRIMARY_COLOR,
            label: "Frags",
            value: 0,
        },
    ],
    general: {
        bgColor: BG_COLOR,
        iconsColor: PRIMARY_COLOR,
        // Make a Call of duty warzone reference
        optionalText: "King of BR 🎮",
        optionalTextColor: "#FFFFFF",
    },
};

export default function Counter2() {
    const [counter, setCounter] = useState<CounterPublicI>(counterData);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomVal = Math.floor(Math.random() * 100);
            const prev = counter;
            const [tops, execs, frags] = prev.rows;
            if (randomVal % 4 === 0)
                tops.value = tops.value + 1 >= 100 ? 0 : tops.value + 1;
            if (randomVal % 2 === 0)
                frags.value = frags.value + 5 >= 100 ? 0 : frags.value + 5;
            if (randomVal % 6 === 0)
                execs.value = execs.value + 1 >= 100 ? 0 : execs.value + 1;
            // execs.value = execs.value + 1 >= 100 ? 0 : execs.value + 1;
            //Bug if I use setCounter(prev => return {...}) so I have to use a temp variable
            setCounter({ ...prev, rows: [tops, execs, frags] });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center w-fit h-fit">
            <Counter counter={counter} />
        </div>
    );
}
