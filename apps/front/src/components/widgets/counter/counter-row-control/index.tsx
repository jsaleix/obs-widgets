"use client";
import {
    CounterI,
    CounterRowSettings,
    RowMutation,
} from "@/lib/interfaces/counter";
import RowItem from "../rendered/row-item";
import Button from "@/components/common/button";
import { copyToClipboard } from "@/lib/utils";
import { useMemo, useState } from "react";

interface Props {
    counter: CounterI;
    bgColor: string;
    row: CounterRowSettings;
}

const API_PATH = "/api/widgets/counter";

export default function CounterRowControl({ counter, row, bgColor }: Props) {
    const [localRowData, setLocalRowData] = useState<CounterRowSettings>(row);

    const curlReq = useMemo(
        () =>
            `curl --location --request PATCH 'http://localhost:3000/api/widgets/counter/${counter.id}/${row.id}?secret=${counter.secret}&type=increment'`,
        [counter, row.id]
    );

    const handleCopy = (text: string) => {
        copyToClipboard({ text, toast: true });
    };

    const handleValueChange = async (type: string) => {
        try {
            const r = await fetch(
                `${API_PATH}/${counter.id}/${row.id}?secret=${counter.secret}&type=${type}`,
                {
                    method: "PATCH",
                }
            );
            if (r.status === 200) {
                switch (type) {
                    case RowMutation.increment:
                        setLocalRowData((prev) => {
                            return { ...prev, value: prev.value + 1 };
                        });
                        break;
                    case RowMutation.decrement:
                        setLocalRowData((prev) => {
                            return { ...prev, value: prev.value - 1 };
                        });
                        break;
                }
            } else throw new Error("Error incrementing");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="w-full flex flex-col gap-3 border-2 border-white p-5 rounded-xl select-none">
            <div
                className="p-3 overflow-hidden"
                style={{ backgroundColor: bgColor }}
            >
                <RowItem
                    data={localRowData}
                    iconColor={counter.general.iconsColor}
                />
            </div>
            <hr />
            <div className="flex flex-col gap-3" id="actions">
                <div className="flex gap-2">
                    <Button title={row.id} onClick={() => handleCopy(row.id)}>
                        Copy id: {row.id.slice(0, 10) + "..."}
                    </Button>
                    <Button title={row.id} onClick={() => handleCopy(curlReq)}>
                        Copy curl request
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button
                        className={"!w-1/2"}
                        onClick={() => handleValueChange(RowMutation.increment)}
                    >
                        Increment
                    </Button>
                    <Button
                        className={"!w-1/2"}
                        onClick={() => handleValueChange(RowMutation.decrement)}
                    >
                        Decrement
                    </Button>
                </div>
            </div>
        </div>
    );
}
