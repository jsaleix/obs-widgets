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
        <div className={"flex flex-col gap-3"}>
            <p>Ayo overview here</p>
        </div>
    );
}
