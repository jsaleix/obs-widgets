"use client";

import Counter from "@/components/widgets/counter/rendered";
import { IconsValues } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import { useEffect, useState } from "react";

const PRIMARY_COLOR = "#03fc41";
const SECONDARY_COLOR = "#03adfc";
const BG_COLOR = "#000000";

const counterData = {
    id: "id",
    name: "name",
    owner: "owner",
    rows: [
        {
            id: crypto.randomUUID(),
            icon: IconsValues.controller,
            fontColor: "#FFFFFF",
            label: "Steps",
            value: 0,
        },
        {
            id: crypto.randomUUID(),
            icon: IconsValues.controller,
            fontColor: "#FFFFFF",
            label: "Km",
            value: 0,
        },

    ],
    general: {
        bgColor: BG_COLOR,
        iconsColor: PRIMARY_COLOR,
        optionalText: "Walking 🚶‍♂️",
        optionalTextColor: "#FFFFFF",
        bgOpacity: 100,
        bgImageOpacity: 55,
        bgImage: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
};

export default function Counter3() {
    const [counter, setCounter] = useState<CounterPublicI>(counterData);

    useEffect(() => {
        const interval = setInterval(() => {
            const prev = counter;
            const [steps, km] = prev.rows;
            steps.value = steps.value + 5 >= 100 ? 0 : steps.value + 5;
            km.value = steps.value % 100 === 0 ? km.value + 1 : km.value;
            //Bug if I use setCounter(prev => return {...}) so I have to use a temp variable
            setCounter({ ...prev, rows: [steps, km] });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center w-fit h-fit">
            <Counter counter={counter} />
        </div>
    );
}
