"use client";

import { useEffect, useState } from "react";
import {
    CounterPublicI,
    GeneralFormInputs,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import CounterRowModal from "@/components/modal/counter-row-modal";
import Counter from "../../rendered";
import RowsPart from "./rows-part";
import GeneralPart from "./general-part";
import { useEditCounterContext } from "@/contexts/edit-counter.context";

interface Props {}

export default function EditCounterPage({}: Props) {
    const { data, editRow, deleteRow, setSelectedRow, selectedRow } =
        useEditCounterContext();
    const [localData, setLocalData] = useState<CounterPublicI>(data);
    const selectedRowData =
        localData.rows.find((r) => r.id === selectedRow) || null;

    const changeLocalGeneral = (data: GeneralFormInputs) => {
        let newData = {
            ...localData,
            general: { ...localData.general, ...data },
        };
        setLocalData(newData as CounterPublicI);
    };

    const handleDeleteRow = async () => {
        if (!selectedRow) return;
        const id = selectedRow;
        setSelectedRow(null);
        await deleteRow(id);
    };

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    return (
        <div className="w-full flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2 flex flex-col gap-3">
                <GeneralPart onChangeAction={changeLocalGeneral} />
                <hr />
                <RowsPart />
            </div>
            <div id="preview" className="w-1/2 flex flex-col gap-3">
                <h1 className="text-xl">Preview: </h1>
                <Counter counter={localData} />
            </div>
            <CounterRowModal
                isOpen={!!selectedRowData}
                onClose={() => setSelectedRow(null)}
                rowData={selectedRowData}
                onSubmit={editRow}
                deleteAction={handleDeleteRow}
            />
        </div>
    );
}
