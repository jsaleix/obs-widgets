"use server";

import { checkPermission } from "@/lib/auth";
import { defaultRow } from "@/lib/config/counter";
import {
    CounterI,
    CounterPublicI,
    GeneralFormInputs,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import counterService from "@/lib/services/counter.service";

export async function fetchCounterAction(counterId: string) {
    "use server";
    try {
        // await checkPermission(counterId);
        const res = await counterService.findOnePublic(counterId);
        return res as CounterPublicI;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function addRowAction(counterId: string) {
    "use server";
    try {
        await checkPermission(counterId);
        const res = await counterService.addRow(counterId, defaultRow());
        return res ?? false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function editRowAction(
    counterId: string,
    rowId: string,
    data: RowFormInputs
) {
    "use server";
    try {
        await checkPermission(counterId);
        const res = await counterService.updateRow(counterId, rowId, data);
        return res ?? false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function reorderRowsAction(counterId: string, rows: string[]) {
    "use server";
    try {
        await checkPermission(counterId);
        const res = await counterService.reorderRows(counterId, rows);
        return res;
    } catch (e) {
        return false;
    }
}

export async function deleteRowAction(counterId: string, rowId: string) {
    "use server";
    try {
        await checkPermission(counterId);
        await counterService.removeRow(counterId, rowId);
    } catch (e) {
        // return false
    }
}

export async function updateGeneralAction(
    counterId: string,
    data: GeneralFormInputs
) {
    try {
        await checkPermission(counterId);
        const res = await counterService.updateGeneral(counterId, data);
        return res;
    } catch (e) {}
}
