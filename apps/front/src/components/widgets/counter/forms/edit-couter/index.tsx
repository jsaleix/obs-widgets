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
    reorderRows: (rows: string[]) => Promise<boolean>;
}

export default function EditCounterPage({
    initValues,
    fetchCounter,
    addRow,
    editRow,
    deleteRow,
    reorderRows,
}: Props) {
    const [localData, setLocalData] = useState<CounterPublicI>(initValues);
    const [selectedRow, setSelectedRow] = useState<null | string>(null);
    const selectedRowData =
        localData.rows.find((r) => r.id === selectedRow) || null;

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

    const handleRowReorder = async (rows: string[]) => {
        await reorderRows(rows);
        const newCounter = await fetchCounter();
        setLocalData(newCounter);
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

    const handleDeleteRow = async () => {
        if (!selectedRow) return;
        const id = selectedRow;
        setSelectedRow(null);
        await deleteRow(id);
        const newCounter = await fetchCounter();
        setLocalData(newCounter);
    };

    const handleRowChange = async (data: RowFormInputs) => {
        if (!selectedRow) return;
        const id = selectedRow;
        setSelectedRow(null);
        await editRow(id, data);
        const newCounter = await fetchCounter();
        setLocalData(newCounter);
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
                    reorderRows={handleRowReorder}
                />
            </div>
            <div id="preview" className="w-1/2 flex flex-col gap-3">
                <h1 className="text-xl">Preview: </h1>
                <Counter counter={localData} />
            </div>
            <CounterRowModal
                isOpen={!!selectedRowData}
                onClose={() => setSelectedRow(null)}
                rowData={selectedRowData}
                onSubmit={handleRowChange}
                deleteAction={handleDeleteRow}
            />
        </div>
    );
}
