import { ROW_MUTATION_TYPE, RowMutation } from "@/lib/interfaces/counter";
import CounterService from "@/lib/services/counter.service";
import { type NextRequest } from "next/server";

interface Params {
    params: {
        counterId: string;
        rowId: string;
        type: ROW_MUTATION_TYPE;
    };
}

export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        const { counterId, rowId } = params;
        const counter = await CounterService.findOne(counterId);
        if (!counter) throw new Error("Widget not found");
        const secret = req.nextUrl.searchParams.get("secret");
        const mutationType = req.nextUrl.searchParams.get("type");
        if (!secret) throw new Error("Missing secret");
        // if (secret !== counter.secret) throw new Error("Invalid secret");
        if (!mutationType)
            throw new Error(
                `Missing mutation type, valid types: [${Object.values(
                    RowMutation
                ).join(", ")}]`
            );
        if (
            !Object.values(RowMutation).includes(
                mutationType as ROW_MUTATION_TYPE
            )
        )
            throw new Error(
                `Invalid mutation type, valid types: [${Object.values(
                    RowMutation
                ).join(", ")}]`
            );
        const row = counter.rows.find((r) => r.id === rowId);
        if (!row) throw new Error("Row not found");
        if (mutationType === RowMutation.increment) {
            row.value++;
        } else if (mutationType === RowMutation.decrement) {
            row.value--;
        }
        await CounterService.updateRow(counterId, rowId, row);
        return Response.json({ msg: "ayo" });
    } catch (e: any) {
        return Response.json(
            { message: e?.message ?? "An error has occurred" },
            {
                status: 400,
            }
        );
    }
}
