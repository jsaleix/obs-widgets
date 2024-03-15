"use client";

import Counter from "@/components/widgets/counter/rendered";
import { IconsValues } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import { useState } from "react";

const PRIMARY_COLOR = "#f0b9e3";
const BG_COLOR = "#02289c";

const counterData = {
    id: "id",
    name: "name",
    owner: "owner",
    rows: [
        {
            id: crypto.randomUUID(),
            icon: IconsValues.cross,
            fontColor: "#4b75f2",
            label: "label",
            value: 0,
        },
    ],
    general: {
        bgColor: BG_COLOR,
        iconsColor: PRIMARY_COLOR,
        optionalText: "",
        optionalTextColor: "#FFFFFF",
        bgOpacity: 50,
        bgImageOpacity: 85,
        bgImage: "",
    },
};

export default function Counter7() {
    const [counter] = useState<CounterPublicI>(counterData);

    return (
        <div className="flex items-center w-fit h-fit">
            <Counter counter={counter} />
        </div>
    );
}
