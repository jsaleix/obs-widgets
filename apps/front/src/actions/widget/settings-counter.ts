"use server";

import { ActionResponse, StatusValues } from "@/lib/interfaces/actions";
import counterService from "@/lib/services/counter.service";
import { UpdateCounterNameRequestSchema } from "@/lib/validator/schemas/counter.schemas";
import { revalidatePath } from "next/cache";

export async function changeNameAction(
    _: ActionResponse,
    payload: FormData
): Promise<ActionResponse> {
    try {
        const data = Object.fromEntries(payload.entries());
        const parsed = UpdateCounterNameRequestSchema.safeParse(data);
        if (!parsed.success) throw new Error("Invalid data");
        await counterService.updateRoot(parsed.data.id, {
            name: parsed.data.name,
        });

        revalidatePath(`/widgets/counter/`);
        return {
            status: StatusValues.Success,
            message: "Counter name updated",
        };
    } catch (e) {
        const message =
            e instanceof Error ? e.message : "An error has occurred";
        return {
            status: StatusValues.Error,
            message,
        };
    }
}

export async function resetSecretAction(
    _: ActionResponse,
    payload: FormData
): Promise<ActionResponse> {
    try {
        const id = payload.get("id") as string;
        if (!id) {
            throw new Error("Counter id not found");
        }

        const newSecret = await counterService.changeSecret(id);
        if (!newSecret) {
            throw new Error("An error has occurred");
        }

        return {
            status: StatusValues.Success,
            message: "Counter secret reset",
            value: newSecret,
        };
    } catch (e) {
        const message =
            e instanceof Error ? e.message : "An error has occurred";
        return {
            status: StatusValues.Error,
            message,
        };
    }
}

export async function deleteCounterAction(
    _: ActionResponse,
    payload: FormData
): Promise<ActionResponse> {
    try {
        const id = payload.get("id");
        if (!id) {
            throw new Error("Counter id not found");
        }

        return {
            status: StatusValues.Success,
            message: "Counter deleted",
        };
    } catch (e) {
        const message =
            e instanceof Error ? e.message : "An error has occurred";
        return {
            status: StatusValues.Error,
            message,
        };
    }
}
