"use client";

import { useEffect, useState } from "react";
import {
    CounterI,
    CounterPublicI,
    GeneralFormInputs,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import CounterRowModal from "@/components/modal/counter-row-modal";
import Counter from "../../rendered";
import RowsPart from "./rows-part";
import GeneralPart from "./general-part";
import { updateGeneralAction } from "@/actions/widget/counter";

interface Props {
    initValues: CounterPublicI;
    fetchCounter: () => Promise<CounterPublicI>;
    addRow: () => Promise<boolean>;
    editRow: (id: string, data: RowFormInputs) => Promise<boolean>;
    deleteRow: (id: string) => Promise<void>;
}

export default function EditCounterPage({
    initValues,
    fetchCounter,
    addRow,
    editRow,
    deleteRow,
}: Props) {
    const [localData, setLocalData] = useState<CounterPublicI>(initValues);
    const [selectedRow, setSelectedRow] = useState<null | string>(null);
    const selectedRowData = localData.rows.find((r) => r.id === selectedRow);

    const changeLocalGeneral = (data: GeneralFormInputs) => {
        let newData = {
            ...localData,
            general: { ...localData.general, ...data },
        };
        setLocalData(newData as CounterPublicI);
    };

    const handleGeneralSubmit = async (data: GeneralFormInputs) => {
        await updateGeneralAction(initValues.id, data);
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
                <GeneralPart
                    initValues={localData.general}
                    onChangeAction={changeLocalGeneral}
                    submitAction={handleGeneralSubmit}
                />
                <hr />
                <RowsPart
                    rows={localData.rows}
                    addRow={handleAddRow}
                    selectRow={setSelectedRow}
                />
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
