import EditCounterPage from "@/components/widgets/counter/forms/edit-couter";
import { defaultRow } from "@/lib/config/counter";
import {
    CounterI,
    CounterRowSettings,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import counterService from "@/lib/services/counter.service";
import { notFound } from "next/navigation";

interface Props {
    params: {
        counterId: string;
    };
}

let newRow = {
    id: crypto.randomUUID(),
    icon: "icon",
    fontColor: "#000000",
    label: "",
    value: 0,
};

export default async function Page({ params: { counterId } }: Props) {
    const counter = await counterService.findOne(counterId);

    async function fetchCounter() {
        "use server";
        const res = await counterService.findOne(counterId);
        return res as CounterI;
    }

    async function handleSubmit(data: any) {
        "use server";
        const res = await counterService.update(counterId, data);
        return res ?? false;
    }

    async function editGeneral(data: any) {
        "use server";
        console.log("page data", data);
        const res = await counterService.updateGeneral(counterId, data);
        console.log("page res", res);
        return res ?? false;
    }

    async function addRow() {
        "use server";
        const res = await counterService.addRow(counterId, defaultRow);
        return res ?? false;
    }

    async function editRow(data: RowFormInputs) {
        "use server";
        const res = await counterService.updateRow(counterId, data);
        return res ?? false;
    }

    if (!counter) notFound();

    return (
        <div className={"flex flex-col gap-3"}>
            {/* <EditCounterOld initValues={counter} submitAction={handleSubmit} /> */}
            <EditCounterPage
                initValues={counter}
                fetchCounter={fetchCounter}
                addRow={addRow}
                editRow={editRow}
                editGeneral={editGeneral}
            />
        </div>
    );
}
