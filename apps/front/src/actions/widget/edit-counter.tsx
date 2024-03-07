"use server";

import { defaultRow } from "@/lib/config/counter";
import { CounterI, RowFormInputs } from "@/lib/interfaces/counter";
import counterService from "@/lib/services/counter.service";

export async function fetchCounterAction(counterId: string) {
    "use server";
    const res = await counterService.findOnePublic(counterId);
    return res as CounterI;
}

export async function addRowAction(counterId: string) {
    "use server";
    const res = await counterService.addRow(counterId, defaultRow());
    return res ?? false;
}

export async function editRowAction(counterId: string, rowId: string, data: RowFormInputs) {
    "use server";
    const res = await counterService.updateRow(counterId, rowId, data);
    return res ?? false;
}

export async function reorderRowsAction(counterId: string, rows: string[]) {
    "use server";
    const res = await counterService.reorderRows(counterId, rows);
    return res;
}

export async function deleteRowAction(counterId: string, rowId: string) {
    "use server";
    await counterService.removeRow(counterId, rowId);
}