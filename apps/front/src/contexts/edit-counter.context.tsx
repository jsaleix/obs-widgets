"use client";
import { updateGeneralAction } from "@/actions/widget/counter";
import {
    addRowAction,
    deleteRowAction,
    editRowAction,
    fetchCounterAction,
    reorderRowsAction,
} from "@/actions/widget/edit-counter";
import {
    CounterPublicI,
    CounterRowSettings,
    GeneralFormInputs,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import { createContext, useContext, useState } from "react";

interface EditCounterContextType {
    data: CounterPublicI;
    fetchCounter: () => Promise<CounterPublicI>;
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
        await updateGeneralAction(counterId, receivedData);
    }

    async function addRow() {
        await addRowAction(counterId);
        const newCounter = await fetchCounter();
        setData((prev) => {
            return {
                ...prev,
                rows: newCounter.rows,
            };
        });
    }

    async function editRow(data: RowFormInputs) {
        if (!selectedRow) return;
        const rowId = selectedRow;
        setSelectedRow(null);
        // await editRow(counterId, id, receivedData);
        await editRowAction(counterId, rowId, data);
        const newCounter = await fetchCounter();
        setData(newCounter);
    }

    async function reorderRows(rows: string[]) {
        await reorderRowsAction(counterId, rows);
        const newCounter = await fetchCounter();
        setData(newCounter);
    }

    async function deleteRow(rowId: string) {
        await deleteRowAction(counterId, rowId);
        const newCounter = await fetchCounter();
        setData(newCounter);
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
