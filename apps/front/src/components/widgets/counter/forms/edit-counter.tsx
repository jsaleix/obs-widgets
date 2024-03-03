"use client";
import React, { useEffect, useMemo, useState } from "react";
import GeneralForm, { GeneralFormInputs } from "./general-form";
import RowForm, { RowFormInputs } from "./row-form";
import { CounterI } from "@/lib/interfaces/counter";
import Counter from "../rendered";
import Button from "@/components/common/button";

interface Props {
    initValues: null | CounterI;
    submitAction: (data: any) => void;
}

export default function EditCounter({ initValues, submitAction }: Props) {
    const [localData, setLocalData] = useState<null | CounterI>(initValues);
    const hasChanged = useMemo(
        () => JSON.stringify(initValues) !== JSON.stringify(localData),
        [initValues, localData]
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!hasChanged) return;
        submitAction(localData);
    };

    const handleGeneralChange = (data: GeneralFormInputs) => {
        let newData = {
            ...localData,
            general: { ...localData?.general, ...data },
        };
        setLocalData(newData as CounterI);
    };

    const handleRowChange = (index: number, data: RowFormInputs) => {
        let newData = {
            ...localData,
            rows: localData?.rows.map((row, idx) =>
                idx === index ? { ...row, ...data } : row
            ),
        };
        setLocalData(newData as CounterI);
    };

    if (!localData) return null;

    useEffect(() => console.log(localData.general.optionalText), [localData]);
    return (
        <React.Fragment>
            <div className="w-full flex flex-row gap-5">
                <div className="w-1/2 flex flex-col gap-10">
                    <div className={"flex flex-col w-full"}>
                        <GeneralForm
                            submitAction={handleGeneralChange}
                            initValues={localData.general}
                            formMode="edit"
                        />
                    </div>
                    <div className={"flex flex-col w-full"}>
                        {localData.rows.length > 0 &&
                            localData.rows.map((row, idx) => (
                                <RowForm
                                    submitAction={(d) =>
                                        handleRowChange(idx, d)
                                    }
                                    key={idx}
                                    initValues={row}
                                    formMode="edit"
                                />
                            ))}
                    </div>
                    <form className={"w-full"} onSubmit={handleSubmit}>
                        <Button type="submit" disabled={!hasChanged}>
                            SAVE
                        </Button>
                    </form>
                </div>

                <div id="preview" className="w-1/2">
                    <Counter counter={localData} />
                    {JSON.stringify(
                        Object.keys(localData).sort((a, b) =>
                            a.localeCompare(b)
                        )
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}
