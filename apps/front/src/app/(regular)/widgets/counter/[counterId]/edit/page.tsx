import EditCounterPage from "@/components/widgets/counter/pages/edit-couter";
import { EditCounterProvider } from "@/contexts/edit-counter.context";
import counterService from "@/lib/services/counter.service";
import { notFound } from "next/navigation";

interface Props {
    params: {
        counterId: string;
    };
}

export default async function Page({ params: { counterId } }: Props) {
    const counter = await counterService.findOnePublic(counterId);

    if (!counter) notFound();

    return (
        <div className={"flex flex-col gap-3"}>
            <EditCounterProvider counterId={counterId} initValues={counter}>
                <EditCounterPage />
            </EditCounterProvider>
        </div>
    );
}
