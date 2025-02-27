import Button from "@/components/common/button";
import CounterListItem from "@/components/widgets/counter/counter-list-item";
import CreateCounterButton from "@/components/widgets/counter/counter-new";
import { getServerAuthSession } from "@/lib/auth";
import { COUNTER_MAX_QUANTITY } from "@/lib/config/counter";
import { CounterPublicI } from "@/lib/interfaces/counter";
import counterService from "@/lib/services/counter.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerAuthSession();
    if (!session) return redirect("/auth/signin");
    const counters = await counterService.findAllByOwner(session.user.id!);

    async function addOne() {
        "use server";
        if (!session) return redirect("/auth/signin");
        await counterService.create("my counter", session.user.id!);
        revalidatePath("/widgets");
    }

    return (
        <div className={"h-full w-full p-5"}>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-xl">
                        Counters {counters.length}/{COUNTER_MAX_QUANTITY}:
                    </h1>
                    <CreateCounterButton
                        disabled={counters.length >= COUNTER_MAX_QUANTITY}
                        action={addOne}
                    />
                </div>
                {counters.length > 0 && (
                    <div
                        className={
                            "w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
