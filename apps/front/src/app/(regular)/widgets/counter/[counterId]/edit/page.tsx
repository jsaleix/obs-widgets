import EditCounter from "@/components/widgets/counter/forms/edit-counter";
import GeneralForm from "@/components/widgets/counter/forms/general-form";
import RowForm from "@/components/widgets/counter/forms/row-form";
import counterService from "@/lib/services/counter.service";
import { notFound } from "next/navigation";

interface Props {
    params: {
        counterId: string;
    };
}

let newRow = {id: crypto.randomUUID(),
    icon: "icon",
    fontColor: "#000000",
    label: "",
    value: 0,}

export default async function Page({ params: { counterId } }: Props) {
    const counter = await counterService.findOne(counterId);

    async function handleSubmit(data: any) {
        "use server";
        const r = await counterService.update(counterId, data);
        return r??false;
    }

    if (!counter) notFound();

    return (
        <div className={"flex flex-col gap-3"}>
            <EditCounter initValues={counter} submitAction={handleSubmit} />
        </div>
    );
}
