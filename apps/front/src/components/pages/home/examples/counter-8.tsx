"use client";

import Counter from "@/components/widgets/counter/rendered";
import { IconsValues } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import { useEffect, useState } from "react";

const PRIMARY_COLOR = "#e33812";
const SECONDARY_COLOR = "#FFFFFF";
const BG_COLOR = "#bdbab9";
// const BG_COLOR = "#dba81d";

const counterData = {
    id: "id",
    name: "name",
    owner: "owner",
    rows: [
        {
            id: crypto.randomUUID(),
            icon: IconsValues.cross,
            fontColor: "#000000",
            label: "Ideas",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.cross,
            fontColor: "#FFFFFF",
            label: "For",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.skull,
            fontColor: "#e33812",
            label: "This one",
            value: 0,
        },
    ],
    general: {
        bgColor: BG_COLOR,
        iconsColor: PRIMARY_COLOR,
        optionalText: "",
        optionalTextColor: "#FFFFFF",
        bgImage:
            "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bgOpacity: 100,
    },
};

export default function Counter8() {
    const [counter, setCounter] = useState<CounterPublicI>(counterData);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomVal = Math.floor(Math.random() * 100);
            const prev = counter;
            const [ideas, ...rest] = prev.rows;
            ideas.value = ideas.value <= -99 ? 0 : ideas.value - 1;
            //Bug if I use setCounter(prev => return {...}) so I have to use a temp variable
            setCounter({ ...prev, rows: [ideas, ...rest] });
        }, 1300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center w-fit h-fit">
            <Counter counter={counter} />
        </div>
    );
}
