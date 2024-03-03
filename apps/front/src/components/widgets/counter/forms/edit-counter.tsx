"use client";
import React, { useEffect, useMemo, useState } from "react";
import GeneralForm, { GeneralFormInputs } from "./general-form";
import RowForm, { RowFormInputs } from "./row-form";
import { CounterI } from "@/lib/interfaces/counter";
import Counter from "../rendered";
import Button from "@/components/common/button";
import Loader from "@/components/misc/loader";

interface Props {
    initValues: null | CounterI;
    submitAction: (data: any) => Promise<any>;
}

export default function EditCounter({ initValues, submitAction }: Props) {
    const [savedData, setSavedData] = useState<null | CounterI>(initValues);
    const [localData, setLocalData] = useState<null | CounterI>(initValues);
    const hasChanged = useMemo(
        () => JSON.stringify(savedData) !== JSON.stringify(localData),
        [initValues, localData]
    );
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!hasChanged) return;
        setLoading(true);
        await submitAction(localData);
        setSavedData(localData);
        setLoading(false);
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

    if (!savedData) return null;

    return (
        <React.Fragment>
            <div className="w-full flex flex-row gap-5">
                <div className="w-1/2 flex flex-col gap">
                    <div className={"flex flex-col w-full"}>
                        <GeneralForm
                            submitAction={handleGeneralChange}
                            initValues={savedData.general}
                            formMode="edit"
                        />
                    </div>
                    <div
                        className={
                            "w-full flex flex-col gap-3 pt-3 mt-3  border-t-2 border-gray-600"
                        }
                    >
                        {savedData.rows.length > 0 &&
                            savedData.rows.map((row, idx) => (
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
                        {isLoading ? (
                            <Button disabled className="uppercase">
                                <Loader />
                                Saving...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                disabled={!hasChanged}
                                className="uppercase"
                            >
                                SAVE
                            </Button>
                        )}
                    </form>
                </div>

                <div id="preview" className="w-1/2">
                    <Counter counter={savedData} />
                </div>
            </div>
        </React.Fragment>
    );
}
