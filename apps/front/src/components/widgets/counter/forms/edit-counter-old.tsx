"use client";
import React, { useEffect, useMemo, useState } from "react";
import GeneralForm from "./general-form";
import RowForm from "./row-form";
import {
    CounterI,
    GeneralFormInputs,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import Counter from "../rendered";
import Button from "@/components/common/button";
import Loader from "@/components/misc/loader";
import CounterRowModal from "@/components/modal/counter-row-modal";

interface Props {
    initValues: null | CounterI;
    submitAction: (data: any) => Promise<any>;
}

export default function EditCounterOld({ initValues, submitAction }: Props) {
    const [savedData, setSavedData] = useState<null | CounterI>(initValues);
    const [localData, setLocalData] = useState<null | CounterI>(initValues);
    const hasChanged = useMemo(
        () => JSON.stringify(savedData) !== JSON.stringify(localData),
        [initValues, localData]
    );
    const [isLoading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState<null | string>(null);
    const selectedRowData = useMemo(() => {
        if (!selectedRow) return null;
        return savedData?.rows.find((r) => r.id === selectedRow) ?? null;
    }, [selectedRow, savedData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!hasChanged) return;
        setLoading(true);
        await submitAction(localData);
        setSavedData(localData);
        setLoading(false);
    };

    const addRow = () => {};

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
                <div className="w-1/2 flex flex-col gap-3">
                    <div className={"flex flex-col w-full"}>
                        <GeneralForm
                            submitAction={handleGeneralChange}
                            initValues={savedData.general}
                            formMode="edit"
                        />
                    </div>
                    <hr />
                    <div className={"w-full flex flex-col gap-3"}>
                        {savedData.rows.length > 0 &&
                            savedData.rows.map((row, idx) => (
                                <Button
                                    key={idx}
                                    onClick={() => setSelectedRow(row.id)}
                                >
                                    {row.id}
                                </Button>
                            ))}
                        <Button onClick={addRow} className="bg-gray-500">
                            +
                        </Button>
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
                <CounterRowModal
                    isOpen={!!selectedRowData}
                    onClose={() => setSelectedRow(null)}
                    rowData={selectedRowData as RowFormInputs}
                    onSubmit={(data) =>
                        handleRowChange(
                            savedData.rows.findIndex(
                                (r) => r.id === selectedRow
                            ),
                            data
                        )
                    }
                />
            </div>
        </React.Fragment>
    );
}
