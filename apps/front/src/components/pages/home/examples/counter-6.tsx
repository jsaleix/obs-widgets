"use client";

import Counter from "@/components/widgets/counter/rendered";
import { IconsValues } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import { useState } from "react";

const PRIMARY_COLOR = "#f2bb05";
const BG_COLOR = "#00990f";

const counterData = {
    id: "id",
    name: "name",
    owner: "owner",
    rows: [
        {
            id: crypto.randomUUID(),
            icon: IconsValues.star,
            fontColor: "#43f507",
            label: "label",
            value: 0,
        },
    ],
    general: {
        bgColor: BG_COLOR,
        iconsColor: PRIMARY_COLOR,
        optionalText: "",
        optionalTextColor: "#FFFFFF",
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
