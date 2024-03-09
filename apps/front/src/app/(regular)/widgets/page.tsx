import Button from "@/components/common/button";
import CounterListItem from "@/components/widgets/counter/counter-list-item";
import CreateCounterButton from "@/components/widgets/counter/counter-new";
import { COUNTER_MAX_QUANTITY } from "@/lib/config/counter";
import counterService from "@/lib/services/counter.service";
import { revalidatePath } from "next/cache";

export default async function Page() {
    const counters = await counterService.findAllByOwner("noOnee");

    async function addOne() {
        "use server";
        const r = await counterService.create("my counter", "noOnee");
        revalidatePath("/widgets");
    }

    return (
        <div className={"w-100 py-5"}>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-between">
                    <h1 className="text-xl">
                        Counter {counters.length}/{COUNTER_MAX_QUANTITY}:
                    </h1>
                    <CreateCounterButton
                        disabled={counters.length >= COUNTER_MAX_QUANTITY}
                        action={addOne}
                    />
                </div>
                {counters.length > 0 && (
                    <div
                        className={
                            "w-full grid sm:grid-cols-1 md:grid-cols-4 gap-4"
                        }
                    >
                        {counters.map((c, idx) => (
                            <CounterListItem key={idx} item={c} />
                        ))}
                    </div>
                )}
                {counters.length == 0 && <p>No counter found</p>}
            </div>
        </div>
    );
}
