"use client";

import {
    CounterGeneralSettings,
    CounterI,
    CounterRowSettings,
    GeneralFormInputs,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import { useState } from "react";
import Counter from "../../rendered";
import RowsPart from "./rows-part";
import CounterRowModal from "@/components/modal/counter-row-modal";
import GeneralForm from "../general-form";
import { COUNTER_MAX_ROWS } from "@/lib/config/counter";

interface Props {
    initValues: CounterI;
    fetchCounter: () => Promise<CounterI>;
    addRow: () => Promise<boolean>;
    editRow: (id: string, data: RowFormInputs) => Promise<boolean>;
    editGeneral: (data: GeneralFormInputs) => Promise<boolean>;
}

export default function EditCounterPage({
    initValues,
    fetchCounter,
    addRow,
    editGeneral,
    editRow,
}: Props) {
    const [localData, setLocalData] = useState<CounterI>(initValues);
    const [selectedRow, setSelectedRow] = useState<null | string>(null);
    const selectedRowData = localData.rows.find((r) => r.id === selectedRow);

    const changeLocalGeneral = (data: GeneralFormInputs) => {
        let newData = {
            ...localData,
            general: { ...localData.general, ...data },
        };
        setLocalData(newData as CounterI);
    };

    const handleGeneralSubmit = async (data: GeneralFormInputs) => {
        await editGeneral(data);
    };

    const handleAddRow = async () => {
        await addRow();
        const newCounter = await fetchCounter();
        setLocalData((prev) => {
            return {
                ...prev,
                rows: newCounter.rows,
            };
        });
    };

    const handleRowChange = async (data: RowFormInputs) => {
        if (!selectedRow) return;
        await editRow(selectedRow, data);
    };

    return (
        <div className="w-full flex flex-row gap-5">
            <div className="w-1/2 flex flex-col gap-3">
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-xl">General: </h1>
                    <GeneralForm
                        initValues={localData.general}
                        onChangeAction={changeLocalGeneral}
                        submitAction={handleGeneralSubmit}
                    />
                </div>
                <hr />
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-xl">
                        Rows ({localData.rows.length}/{COUNTER_MAX_ROWS}):{" "}
                    </h1>
                    <RowsPart
                        rows={localData.rows}
                        addRow={handleAddRow}
                        selectRow={setSelectedRow}
                    />
                </div>
            </div>
            <div id="preview" className="w-1/2 flex flex-col gap-3">
                <h1 className="text-xl">Preview: </h1>
                <Counter counter={localData} />
            </div>
            <CounterRowModal
                isOpen={!!selectedRowData}
                onClose={() => setSelectedRow(null)}
                rowData={selectedRowData as RowFormInputs}
                onSubmit={handleRowChange}
            />
        </div>
    );
}
