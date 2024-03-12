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
        <div className={"w-full flex flex-col gap-5"}>
            <section id="tutorials" className="w-full flex flex-col gap-3">
                <h2 className="text-2xl">Tutorials</h2>
                <p className="italic">Soon 🚀</p>
            </section>
        </div>
    );
}
