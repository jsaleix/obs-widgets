"use client";

import Button from "@/components/common/button";
import { HOSTNAME } from "@/lib/config";
import {
    CounterPublicI,
    CounterRowSettings,
    RowMutation,
} from "@/lib/interfaces/counter";
import { copyToClipboard } from "@/lib/utils";
import { displayMsg } from "@/lib/utils/toasts";
import { useState, useMemo } from "react";
import RowItem from "../../rendered/row-item";

interface Props {
    counter: CounterPublicI;
    secret: string;
    row: CounterRowSettings;
}

const API_PATH = "/api/widgets/counter";

export default function RowControlItem({ counter, secret, row }: Props) {
    const [loading, setLoading] = useState(false);

    const httpURL = useMemo(
        () =>
            new URL(
                `${HOSTNAME}/api/widgets/counter/${counter.id}/${row.id}?secret=${secret}&type=increment`
            ).toString(),
        [counter, row.id]
    );

    const handleCopy = (text: string) => {
        copyToClipboard({ text, toast: true });
    };

    const handleValueChange = async (type: string) => {
        try {
            setLoading(true);
            const r = await fetch(
                `${API_PATH}/${counter.id}/${row.id}?secret=${secret}&type=${type}`,
                {
                    method: "PATCH",
                }
            );
            if (r.status !== 200) throw new Error("Error incrementing");
        } catch (e: any) {
            console.log(e);
            displayMsg(e?.message ?? "Error incrementing", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-3 border-2 border-white p-5 rounded-xl select-none">
            <div
                className="p-3 overflow-hidden"
                style={{ backgroundColor: counter.general.bgColor }}
            >
                <RowItem data={row} iconColor={counter.general.iconsColor} />
            </div>
            <hr />
            <div className="flex flex-col gap-3" id="actions">
                <div className="flex gap-2">
                    <Button title={row.id} onClick={() => handleCopy(row.id)}>
                        Copy id: {row.id.slice(0, 10) + "..."}
                    </Button>
                    <Button title={row.id} onClick={() => handleCopy(httpURL)}>
                        Copy request
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button
                        disabled={loading}
                        className={"!w-1/2 gap-3"}
                        onClick={() => handleValueChange(RowMutation.increment)}
                    >
                        Increment
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 10H10V16H6V10H0V6H6V0H10V6H16V10Z"
                                fill="white"
                            />
                        </svg>
                    </Button>
                    <Button
                        disabled={loading}
                        className={"!w-1/2 gap-3"}
                        onClick={() => handleValueChange(RowMutation.decrement)}
                    >
                        Decrement
                        <svg
                            width="16"
                            height="4"
                            viewBox="0 0 16 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="16" height="4" fill="white" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}
