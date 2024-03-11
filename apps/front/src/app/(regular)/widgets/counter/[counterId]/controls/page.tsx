import CounterRowControl from "@/components/widgets/counter/pages/counter-row-control";
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
                <h2 className="text-2xl">Rows ({counter.rows.length}):</h2>
                <CounterRowControl
                    counter={counter}
                    bgColor={counter.general.bgColor}
                />
            </section>
            <hr />
            <section className="flex flex-col gap-3">
                <h2 className="text-2xl">Tutorials</h2>
            </section>
        </div>
    );
}
