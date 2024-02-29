import RealtimeCounterWrapper from "@/components/widgets/counter/realtime-wrapper";
import counterService from "@/lib/services/counter.service";
import { notFound, } from "next/navigation";

interface PageProps {
    params: {
        counterId: string;
    };
}

export default async function Page({ params: { counterId } }: PageProps) {
    let data = await counterService.findOne(counterId);
    
    if (!data) notFound();
    return <RealtimeCounterWrapper initData={data} />;
}
