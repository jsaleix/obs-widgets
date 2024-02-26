import { ROW_MUTATION_TYPE, RowMutation } from "@/interfaces/widget";
import WidgetService from "@/lib/services/widget.service";
import { type NextRequest } from "next/server";

interface Params {
    params: {
        widgetId: string;
        rowId: string;
        type: ROW_MUTATION_TYPE;
    };
}

export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        const { widgetId, rowId } = params;
        const widget = await WidgetService.findOne(widgetId);
        if (!widget) throw new Error("Widget not found");
        const secret = req.nextUrl.searchParams.get("secret");
        const mutationType = req.nextUrl.searchParams.get("type");
        if (!secret) throw new Error("Missing secret");
        if (secret !== widget.secret) throw new Error("Invalid secret");
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
