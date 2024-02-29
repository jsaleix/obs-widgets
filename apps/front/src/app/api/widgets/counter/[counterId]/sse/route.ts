import { CounterI } from "@/lib/interfaces/counter";
import counterService from "@/lib/services/counter.service";
import { convertMessage } from "@/lib/utils/sse";
import { NextRequest } from "next/server";

interface Params {
    params: {
        counterId: string;
    };
}

export async function GET(req: NextRequest, { params }: Params) {
    const { counterId } = params;
    if (!counterId) {
        return new Response("Invalid counterId", { status: 400 });
    }
    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    let unsub: undefined | (() => void);

    try {
        const encoder = new TextEncoder();
        const cb = async (data: CounterI) => {
            const msg = convertMessage({ type: "counter-update", data })
            console.log("sending", msg)
            writer.write(
                convertMessage({ type: "counter-update", data })
            );
        };

        unsub = await counterService.getRealtimeCounter(counterId, cb);
        req.signal.addEventListener("abort", () => {
            console.log("Aborting");
            if (unsub) {
                unsub();
            }
            writer.close();
        });

    } catch (e) {
        console.error(e);
        let errorMsg = e instanceof Error ? e.message : "An error has occurred";
        writer.write(
            convertMessage({ type: "error", data: { message: errorMsg } })
        );
        writer.close();
        return new Response(responseStream.readable, { status: 500 });
    }

    return new Response(responseStream.readable, {
        headers: {
            "Content-Type": "text/event-stream",
            Connection: "keep-alive",
            "Cache-Control": "no-cache, no-transform",
        },
    });
}
