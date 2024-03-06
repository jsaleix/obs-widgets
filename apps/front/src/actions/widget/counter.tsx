"use server";

import { defaultRow } from "@/lib/config/counter";
import { ActionResponse, StatusValues } from "@/lib/interfaces/actions";
import {
    CounterI,
    CounterPublicI,
    GeneralFormInputs,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import counterService from "@/lib/services/counter.service";
import {
    CounterGeneralSettingsSchema,
    PublicCounterSchema,
    UpdateCounterGeneralSettingsSchema,
} from "@/lib/validator/schemas/counter.schemas";

export async function fetchPublicCounter(counterId: string) {
    const res = await counterService.findOne(counterId);
    const parsed = PublicCounterSchema.safeParse(res);
    if (!parsed.success) return null;
    return parsed.data;
}

export async function updatePublicCounter(counterId: string, data: any) {
    const res = await counterService.update(counterId, data);
    return {
        status: res ? StatusValues.Success : StatusValues.Error,
    } as ActionResponse;
}

export async function updateGeneralAction(
    counterId: string,
    data: GeneralFormInputs
) {
    const res = await counterService.updateGeneral(counterId, data);
    return {
        status: res ? StatusValues.Success : StatusValues.Error,
    } as ActionResponse;
}

export async function updateGeneralTest(
    prevState: ActionResponse,
    payload: FormData
) {
    try {
        const data = Object.fromEntries(payload.entries());
        const parse = UpdateCounterGeneralSettingsSchema.parse(data);

        await counterService.updateGeneral(parse.id, parse);

        return {
            status: StatusValues.Success,
            message: "Success",
        } as ActionResponse;
    } catch (e: any) {
        console.log(e);
        return {
            status: StatusValues.Error,
            message: e.message ?? "An error has occurred",
        } as ActionResponse;
    }
}

export async function addRow(counterId: string) {
    const res = await counterService.addRow(counterId, defaultRow);
    return res ?? false;
}

export async function editRow(
    counterId: string,
    rowId: string,
    data: RowFormInputs
) {
    const res = await counterService.updateRow(counterId, rowId, data);
    return res ?? false;
}

export async function deleteRow(counterId: string, rowId: string) {
    const res = await counterService.removeRow(counterId, rowId);
    return res ?? false;
}

export async function deleteCounter(counterId: string) {
    const res = await counterService.delete(counterId);
    return res ?? false;
}

export async function resetSecret(counterId: string) {
    const newSecret = crypto.randomUUID();
    const res = await counterService.update(counterId, { secret: newSecret });
    return res ?? false;
}

export async function updateName(counterId: string, name: string) {
    const res = await counterService.update(counterId, { name });
    return {
        status: res ? StatusValues.Success : StatusValues.Error,
    } as ActionResponse;
}
