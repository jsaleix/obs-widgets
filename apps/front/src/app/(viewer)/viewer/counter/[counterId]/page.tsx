import RenderedWidget from "@/components/widgets/counter";
import counterService from "@/lib/services/counter.service";
import { notFound, redirect } from "next/navigation";

interface PageProps {
    params: {
        counterId: string;
    };
}

export default async function Page({ params: { counterId } }: PageProps) {
    const data = await counterService.findOne(counterId);

    if (!data) notFound();
    return <RenderedWidget counter={data} />;
}
