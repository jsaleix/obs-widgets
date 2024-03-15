"use client";

import Counter from "@/components/widgets/counter/rendered";
import { IconsValues } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import { useState } from "react";

const PRIMARY_COLOR = "#f2bb05";
const BG_COLOR = "#000FFF";

const counterData = {
    id: "id",
    name: "name",
    owner: "owner",
    rows: [
        {
            id: crypto.randomUUID(),
            icon: IconsValues.star,
            fontColor: "#FFFFFF",
            label: "label",
            value: 0,
        },
    ],
    general: {
        bgColor: BG_COLOR,
        iconsColor: PRIMARY_COLOR,
        optionalText: "",
        optionalTextColor: "#FFFFFF",
        bgOpacity: 60,
        bgImage:
            "https://plus.unsplash.com/premium_photo-1670876808488-db44fb4a12d3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
};

export default function Counter6() {
    const [counter] = useState<CounterPublicI>(counterData);

    return (
        <div className="flex items-center w-fit h-fit">
            <Counter counter={counter} />
        </div>
    );
}
