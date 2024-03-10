import CounterRowControl from "@/components/widgets/counter/counter-row-control";
import counterService from "@/lib/services/counter.service";
import { notFound } from "next/navigation";

interface Props {
    params: {
        counterId: string;
    };
}

export default async function Page({ params: { counterId } }: Props) {
    const counter = await counterService.findOne(counterId);

    if (!counter) notFound();

    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <section className="flex flex-col gap-3">
                <h2 className="text-2xl">Rows ({counter.rows.length})</h2>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    {counter.rows.length > 0 &&
                        counter.rows.map((r, idx) => (
                            <CounterRowControl
                                counter={counter}
                                bgColor={counter.general.bgColor}
                                row={r}
                                key={idx}
                            />
                        ))}
                </div>
            </section>
            <hr />
            <section className="flex flex-col gap-3">
                <h2 className="text-2xl">Tutorials</h2>
            </section>
        </div>
    );
}
