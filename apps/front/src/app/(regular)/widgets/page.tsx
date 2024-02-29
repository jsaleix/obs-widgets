"use server";
import CounterListItem from "@/components/widgets/counter/counter-list-item";
import counterService from "@/lib/services/counter.service";

export default async function Page() {
    const counters = await counterService.findAllByOwner("noOne");
    // await counterService.create("secondOne", "noOne");
    if (!counters || counters.length === 0) return <div>No counter found</div>;
    return (
        <div className={"w-100"}>
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
        </div>
    );
}
