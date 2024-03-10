"use client";
import {
    updateGeneralAction,
    addRowAction,
    deleteRowAction,
    editRowAction,
    fetchCounterAction,
    reorderRowsAction,
} from "@/actions/widget/edit-counter";
import {
    CounterPublicI,
    GeneralFormInputs,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import { displayMsg } from "@/lib/utils/toasts";
import { createContext, useContext, useState } from "react";

interface EditCounterContextType {
    data: CounterPublicI;
    fetchCounter: () => Promise<CounterPublicI | null>;
    updateGeneral: (data: GeneralFormInputs) => Promise<void>;
    addRow: () => Promise<void>;
    editRow: (data: RowFormInputs) => Promise<void>;
    deleteRow: (id: string) => Promise<void>;
    reorderRows: (rows: string[]) => Promise<void>;
    setSelectedRow: (id: string | null) => void;
    selectedRow: string | null;
}

const EditCounterContext = createContext<EditCounterContextType>(
    {} as EditCounterContextType
);

export const useEditCounterContext = () => {
    const context = useContext(EditCounterContext);
    if (!context) {
        throw new Error(
            "useEditCounterContext must be used within a EditCounterProvider"
        );
    }
    return context;
};

interface EditCounterProviderProps {
    initValues: CounterPublicI;
    children: React.ReactNode;
    counterId: string;
}

export const EditCounterProvider = ({
    counterId,
    children,
    initValues,
}: EditCounterProviderProps) => {
    const [data, setData] = useState<CounterPublicI>(initValues);
    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    async function fetchCounter() {
        return fetchCounterAction(counterId);
    }

    async function updateGeneral(receivedData: GeneralFormInputs) {
        try {
            const r = await updateGeneralAction(counterId, receivedData);
            if (!r) throw new Error("Could not update counter");
            displayMsg("Counter updated", "success");
        } catch (e: any) {
            console.log(e);
            displayMsg(e?.message ?? "Could not update counter", "error");
        }
    }

    async function addRow() {
        try {
            const r = await addRowAction(counterId);
            if (!r) throw new Error("Could not add row");
            const newCounter = await fetchCounter();
            if (!newCounter) throw new Error("Error while fetching counter");
            setData((prev) => {
                return {
                    ...prev,
                    rows: newCounter.rows,
                };
            });
            displayMsg("Row added", "success");
        } catch (e: any) {
            displayMsg(e?.message ?? "Could not add row", "error");
        }
    }

    async function editRow(data: RowFormInputs) {
        try {
            if (!selectedRow) throw new Error("No row selected");
            const rowId = selectedRow;
            setSelectedRow(null);
            // await editRow(counterId, id, receivedData);
            const r = await editRowAction(counterId, rowId, data);
            if (!r) throw new Error("Could not edit row");
            const newCounter = await fetchCounter();
            if (!newCounter) throw new Error("Error while fetching counter");
            setData(newCounter);
            displayMsg("Row edited", "success");
        } catch (e: any) {
            displayMsg(e?.message ?? "Could not edit row", "error");
        }
    }

    async function reorderRows(rows: string[]) {
        try {
            const r = await reorderRowsAction(counterId, rows);
            if (!r) throw new Error("Could not reorder rows");
            const newCounter = await fetchCounter();
            if (!newCounter) throw new Error("Error while fetching counter");
            setData(newCounter);
            displayMsg("Rows reordered", "success");
        } catch (e: any) {
            displayMsg(e?.message ?? "Could not reorder rows", "error");
        }
    }

    async function deleteRow(rowId: string) {
        try {
            const r = await deleteRowAction(counterId, rowId);
            if (!r) throw new Error("Could not delete row");
            const newCounter = await fetchCounter();
            if (!newCounter) throw new Error("Error while fetching counter");
            setData(newCounter);
            displayMsg("Row deleted", "success");
        } catch (e: any) {
            displayMsg(e?.message ?? "Could not delete row", "error");
        }
    }

    return (
        <EditCounterContext.Provider
            value={{
                fetchCounter,
                updateGeneral,
                addRow,
                editRow,
                deleteRow,
                reorderRows,
                data,
                selectedRow,
                setSelectedRow,
            }}
        >
            {children}
        </EditCounterContext.Provider>
    );
};
